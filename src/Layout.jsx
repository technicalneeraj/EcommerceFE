import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation/Navigation';

function Layout() {
  return (
    <>
    <Navigation/>
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout;