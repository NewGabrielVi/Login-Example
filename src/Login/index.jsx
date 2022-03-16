import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/auth';
import './login.css';
import { MdEmail } from "react-icons/md";
import { MdLock } from "react-icons/md";
import {useNavigate } from 'react-router-dom';
import {Formik} from 'formik';

const Login = () => {
    const navigate = useNavigate();
    const { authenticated, login } = useContext
        (AuthContext);

    const initialValues = {
        email: '',
        password: ''
    }

    useEffect(() => {
        if(authenticated) {  
            return navigate("/profile");
        }
    },[authenticated]);

    const validation = (values) => {
        
        const errors = {};
         if (!values.email) {
           errors.email = 'Digite um Email';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Email inválido.';
         }

         if(!values.password) {
            errors.password = 'Digite uma senha';
        }
         return errors;
    }

    const submitForm = (values) => {
        login(values.email, values.password)

    }
    return (
        <div className='login'>
            <Formik 
                    initialValues={initialValues}
                    validate={validation}
                    onSubmit={submitForm}
            >
            {(formik) => {
            const {
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
            isValid,
             dirty
             } = formik;
        return (
            <form className="form" onSubmit={handleSubmit}>
                <div className='login-logo'>
                </div>
                <div className='login-right'>
                    <img src='https://media.discordapp.net/attachments/714989598148919419/952754899127513169/unknown.png'/>
                    <br></br>

                    <div className='Login-loginInputEmail'>
                        <MdEmail />
                        <input value={values.email}
                            id="email"
                            type="text"
                            placeholder="@gmail.com"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email && (
                    <span className="error">{errors.email}</span>
                  )}

                    </div>

                    <div className='Login-loginInputPassword'>
                        <MdLock />
                        <input value={values.password}
                            id="password"
                            type="password"
                            placeholder='***********'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password && (
                    <span className="error">{errors.password}</span>
                  )}
                    </div>
                    <button type='submit'>
                        Sign in
                    </button>
                </div>
            </form>
        )}}
            </Formik>
        </div>
    )
}

export default Login;