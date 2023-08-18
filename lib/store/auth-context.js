"use client";
import { createContext } from "react";
import { auth } from "../firebase";
import {GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';

export const authContext = createContext({
    user: null,
    loading: false,
    googleLoginHandler: async () => {},
    logout: async () => {},
})

export default function authContextProvider({children}){
    const [user, loading] = useAuthState(auth);

    const googleProvider = new GoogleAuthProvider(auth);

    const googleLoginHandler = async () => {
        try {
            signInWithRedirect(auth, googleProvider);
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        signOut(auth);
    };


    const value = {user, loading, googleLoginHandler, logout};

    return <authContext.Provider value={value}>{children}</authContext.Provider>
}