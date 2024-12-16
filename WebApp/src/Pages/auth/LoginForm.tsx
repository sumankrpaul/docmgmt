import React from 'react'
import { useDocumetContext } from '../../../service/Document.context'
import InputField, { FormError, InputError, InputLabel } from '../../components/InputField';
import {ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import SubmitButton from '../../components/SubmitButton';
import { loginExistingUser, LoginUserPayload } from '../../../API/Auth.api';
import { IAPIStatus } from '../../../interface/IfcContext';

function LoginForm() {
    const {state, dispatch} = useDocumetContext();
    const {auth} = state;

    const initialValue: LoginUserPayload = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Enater a valid email"),
        password: Yup.string().required("Password is a required field")
    })

    const handleSubmit = (value: LoginUserPayload, helpers: FormikHelpers<LoginUserPayload>)=>{
        loginExistingUser(value).then((resp)=>{
            const {data} = resp
            dispatch({type: 'SETAUTHUSER', payload: { user_token: data.user_token, user: data.user_details, status: IAPIStatus.Success, isAuthenticated: true }});
        }).catch((err)=>{
            dispatch({type:'SETAUTHEERROR', payload: {error: err.error} });
            console.log(err);
        })
        .finally(()=> helpers.setSubmitting(false))
    }


    return<div>
        <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(formikHelpers)=>(
                <Form className='flex flex-col gap-y-1'>
                    <div>
                        <InputLabel> Email </InputLabel>
                        <InputField name="email" />
                        <InputError name="email" />
                    </div>
                    <div>
                        <InputLabel> Password </InputLabel>
                        <InputField name="password" type="password" />
                        <InputError name='password'/>
                    </div>
                    <FormError error={auth.error} />
                    <div className='self-end'>
                        <SubmitButton isSubmitting={formikHelpers.isSubmitting}> Log In </SubmitButton>
                    </div>
                </Form>
            )}
        </Formik>
        
    </div>
}

export default LoginForm