import { useFormik } from 'formik'
import React from 'react'
import { API } from '../Config'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'



export const ForgetPasswort = () => {
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(`${API}/forgetpwd`, { email: values.email })
            if (response) {

                toast.success("Password reset link is send to the respective Email")
            } else {
                toast.error("failed ")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '', // Set initial values for your form fields
        },
        onSubmit: handleSubmit,

    });


    return (
        <>
            <ToastContainer theme='colored' position='top-center' />
            <div className='form-container'>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Forget Password</h2>
                    <p>Enter your Email</p>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email&nbsp;&nbsp;</label>
                        <input type='email' className="control-label rounded" name='email' id='Email'
                            value={formik.email} onChange={formik.handleChange} />
                    </div>
                    <div className='mb-2'>
                        <button type='submit' className='btn btn-success'>Send Password reset link</button>
                    </div>
                    <Link to='/login' className='link '>Return to Login</Link>
                </form>
            </div>

        </>
    )
}
