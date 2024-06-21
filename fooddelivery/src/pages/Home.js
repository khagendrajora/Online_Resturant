import React, { useEffect, useRef, useState } from 'react'
import Card from '../components/Card'
import { API } from '../Config'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Carousels } from '../components/Carousels'


export const Home = () => {
  const windowSize = useRef(window.innerWidth)
  const [filteredResult, setFilteredResult] = useState([])
  const [search, setSearch] = useState('')
  const [items, setitems] = useState([])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  console.log(search)
  useEffect(() => {
    const fetchItem = async () => {
      try {

        const res = await axios.get(`${API}/itemlist`)
        setitems(res.data)
      } catch (error) {
        console.error("error in fetch", error)
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
          {filteredResult && filteredResult.map((item, i) =>
            <Card key={i} item={item}></Card>
          )}
          {
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
