
import { faUsers, faUtensils, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { faFirstOrderAlt } from '@fortawesome/free-brands-svg-icons'


export const Admin = () => {
    const navigate = useNavigate()


    const handleAdd = () => {
        navigate('/admin/itemupload')

    }
    const handleOrder = () => {
        navigate('/admin/orderlist')
    }
    const handleDelete = () => {
        navigate('/admin/itemlist')
    }

    const handleUserList = () => {
        navigate('/admin/userlist')
    }
    return (
        <>

            <div className='admin-container'>
                <div className='extra'> Admin Dashboard</div>
                <div className='admin-body'>


                    <div className='sub-container' onClick={handleOrder} style={{ backgroundColor: 'yellow' }}>
                        <FontAwesomeIcon icon={faFirstOrderAlt} size='3x' />
                        <div className='content'>
                            Order List
                        </div>
                    </div>

                    <div className='sub-container' onClick={handleAdd} style={{ backgroundColor: 'green' }}>
                        <FontAwesomeIcon icon={faPlus} size='3x' />
                        <div className='content'>
                            Add Food Item
                        </div>
                    </div>

                    <div className='sub-container' onClick={handleDelete} style={{ backgroundColor: 'red' }}>
                        <FontAwesomeIcon icon={faUtensils} size='3x' />
                        <div className='content'>
                            Food Items List
                        </div>
                    </div>

                    <div className='sub-container' onClick={handleUserList} style={{ backgroundColor: 'pink' }}>
                        <FontAwesomeIcon icon={faUsers} size='3x' />
                        <div className='content'>
                            User List
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
