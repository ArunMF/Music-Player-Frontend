import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  return (
    <div className='col-2 me-4 ms-3 rounded' style={{backgroundColor:"#1b1b1b"}}>
        {/* Sidebar */}
          <div className='p-3' style={{ borderRadius: "10px" }}>
            <Row onClick={()=>{navigate('/')}} className='text-center p-1 pt-3 my-1'><h6 className='text-center'><i class="fa-solid fa-house-crack me-2"></i> Home</h6></Row>
            <Row className='text-center p-1 pt-3 my-1'><h6 className='text-center'><i class="fa-regular fa-compass me-2"></i> Explore</h6></Row>
            <Row className='text-center p-1 pt-3 my-1'><h6 className='text-center'><i class="fa-solid fa-headphones-simple me-2"></i> Library</h6></Row>
            <Row className='text-center p-1 pt-3 my-1'><h6 className='text-center'><i class="fa-solid fa-record-vinyl me-2"></i> Upgrade</h6></Row>
          </div>
          <div className='py-4 text-center'>
            <button className='btn bg-white text-black px-4' style={{ borderRadius: "20px" }}><i class="fa-solid fa-plus"></i> New Playlist</button>
          </div>
    </div>
  )
}

export default Sidebar