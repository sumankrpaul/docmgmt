import React, { ReactNode } from 'react'
import { ErrorMessage, Field } from 'formik';

function InputField(props) {
  return <Field {...props} className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter disabled:opacity-70"/>
}

export function InputLabel({children}: {children: ReactNode}){
    return <label className="mb-3 block text-black dark:text-white">{children}</label>
}

export function InputError({name}:{name:string}){
    return <ErrorMessage name={name} className="text-red-600" component="div" />
}

export function FormError({error}:{error?: string}){
  if(error && error.length){
    return <div className='text-red-600' > {error}</div>
  }
  else return <></>
}

export default InputField