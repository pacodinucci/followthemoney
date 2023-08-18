import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import { useContext } from 'react';
import { authContext } from '@/lib/store/auth-context';

function SignIn() {
    const { googleLoginHandler } = useContext(authContext);

    return (
        <div className='container max-w-2xl px-6 mx-auto'>
            <h1 className='mb-6 text-6xl font-bold text-center'>Follow the Money!🤑</h1>
            <div className='flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-xl'>
                <div className='h-52'>
                    <img src="https://images.pexels.com/photos/1055081/pexels-photo-1055081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='object-cover w-full h-full' />
                </div>
                <div className='px-4 py-4'>
                    <h3 className='text-2xl text-center'>Please, sign in to continue</h3>
                    <button onClick={googleLoginHandler} className='flex items-center self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg'>
                        <FcGoogle className='text-2xl' />
                        Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignIn;