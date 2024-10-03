import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation/Navigation';
import Navigation1 from './components/Navigation/Navigation1';

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