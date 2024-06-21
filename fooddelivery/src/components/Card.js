import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { API, IMG_URL } from '../Config';
import { ToastContainer, toast } from 'react-toastify';


const Card = (props) => {
    const [item, setItem] = useState({})
    const { _id, item_name, item_category, item_description, item_price, item_image } = props.item
    useEffect(() => {
        axios.get(`${API}/itemdetails/${_id}`)
            .then(res => setItem(res.data))
            .catch(err => console.log(err))


    }, [_id])


    if (!props.item) {
        return <div>Loading...</div>; // Return a loading state or an error message if props.items is undefined
    }

    const handleCart = async () => {
        // setAddToCart(true)
        const authToken = localStorage.getItem('authToken')
        const userEmail = localStorage.getItem('logedinUserEmail')
        const userEmailId = localStorage.getItem('logedinUser')
        if (authToken) {
            const cartItem = JSON.parse(localStorage.getItem('cart')) || []
            //const cartEmail= JSON.parse(localStorage.getItem('cart'))
            const NewCartItem = {
                id: item._id,
                item_name: item.item_name,
                item_category: item.item_category,
                item_description: item.item_description,
                item_price: item.item_price,
                item_img: item.item_image,
                userEmail: userEmail,
                userId: userEmailId,
                quantity: 1,
                totalPrice: item.item_price

            }
            const existingEmail = cartItem.find((item) => item.userEmail === NewCartItem.userEmail && item.id === NewCartItem.id) //this process is called combinational check of id and email in a particular cart item.

            //const existingItem = cartItem.find((item => item.id === NewCartItem.id))  this process checks the user email and id in entire cart
            if (existingEmail) {
                toast.error("Item already in cart")
            } else {
                cartItem.push(NewCartItem)
                localStorage.setItem('cart', JSON.stringify(cartItem))
                toast.success(`${NewCartItem.item_name} added to cart`)
            }
        }
        else {
            toast.error('Please login or signup first')
        }
    }
    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
            <div className='card-container'>
                <div className="card m-3" >
                    <div className='card-img-top'>
                        <img className="" src={`${IMG_URL}/${item_image}`} alt="pp" />
                    </div>
                    <div className="card-body">
                        <div className='card-name'>
                            <div className="card-title">{item_name}</div>
                            <div className="card-category">Category:-   {item_category}</div>
                        </div>

                        <div className='card-description'>
                            <div className="card-text">{item_description}</div>
                            <div className='d-inline ms-2 text-danger'>
                                Price:{item_price}
                            </div>
                        </div>
                        <hr />
                        <Link to={`itemdetails/${_id}`} className='btn bg-warning mb-3 '>View details</Link>
                        <button className='btn bg-success' onClick={handleCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Card