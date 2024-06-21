import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { API } from '../Config'

const UpdateUserDetails = () => {
    const params = useParams()
    const id = params.id

    const [initialValues, setInitialValues] = useState({})
    const [name, setUserName] = useState('')
    const [email, setUserEmail] = useState('')
    const [location, setUserLocation] = useState('')

    useEffect(() => {
        axios.get(`${API}/userdetails/${id}`)
            .then(res => {
                setInitialValues(res.data)
                setUserName(res.data.name)
                setUserEmail(res.data.email)
                setUserLocation(res.data.location)
                console.log(initialValues)
            })
            .catch(err => console.log(err))
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('location', location)

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            const response = await axios.put(`${API}/updateuser/${id}`, formData, config)
            if (response) {
                toast.success('Details Updated Successfully')
            }
            else {
                toast.error('Failed to update')
            }
        }

        catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <ToastContainer theme='colored' position='top-center' />
            <div className='container'>
                <form className='shadow p-3'>
                    <h3 className="text-ceter text-muted">Update User Details</h3>
                    <div className="mb-2">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            onChange={e => setUserName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            onChange={e => setUserEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="name">Location:</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            className="form-control"
                            onChange={e => setUserLocation(e.target.value)}
                            value={location}
                        />
                    </div>
                    <div className="mb-2">
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Update
                        </button>
                    </div>
                </form>
            </div>




        </>
    )
}

export default UpdateUserDetails