import React from 'react'
import { useFormik, } from 'formik'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'



export const Signup = () => {

    const handleSubmit = async (values) => {
        const response = await fetch('http://localhost:5000/api/createUser', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        console.log(values)
        if (!response.ok) {
            console.log(response)
            toast.error('Failed to create Account')
        } else {
            toast.success("Account Created Sucessfully")
            toast.success("Check Your Email")
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            location: '',
            email: '',
            password: '',
            //image: ''
        },
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values)
            resetForm(
                formik.initialValues
            )
        },


    })
    return (
        <>
            <ToastContainer theme='colored' position='top-center' />
            <div className='form-container' >
                <form className='htmlForm-horizontal' onSubmit={formik.handleSubmit}>

                    <h1 className='page-name mb-5'>Create Account</h1>
                    <div className="htmlForm-group ">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="control-label" name='name' placeholder="Enter name"
                            onChange={formik.handleChange}
                            value={formik.name} />
                        {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

                    </div>
                    <div className="htmlForm-group ">
                        <label htmlFor="location">Location</label>
                        <input type="text" className="control-label" name='location' id="location" placeholder="location"
                            onChange={formik.handleChange}
                            value={formik.location} />
                        {formik.touched.location && formik.errors.location ? <div>{formik.errors.location}</div> : null}
                    </div>
                    <div className="htmlForm-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="control-label" name='email' id="Email" aria-describedby="emailHelp" placeholder="Enter email"
                            onChange={formik.handleChange}
                            value={formik.email} />
                        {formik.touched.name && formik.errors.email ? <div>{formik.errors.email}</div> : null}

                    </div>
                    <div className="htmlForm-group ">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="control-label" name='password' id="Password" placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.password} />
                        {formik.touched.name && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                    </div>
                    <div className=''>
                        <button type="submit" className="m-3 btn btn-success">Sign Up</button>
                        <Link to='/login' className='link '>Already have an account</Link>
                    </div>
                </form>

            </div>

        </>
    )
}
