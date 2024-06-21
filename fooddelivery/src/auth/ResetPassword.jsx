import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API } from '../Config'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

export const ResetPassword = () => {
    const params = useParams()
    const token = params.token
    const [pass, setPass] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData()
            formData.append('password', pass)
            const Config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const response = await axios.put(`${API}/resetpassword/${token}`, formData, Config)
            if (response) {
                toast.success("Password Changed successfully")
            }
            setPass({
                pass: ''
            })
        } catch (err) {
            toast.error(err)
        }
    }
    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
            <div className='form-container'>
                <form>

                    <h2>New Password</h2>
                    <p>Enter your new password</p>
                    <div className='mb-2'>
                        <label htmlFor='password'>New Password&nbsp;&nbsp;</label>
                        <input type='password' className="form-control rounded" name='password' id='password'
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <button className='btn btn-success' onClick={handleSubmit}>Send</button>
                    </div>
                    <Link to='/login' className='link '>Return to Login</Link>
                </form>
            </div>
        </>
    )
}
