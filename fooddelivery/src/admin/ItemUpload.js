import React, { useState } from 'react'
import { API } from '../Config'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

const ItemUpload = () => {

    const [itemData, setItemData] = useState({
        item_name: '',
        item_price: '',
        item_description: '',
        item_category: '',
        item_image: ''
    })
    const {
        item_name,
        item_price,
        item_description,
        item_category,


    } = itemData

    const handleChange = (name) => (event) => {
        setItemData({
            ...itemData,
            error: false,
            [name]: event.target.value,
        })
    }

    const handleImageChange = (event) => {
        setItemData({
            ...itemData,
            item_image: event.target.files[0]
        });

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('item_name', itemData.item_name);
            formData.append('item_price', itemData.item_price);
            formData.append('item_category', itemData.item_category);
            formData.append('item_description', itemData.item_description);
            formData.append('item_image', itemData.item_image);

            const Config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }

            }
            const response = await axios.post(`${API}/itemupload`, formData, Config);
            if (response) {
                toast.success("Item added successfully")
            }
            setItemData({
                item_name: '',
                item_price: '',
                item_description: '',
                item_category: '',
                item_image: ''
            })

        }
        catch (err) {
            toast.error('Failed to add Food item', err)
        }

    }
    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
            <div className='uploadItem-container'>
                <form className='upload-itemForm p-1' enctype="multipart/form-data" method="post" >
                    <h1 className='page-name'>Add New Food Item</h1>
                    <div className="upload-itemform">
                        <label htmlfor="item_name">Item Name</label>
                        <input type="text" className="form-control" name='item_name' id="item_name" placeholder="Name of the item"
                            onChange={handleChange('item_name')}
                            value={item_name} />
                    </div>

                    <div className="upload-itemform">
                        <label htmlfor="item_category">Item Category</label>
                        <input type="text" name='item_category' className="form-control" id="item_category" placeholder="Item Category"
                            onChange={handleChange('item_category')}
                            value={item_category} />
                    </div>


                    <div className="upload-itemform">
                        <label htmlfor="item_description">Item Description</label>
                        <input type="text" rows='4' cols='50' name='item_description' className="form-control" id="description" placeholder="Item Description"
                            onChange={handleChange('item_description')}
                            value={item_description} />
                    </div>


                    <div className="upload-itemform">
                        <label htmlfor="item_price">Item Price</label>
                        <input type="number" name='item_price' className="form-control" id="item_price" placeholder="Item Price"
                            onChange={handleChange('item_price')}
                            value={item_price} />
                    </div>

                    <div className="form-group">
                        <label htmlfor="file">Image</label>
                        <input type="file" name='item_image' className="form-control" id="item_image"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Add Food</button>
                </form>
            </div>
        </>
    )

}
export default ItemUpload