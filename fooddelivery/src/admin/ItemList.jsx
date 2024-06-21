import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { API } from '../Config'
import { FaPenAlt, FaTrash } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


export const ItemList = () => {
    const [search, setSearch] = useState('')
    const [filteredResult, setFilteredResult] = useState([])
    const windowSize = useRef(window.innerWidth)
    const [item, setitem] = useState([])
    const navigate = useNavigate()

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        axios.get(`${API}/itemlist`)
            .then(res => {
                setitem(res.data)
            }).catch(err => console.log(err))
    })

    useEffect(() => {
        if (search) {
            const filter = item.filter((item) =>
                item.item_name.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredResult(filter)
        } else {
            setFilteredResult([])
        }
    }, [search, item])


    const Delete = id => {
        const confirmed = window.confirm('Are you sur you want to delete this food item')
        if (confirmed) {
            axios.delete(`${API}/deleteitem/${id}`)
                .then(res => {
                    toast.success('item deleted')
                    setitem(item.filter(i => i._id !== id))
                }).catch(err => {
                    toast.error('failed tom delete')
                })
        }
    }

    const Edit = id => {
        navigate(`/admin/itemupdate/${id}`)


    }
    return (
        <>
            <ToastContainer theme='colored' position='top-center' />

            {windowSize.current > 576 &&
                <div className='input-wrapper'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type='search' className='form-control' value={search} onChange={handleChange} placeholder='Search' />
                </div>
            }
            <div className='item-list'>
                <div className='data'>
                    <table className='table  table-bordered table-striped'>
                        <thead className=''>
                            <tr className=''>
                                <th>Item Name</th>
                                <th>Price/plate</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResult && filteredResult.map((item, i) =>

                                <tr key={i}>
                                    <td>{item.item_name}</td>
                                    <td>{item.item_price}</td>
                                    <td>
                                        <div className='action'>
                                            <button className='btn btn-danger' onClick={() => Delete(item._id)}><FaTrash /></button>
                                            <button className='btn btn-success' onClick={() => Edit(item._id)}><FaPenAlt /></button>
                                        </div>
                                    </td>
                                </tr>

                            )}
                            {
                                item && item.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.item_name}</td>
                                        <td>{item.item_price}</td>
                                        <td>
                                            <div className='action'>
                                                <button className='btn btn-danger me-1' onClick={() => Delete(item._id)}><FaTrash /></button>
                                                <button className='btn btn-success' onClick={() => Edit(item._id)}><FaPenAlt /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
