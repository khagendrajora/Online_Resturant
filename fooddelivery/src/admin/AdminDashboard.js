import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { isAuthenticated } from '../auth/authIndex'
import { ToastContainer, toast } from 'react-toastify'

export const AdminDashboard = () => {
    const [admin, setAdmin] = useState(false)
    const navigate = useNavigate()
    const user = isAuthenticated()
    const checkUserRole = () => {
        if (user && user.role === "1") {
            setAdmin(true)
            navigate('/admin/dashboard')
        } else {
            toast.error("you are not authorized")
        }
    }
    return (
        <>
            {admin === true ? (
                <>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </>
            ) :
                <>
                    < ToastContainer theme='red' position='top-center' />
                    {checkUserRole()}
                </>
            }
        </>
    )
}
