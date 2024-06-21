import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../Config'

const EmailVerify = () => {
    const params = useParams()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const token = params.token
        fetch(`${API}/confirmation/${token}`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess(true)
                    setError('')
                }
            })
            .catch(err => console.log(err))
    }, [params.token])

    //to how error mesg
    const showError = () => (
        error && <div className='alert alert-danger'>
            {error}
        </div>
    )
    //to show success message
    const showSuccess = () => {
        success && <div className='alert alert-success'>
            Email verified successfully
        </div>
    }
    return (
        <>
            {showError}
            {showSuccess}

            <h1>Email has been verified. Procced to login </h1>

        </>
    )
}

export default EmailVerify