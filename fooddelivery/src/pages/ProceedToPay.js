import { loadStripe } from '@stripe/stripe-js'
import React, { useState } from 'react'


export const ProceedToPay = () => {
    const [buyed, setBuyedItem] = useState([])

    const ProceedPay = async () => {
        const buyedItem = JSON.parse(localStorage.getItem('buyedItem'))
        const buyedItems = [buyedItem]
        setBuyedItem(buyedItem)
        console.log(buyed)

        const stripe = await loadStripe('pk_test_51NXj0DFEiZnfC2Vh61hPOfvAhjnFvEAOpmGcUaE58FD0sigvCVNqrv5Dv78Y3mzl2lw0t6MnMZO62CShxTQ0sFjO00nCIk6o7S')
        const data = {
            items: buyedItems
        }
        console.log(data)
        const head = {
            "Content-Type": "application/json"
        }
        const payment = await fetch('http://localhost:5000/api/create-checkout-secessions', {
            method: "POST",
            headers: head,
            body: JSON.stringify(data)
        })
        const session = await payment.json()
        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })
        localStorage.removeItem('buyedItem')
        if (result.error) {
            console.log(result.error)
        }
    }

    return (
        <>
            <div className='btn d-flex justify-content-center'>

                <button className='btn bg-success ' onClick={ProceedPay}>Proceed To Payment</button>
            </div>
        </>
    )
}
