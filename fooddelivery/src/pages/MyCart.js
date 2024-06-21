import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { IMG_URL } from '../Config';


const MyCart = () => {
    const [cartItem, setCartItem] = useState([])
    const [mycartItem, setMyCartItem] = useState([])
    const [totalBill, setTotalBill] = useState('')


    useEffect(() => {
        const fetchCart = async () => {
            const cartDetails = JSON.parse(localStorage.getItem('cart'))
            setCartItem(cartDetails)

        }
        fetchCart()
    }, [])
    useEffect(() => {
        if (cartItem) {
            const user = localStorage.getItem('logedinUser')
            const cart = cartItem.filter(item => item.userId === user)

            if (cart) {
                const totalBill = cart.reduce((totalBill, item) => totalBill + item.totalPrice, 0)
                setTotalBill(totalBill)

                setMyCartItem(cart)
                localStorage.setItem('mycartItem', JSON.stringify(cart))
                localStorage.setItem('totalBill', JSON.stringify(totalBill))

            } else {
                console.log('not found')
            }
        }
    }, [cartItem])
    console.log(totalBill)
    //increase quantity
    const IncreaseQty = ((i, id, total, price) => {
        const updateCart = [...mycartItem]

        updateCart[i].quantity += 1
        updateCart[i].totalPrice = total + price

        setMyCartItem(updateCart)
        localStorage.setItem(('cart'), JSON.stringify(updateCart))

    })
    //decrease quantity
    const DecreaseQty = ((i, id, total, price) => {
        const updateCart = [...mycartItem]
        if (updateCart[i].quantity > 1) {
            updateCart[i].quantity -= 1
            updateCart[i].totalPrice = total - price
            setMyCartItem(updateCart)
            localStorage.setItem(('cart'), JSON.stringify(mycartItem))
        }

    })
    const Delete = (id) => {
        const cartDetails = JSON.parse(localStorage.getItem('cart'))
        const filterCart = cartDetails.filter((item) => item.id !== id)
        setCartItem(filterCart)
        localStorage.setItem(('cart'), JSON.stringify(filterCart))
        toast.success('Item Removed form the cart')
    }

    //payment integration
    const makePayment = async () => {
        // setOrder(true)
        const stripe = await loadStripe('pk_test_51NXj0DFEiZnfC2Vh61hPOfvAhjnFvEAOpmGcUaE58FD0sigvCVNqrv5Dv78Y3mzl2lw0t6MnMZO62CShxTQ0sFjO00nCIk6o7S')
        const body = {
            products: mycartItem

        }
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch('http://localhost:5000/api/create-checkout-secession', {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })
        const session = await response.json()
        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })
        if (result.error) {
            console.log(result.error)

        }

    }


    return (
        <>
            <div className="col d-flex flex-column align-items-center">
                <h1 className="">Shopping Cart</h1>
                <h6 className="">{mycartItem.length} items</h6>
            </div>
            <div className='mycart'>
                {mycartItem.length > 0 ? (
                    <div className='p-3'>
                        {mycartItem.map((item, i) => (
                            <Fragment key={i}>
                                <div className=" ">
                                    <div className="p-1">
                                        <hr className="my-4 " />
                                        <div className="cartbody">
                                            <div>
                                                <button className='btn  btn-danger ' onClick={() => Delete(item.id)}><FaTrash /></button>
                                            </div>
                                            <div className="mycartimg">
                                                <img
                                                    src={`${IMG_URL}/${item.item_img}`}
                                                    className="img-fluid rounded-3" alt="" />
                                            </div>
                                            <div className="col-2">
                                                <h6 className="text-muted">{item.item_name}</h6>
                                                <h6 className="text-black mb-0">{item.item_category}</h6>
                                            </div>
                                            <div className="col-2">
                                                <h6 className="mb-0">Rs.{item.item_price}</h6>
                                            </div>
                                            <div className='col-3 mt-4 '>
                                                <button className='btn bg-primary mb-1 ' onClick={() => IncreaseQty(i, item.id, item.item_price * item.quantity, item.item_price)}>+ </button>
                                                <input type='number' name='qty' value={item.quantity} readOnly className='form-control mb-1' />
                                                <button className='btn bg-danger' onClick={() => DecreaseQty(i, item.id, item.totalPrice, item.item_price)}>-</button>
                                            </div>
                                            <div className='total_Price col-3 mt-3'><h5>Total Price: {item.quantity}*{item.item_price}= Rs. {item.quantity * item.item_price} </h5>
                                            </div>

                                        </div>
                                        <hr className="my-4 " />

                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                ) : <div>
                    <h1 className='d-flex justify-conten-center'>Your Cart is empty</h1>
                </div>
                }
                <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />
                        <h2>Total Units: {mycartItem.reduce((ac, item) => ac + item.quantity, 0)}</h2>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                            <h2 className="text-uppercase">Total Bill</h2>
                            <h2>Rs. {mycartItem.reduce((totalBill, item) => totalBill + item.totalPrice, 0)}</h2>
                        </div>
                        <button type="button" className="btn btn-dark btn-block btn-lg" onClick={makePayment}
                            data-mdb-ripple-color="dark">Confirm Order</button>
                    </div>
                </div>
                <div className="pt-5">
                    <Link to='/' className=' ' style={{ "fontFamily": 'monospace', "color": 'GrayText' }}  >Back To Home</Link>
                </div>
            </div>
        </>
    )

}
export default MyCart