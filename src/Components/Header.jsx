import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';

function Header() {
  return (
    <div>
         <MDBNavbar light>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <h1 className='text-white px-5'><span style={{fontFamily:'Protest Strike'}}>Music</span><span style={{fontFamily:"Pacifico"}}>Player</span></h1>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header