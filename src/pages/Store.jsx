import React from 'react'
import { Row, Col } from 'react-bootstrap' 
import storeItems from '../data/items.json'
import StoreItem from '../components/StoreItem'

function Store() {
  return (
    <>
        <h1>Store</h1>
         {/* the spread item takes in all the item features like name, id, etc as a prop */}   
        <Row md={2} xs={1} lg={3} className='g-3'>
            {storeItems.map(item => (
                <Col key={item.id}><StoreItem {...item}></StoreItem></Col> 
            ))}
        </Row>
    </>
  )
}

export default Store