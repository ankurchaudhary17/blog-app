import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <>
      <Header/>
      {/* <Outlet/>  that go to be the dynamic path of our application */}
      <Outlet/>
      
      <Footer/>
    </>
  )
}

export default Layout
