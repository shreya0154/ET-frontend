// import React from 'react'
import Header from './Header'
import Footer from './Footer.js'
// import Navbar from './Navbar.js'
import '../../styles/style.scss'

const Layout = ({children }) =>{
  return (
    <>
    
    {/* <div className='content-footer'> */}
        <div className="page-wrapper d-flex flex-column min-vh-100">

      {/* <div className='page-wrapper'> */}
    <Header/>
      <main className="content pt-5 mt-4">{children}</main>
    <Footer/>
    </div>
    </>
  )
}

export default Layout