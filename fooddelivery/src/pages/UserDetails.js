import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../Config'
import { ToastContainer, toast } from 'react-toastify'


export const UserDetails = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [user, setUser] = useState({})
    useEffect(() => {
        const id = params.user_id
        axios.get(`${API}/userdetails/${id}`, {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json'
            },

        })
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    })

    const UserDelete = async (id) => {
        const confirmed = window.confirm("Are you Sure to Delete Account From the system")
        if (confirmed) {
            localStorage.removeItem('authToken')
            localStorage.removeItem('logedinUser')
            localStorage.removeItem('logedinUserEmail')
            axios.delete(`${API}/deleteuser/${id}`)
                .then(res => {
                    toast.success('User Deleted')
                    setUser(user.filter(i => i._id !== id))


                }).catch(err => {
                    toast.error('failed to delete')
                })
        }
        await axios.post(`${API}/signout`)
        navigate('/login')

    }
    const userEdit = id => {
        navigate(`/udpadeUserDetail/${id}`)

    }


    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
            <div className='user-detail'>
                <div className='subUser-detail'>
                    <div className='user-image'>
                        <img src='' alt='userimage' />
                    </div>
                    <div className='user-info'>
                        <div className='user-name mb-3'><span className='user-titles'>Name:</span>{user.name} </div>
                        <div className='user-email mb-3'><span className='user-email'>Email:</span>{user.email}</div>
                        <div className='user-location mb-5'><span className='user-location'>Location:</span>{user.location}</div>
                        <div className='btn d-flex'>
                            <button class="btn bg-success text-white me-2" onClick={() => userEdit(user._id)}>Edit</button>
                            <button class="btn bg-danger text-white me-2" onClick={() => UserDelete(user._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
