import React, { ReactNode, useEffect, useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useDocumetContext } from '../../../service/Document.context';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
    const navigate = useNavigate();

    const [formType, setFormType] = useState('login');
    const {state, dispatch} = useDocumetContext();

    useEffect(()=>{
        if(state.auth.isAutheicated){
          navigate('/')
        }
      }, [state.auth.isAutheicated]);
    
    useEffect(()=>{
        dispatch({type: 'CHECKAUTH', payload:{}});
    }, [])


    return <div className='h-full bg-slate-50 flex'>
    <div className='m-auto shadow w-[500px] bg-slate-100'>
        <div className='flex justify-center border-b'>
            <FormSelector isActive={formType === 'login'} selected={()=> setFormType('login')} >Log In</FormSelector>
            <FormSelector isActive={formType === 'register'} selected={()=> setFormType('register')}> Register </FormSelector>
        </div>
        <div className='p-4 '>
            {formType=== 'login'? <LoginForm/> : <RegisterForm/>}
        </div>
    </div>

    </div>
}

function FormSelector({children, isActive, selected}:{children: ReactNode, isActive: boolean, selected: ()=>void}) {
    return <button type='button' className={`px-4 py-2 text-lg font-semibold opacity-80 cursor-pointer border-b-slate-700 hover:border-b-2 hover:opacity-100 transition-all ${isActive? 'border-b-2 opacity-100': ''}`} onClick={selected}>
        {children}
    </button>
}

export default AuthPage