"use client";
import { createContext, useState, useEffect, useContext } from "react";
import {collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where} from 'firebase/firestore';
import { db } from "@/lib/firebase";
import { authContext } from "./auth-context";

export const financeContext = createContext({
    income: [],
    addIncomeItem: async () => {},
    removeIncomeItem: async () => {},
    expenses: [],
    addExpenseItem: async () => {},
    addCategory: async () => {},
    deleteExpenseItem: async () => {},
    deleteExpenseCategory: async () => {},
});

export default function FinanceContextProvider({children}) {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const {user} = useContext(authContext);

    const addCategory = async (category) => {
      try {
        const collectionRef = collection(db, 'expenses');
        const docSnap = await addDoc(collectionRef, {
          uid: user.uid,
          ...category,
          items: [],
        })

        setExpenses(prevExpenses => {
          return [
            ...prevExpenses,
            {
              id: docSnap.id,
              uid: user.uid,
              items: [],
              ...category
            }
          ]
        })
      } catch (error) {
        throw error;
      }
    } 

    const addExpenseItem = async (expenseCategoryId, newExpense) => {
        const docRef = doc(db, 'expenses', expenseCategoryId);

        try {
          await updateDoc(docRef, {...newExpense})
          
          // Update State
          setExpenses(prevState => {
            const updatedExpenses = [...prevState];
            const foundIndex = updatedExpenses.findIndex(expense => {
              return expense.id === expenseCategoryId
            });
            updatedExpenses[foundIndex] = {id: expenseCategoryId, ...newExpense}

            return updatedExpenses;
          })
        } catch (error) {
          throw error  
        }
    }

    const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {
      try {
        const docRef = doc(db, 'expenses', expenseCategoryId);
        await updateDoc(docRef, {
          ...updatedExpense,
        });
        setExpenses(prevExpenses => {
          const updatedExpenses = [...prevExpenses];
          const pos = updatedExpenses.findIndex(e => e.id === expenseCategoryId);
          updatedExpenses[pos].items = [...updatedExpense.items];
          updatedExpenses[pos].total = updatedExpense.total;

          return updatedExpenses;
        })
      } catch (error) {
        throw error;
      }
    };

    const deleteExpenseCategory = async (expenseCategoryId) => {
      try {
        const docRef = doc(db, 'expenses', expenseCategoryId);
        await deleteDoc(docRef);

        setExpenses(prevExpenses=> {
          const updatedExpenses = prevExpenses.filter(expense => expense.id !== expenseCategoryId);
          return [...updatedExpenses];
        })
      } catch (error) {
        throw error;
      }
    }

    const addIncomeItem = async (newIncome) => {
        const collectionRef = collection(db, 'income');
        try {
          const docSnapshot = await addDoc(collectionRef, newIncome)
    
          // Update state
          setIncome(prevState => {
            return [
              ...prevState,
              {
                id: docSnapshot.id,
                ...newIncome
              }
            ]
          })
    
          descriptionRef.current.value = '';
          amountRef.current.value = '';
    
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    const removeIncomeItem = async (incomeId) => {
        const docRef = doc(db, 'income', incomeId);
        try {
            await deleteDoc(docRef);
            setIncome(prevState => {
                return prevState.filter(i => i.id !== incomeId);
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    useEffect(()=>{
        if(!user) return;

        const getIncomeData = async () => {
          const collectionRef = collection(db,'income');

          const q = query(collectionRef, where('uid', '==', user.uid))

          const docsSnap = await getDocs(q);
          
          const data = docsSnap.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis())
            }
          })
          setIncome(data);
        };

        const getExpensesData = async () => {
          const collectionRef = collection(db, 'expenses');

          const q = query(collectionRef, where('uid', '==', user.uid));

          const docsSnap = await getDocs(q);

          const data = docsSnap.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
          setExpenses(data);
        }

        getIncomeData();
        getExpensesData();
    }, [user]);

    const values = {income, addIncomeItem, removeIncomeItem, expenses, addExpenseItem, addCategory, deleteExpenseItem, deleteExpenseCategory}

    return <financeContext.Provider value={values}>
        {children}
    </financeContext.Provider>
}