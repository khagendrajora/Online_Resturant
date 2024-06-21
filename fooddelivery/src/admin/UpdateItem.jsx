import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../Config'
import { ToastContainer, toast } from 'react-toastify'


const UpdateItem = () => {
    const params = useParams()
    const id = params.id
    const [initialValues, setInitialValues] = useState({})
    const [item_name, setItemName] = useState('')
    const [item_category, setItemCategory] = useState('')
    const [item_description, setItemDescription] = useState('')
    const [item_price, setItemPrice] = useState('')
    const [item_image, setItemImage] = useState(null)

    useEffect(() => {
        axios.get(`${API}/itemdetails/${id}`)
            .then(res => {
                setInitialValues(res.data)
                setItemName(res.data.item_name)
                setItemCategory(res.data.item_category)
                setItemDescription(res.data.item_description)
                setItemPrice(res.data.item_price)
                console.log(res.data)
                console.log(initialValues)
            })
            .catch(err => console.log(err))
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData()
            formData.append('item_name', item_name)
            formData.append('item_price', item_price)
            formData.append('item_description', item_description)
            formData.append('item_category', item_category)
            formData.append('item_image', item_image)

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const response = await axios.put(`${API}/itemupdate/${id}`, formData, config)
            if (response) {
                toast.success("Item Details Updated")
            }
            else {
                toast.error("Failed TO Update")
            }
        }
        catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
            <div className="container">
                <form className="shadow p-3">
                    <h3 className="text-ceter text-muted">Update Item Form</h3>
                    <div className="mb-2">
                        <label htmlFor="item_name">Item Name:</label>
                        <input
                            type="text"
                            name="item_name"
                            id="item_name"
                            className="form-control"
                            onChange={e => setItemName(e.target.value)}
                            value={item_name}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="item_price">Item Price:</label>
                        <input
                            type="number"
                            name="item_price"
                            id="item_price"
                            className="form-control"
                            onChange={e => setItemPrice(e.target.value)}
                            value={item_price}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="item_description">Item Description:</label>
                        <textarea
                            name="item_description"
                            id="item_description"
                            className="form-control"
                            rows="10"
                            cols="30"
                            onChange={e => setItemDescription(e.target.value)}
                            value={item_description}
                        ></textarea>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="item_category">Category:</label>
                        <input
                            type="text"
                            name="item_category"
                            id="item_category"
                            className="form-control"
                            onChange={e => setItemCategory(e.target.value)}
                            value={item_category}
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor='item_image'>Item Image</label>
                        <input
                            type='file'
                            name='item_image'
                            id='item_image'
                            className='form-control'
                            onChange={e => setItemImage(e.target.files[0])}
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

export default UpdateItem