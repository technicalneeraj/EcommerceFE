import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/header/Header';

function Layout() {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout;