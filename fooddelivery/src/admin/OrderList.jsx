
import React, { useEffect, useRef, useState } from 'react'
import { API } from '../Config'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


export const OrderList = () => {
    const [orderItem, setOrderItem] = useState([])
    const windowSize = useRef(window.innerWidth)
    const [filteredResult, setFilteredResult] = useState([])
    const [search, setSearch] = useState('')
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${API}/orderlist`, {
                    method: "POST",
                    headers: {
                        Accept: "application.json",
                        'Content-Type': 'application/json'
                    }
                }
                )
                setOrderItem(response.data)
            }
            catch (error) {
                console.log('error in fetching orfder', error)
            }
        }
        fetchOrder()
    })

    useEffect(() => {
        if (search) {
            const filter = orderItem.filter((orderItem) =>
                orderItem.user && orderItem.user.name.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredResult(filter)
        } else {
            setFilteredResult([])
        }
    }, [search, orderItem])

    const handelDeliver = async (id) => {
        try {
            await axios.put(`${API}/updatestatus/${id}`, { status: "delivered" })
        } catch (error) {
            console.error(error)
        }
    }
    const handelDelete = async (id) => {
        try {
            await axios.delete(`${API}/deleteorder/${id}`)
                .then(res => {
                    toast.success('Order Deleted')
                    setOrderItem(orderItem.filter(i => i._id !== id))
                    setFilteredResult([])

                }).catch(err => {
                    toast.error("failed to delete")
                })

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <ToastContainer theme='colored' color='green' position='top-center' />
            {windowSize.current > 576 &&
                <div className='input-wrapper'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type='search' className='form-control' value={search} onChange={handleChange} placeholder='Search' />
                </div>
            }
            <div className='order-container'>
                {filteredResult && filteredResult.map((data, i) =>
                    <div className='order-card' key={data._id}>
                        <div className='order-info '>
                            <div className='id'>Order_ID: {data._id}</div>
                            <hr />
                            {
                                data.orderItem.map((orderitems, j) => (
                                    <>
                                        {
                                            data.status === 'Pending' ? (
                                                <div className='info-content' style={{ backgroundColor: 'red' }}>
                                                    <div className='id'>Food_ID:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.item._id}</div>
                                                    <div className='food_name'>Food_Item:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.item.item_name}</div>
                                                    <div className='quantity'>Quantity:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.quantity}</div>
                                                    <div className='location'>Location:&nbsp;&nbsp;&nbsp;&nbsp;{data.shippingAddress1}</div>
                                                    <div className='status'>Status:&nbsp;&nbsp;&nbsp;&nbsp;{data.status}</div>
                                                    <div className='contact'>Contact:&nbsp;&nbsp;&nbsp;{data.contact}</div>
                                                </div>
                                            ) : (
                                                <div className='info-content' style={{ backgroundColor: 'green' }}>
                                                    <div className='id'>Food_ID:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.item._id}</div>
                                                    <div className='food_name'>Food_Item:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.item.item_name}</div>
                                                    <div className='quantity'>Quantity:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.quantity}</div>
                                                    <div className='location'>Location:&nbsp;&nbsp;&nbsp;&nbsp;{data.shippingAddress1}</div>
                                                    <div className='status'>Status:&nbsp;&nbsp;&nbsp;&nbsp;{data.status}</div>
                                                    <div className='contact'>Contact:&nbsp;&nbsp;&nbsp;{data.contact}</div>
                                                    <hr />
                                                </div>
                                            )
                                        }
                                    </>
                                ))}
                            <div className='price'>Total_Price:&nbsp;&nbsp;&nbsp;&nbsp;{data.totalPrice}</div>
                            {
                                data.user && (
                                    <>
                                        <div className='id'>Customer_ID:&nbsp;&nbsp;&nbsp;&nbsp;{data.user._id}</div>
                                        <div className='customer-name'>Customer_Name:&nbsp;&nbsp;&nbsp;&nbsp;{data.user.name}</div>
                                    </>
                                )
                            }
                            <div className="order-btn">
                                <button className='btn btn-danger' onClick={() => handelDeliver(data._id)}>Delivered</button>
                                <button className='btn btn-primary' onClick={() => handelDelete(data._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
                {
                    orderItem && orderItem.length > 0 ? (
                        orderItem.map((order, i) => (
                            <div className='order-card' key={order._id}>
                                <div className='order-info '>
                                    <div className='id'>Order_ID: {order._id}</div>
                                    <hr />
                                    {
                                        order.orderItem.length > 0 &&
                                        order.orderItem.map((orderitems, j) => (
                                            <>
                                                {
                                                    order.status === 'Pending' ? (
                                                        <div className='info-content' style={{ backgroundColor: 'red' }}>
                                                            <div className='id'>Food_ID:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.item._id}</div>
                                                            <div className='food_name'>Food_Item:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.item.item_name}</div>
                                                            <div className='quantity'>Quantity:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.quantity}</div>
                                                            <div className='location'>Location:&nbsp;&nbsp;&nbsp;&nbsp;{order.shippingAddress1}</div>
                                                            <div className='status'>Status:&nbsp;&nbsp;&nbsp;&nbsp;{order.status}</div>
                                                            <div className='contact'>Contact:&nbsp;&nbsp;&nbsp;{order.contact}</div>

                                                        </div>

                                                    ) : (
                                                        <div className='info-content' style={{ backgroundColor: 'green' }}>
                                                            <div className='id'>Food_ID:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.item._id}</div>
                                                            <div className='food_name'>Food_Item:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.item.item_name}</div>
                                                            <div className='quantity'>Quantity:&nbsp;&nbsp;&nbsp;&nbsp;{orderitems.quantity}</div>
                                                            <div className='location'>Location:&nbsp;&nbsp;&nbsp;&nbsp;{order.shippingAddress1}</div>
                                                            <div className='status'>Status:&nbsp;&nbsp;&nbsp;&nbsp;{order.status}</div>
                                                            <div className='contact'>Contact:&nbsp;&nbsp;&nbsp;{order.contact}</div>
                                                            <hr />
                                                        </div>
                                                    )
                                                }
                                            </>
                                        ))}
                                    <div className='price'>Total_Price:&nbsp;&nbsp;&nbsp;&nbsp;{order.totalPrice}</div>
                                    {
                                        order.user && (
                                            <>
                                                <div className='id'>Customer_ID:&nbsp;&nbsp;&nbsp;&nbsp;{order.user._id}</div>
                                                <div className='customer-name'>Customer_Name:&nbsp;&nbsp;&nbsp;&nbsp;{order.user.name}</div>
                                            </>
                                        )
                                    }
                                    <div className="order-btn d-flex">
                                        <button className='btn btn-danger' onClick={() => handelDeliver(order._id)}>Delivered</button>
                                        <button className='btn btn-primary' onClick={() => handelDelete(order._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))

                    ) : (
                        <p>No order available</p>
                    )
                }
            </div >
        </>
    )
}
