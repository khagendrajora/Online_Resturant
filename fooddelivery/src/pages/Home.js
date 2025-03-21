import React, { useEffect, useRef, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Carousels } from '../components/Carousels'
import { API } from '../Config'


export const Home = () => {
  const windowSize = useRef(window.innerWidth)
  const [filteredResult, setFilteredResult] = useState([])
  const [search, setSearch] = useState('')
  const [items, setitems] = useState([])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    const fetchItem = async () => {
      try {

        const res = await axios.get(`${API}/itemlist`)
        if(Array.isArray(res.data)){
          setitems(res.data)
        }
        
      } catch (error) {
        console.error("error in fetch", error)
        setitems([])
      }
    }
    fetchItem()
  }, [])


  useEffect(() => {
    if (search) {
      const filter = items.filter((item) =>
        item.item_name.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredResult(filter)
    } else {
      setFilteredResult([])
    }
  }, [search, items])

  return (
    <>
      <Helmet>
        <title>Online Food Ordering App</title>
        <meta name="description" content="Order Foods online" />
      </Helmet>
      {windowSize.current > 576 &&
        <div className='input-wrapper'>
          <input type='search' placeholder='Search' className='form-control' value={search} onChange={handleChange} />
        </div>
      }
      <Carousels />
      <div>
        <div className='d-flex flex-row col-12 col-sm-12 flex-wrap justify-content-center'>
          {Array.isArray(filteredResult) && filteredResult.map((item, i) =>
            <Card key={i} item={item}></Card>
          )}
          {Array.isArray(items) &&
            items.map((items, i) => (
              <Card key={i} item={items}></Card>
            ))
          }
        </div>
        <hr />

      </div>
    </>
  )
}
