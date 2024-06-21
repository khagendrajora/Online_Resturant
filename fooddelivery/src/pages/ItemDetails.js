import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API, IMG_URL } from '../Config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'



export const ItemDetails = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [seen, setSeen] = useState(false)
  const [shippingAdress, setShippingAddress] = useState('')
  const [quantities, setQuantity] = useState('')
  const [contact, setContact] = useState('')
  const [item, setItem] = useState('')
  const userEmailId = (localStorage.getItem('logedinUser'))

  const tooglePop = () => {
    if (userEmailId) {
      setSeen(true)
    } else {
      toast.error("Please login or SignUp First")
      navigate('/login')
    }

  }
  const closePopup = () => {
    setSeen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      orderItem: [{
        quantity: quantities,
        item: item,
      }],
      shippingAddress1: shippingAdress,
      contact: contact,
      user: userEmailId
    }
    const headers = {
      "Content-Type": "application/json"
    }

    const response = await fetch(`${API}/postorder`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
    if (response.ok) {
      setSeen(false)
      const datas = {
        name: item.item_name,
        quantity: parseInt(quantities),
        price: item.item_price

      }

      localStorage.setItem('buyedItem', JSON.stringify(datas))
      navigate('/proceedToPay')


    } else {
      console.error("Failed to post order:", response.statusText);
      toast.error("Failed to place order. Please try again later.");
    }

  }



  useEffect(() => {
    const id = params.item_id
    axios.get(`${API}/itemdetails/${id}`)
      .then(res => setItem(res.data))
      .catch(err => console.log(err))
  }, [params.item_id])

  const addToCart = () => {

    const authToken = (localStorage.getItem('authToken'))
    const userEmail = (localStorage.getItem('logedinUserEmail'))


    if (authToken) {
      const cartItem = JSON.parse(localStorage.getItem('cart')) || []
      //const cartEmail= JSON.parse(localStorage.getItem('cart'))
      const NewCartItem = {
        id: item._id,
        item_name: item.item_name,
        item_category: item.item_category,
        item_description: item.item_description,
        item_price: item.item_price,
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
      <div className="detail-container">
        <h1>Product Details</h1>
        <div className='detailSub-container'>
          <div className="item-image">
            <div className='subItem-image'>
              <div className='small-image'><img src={`${IMG_URL}/${item.item_image}`} alt={item.item_name} /></div>
              <div className='small-image'> <img src={`${IMG_URL}/${item.item_image}`} alt={item.item_name} /></div>
              <div className='small-image'><img src={`${IMG_URL}/${item.item_image}`} alt={item.item_name} /></div>
            </div>
            <img src={`${IMG_URL}/${item.item_image}`} alt={item.item_name} />
          </div>
          <div className="item-info">
            <div className='item-name'>{item.item_name}</div>

            <div className='item-price'>Rs.&nbsp;{item.item_price} <span className='' style={{ "fontStyle": "italic" }}>/ plate</span></div>
            <div className='item-category'>Category:&nbsp;&nbsp;{item.item_category}</div>
            <div className='item-description'>{item.item_description}</div>
            <div className='item-btn'>
              <button className='btn1 bg-warning ' onClick={addToCart}>Add to Cart</button>
              <button className='btn2 bg-success ' onClick={tooglePop}>Buy</button>
              {seen ?
                <>
                  <div className='popup'>
                    <div className='popup-inner'>
                      <div className='d-flex justify-content-between'>
                        <h2>Add Details</h2>
                        <FontAwesomeIcon icon={faCircleXmark} onClick={closePopup} className='' size="2x" />
                      </div>
                      <form onSubmit={handleSubmit}>
                        <label>Quantity:</label>
                        <input type='number' value={quantities} onChange={e => setQuantity(e.target.value)} />
                        <label>Shipping Address:</label>
                        <input type='text' value={shippingAdress} onChange={e => setShippingAddress(e.target.value)} />
                        <label>Contact no:</label>
                        <input type='number' value={contact} onChange={e => setContact(e.target.value)} />
                        <button type='submit' className='bg-success p-2 border '>Place Order</button>
                      </form>

                    </div>
                  </div>

                </>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
