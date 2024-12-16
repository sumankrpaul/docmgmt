import React, { useEffect } from 'react'
import { useDocumetContext } from '../../../service/Document.context';
import { registerUser, RegisterUserPayload } from '../../../API/Auth.api';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import InputField, { InputLabel, InputError, FormError } from '../../components/InputField';
import SubmitButton from '../../components/SubmitButton';
import { IAPIStatus } from '../../../interface/IfcContext';
import toast from 'react-hot-toast';
function RegisterForm() {
  const {state, dispatch} = useDocumetContext();

  const initialValue: RegisterUserPayload = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    repeat_password: ''
  }

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last Name is requred"),
    email: Yup.string().required("Email is required").email("Enater a valid email"),
    password: Yup.string().required("Password is a required field"),
    repeat_password: Yup.string().required("Repeat Password is required").oneOf([Yup.ref('password')], "Passwords don't match")
  })

  const handleSubmit = (value: RegisterUserPayload, helper: FormikHelpers<RegisterUserPayload> )=>{
    registerUser(value).then(res=>{
      toast.success(res.data.message);
      dispatch({type: 'SETAUTHSTATUS', payload: {status:IAPIStatus.Idle} })
      helper.resetForm();
    }).catch((err)=> {
      dispatch({type: 'SETAUTHEERROR', payload: { error: err.error}})
    }).finally(()=>{
      helper.setSubmitting(false);
    })
  }

  useEffect(()=>{
    toast.success('Check if working');
  }, [])
  
  return <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={handleSubmit}>
    {(formikHelper)=>(<Form className='flex flex-col gap-y-1'>
        <div>
          <InputLabel> First Name </InputLabel>
          <InputField name="first_name" />
          <InputError name="first_name" />
        </div>
        <div>
          <InputLabel> Last Name </InputLabel>
          <InputField name="last_name" />
          <InputError name="last_name" />
        </div>
        <div>
          <InputLabel> Email </InputLabel>
          <InputField name="email" />
          <InputError name="email" />
        </div>
        <div>
          <InputLabel> Password </InputLabel>
          <InputField name="password" type="password" />
          <InputError name="password"  />
        </div>
        <div>
          <InputLabel> Repeat Password </InputLabel>
          <InputField name="repeat_password" type="password" />
          <InputError name="repeat_password"  />
        </div>
        <FormError error={state.auth.error} />
        <div className='self-end'>
            <SubmitButton isSubmitting={formikHelper.isSubmitting}> Log In </SubmitButton>
        </div>
      </Form>
    )}
  </Formik>
}

export default RegisterForm