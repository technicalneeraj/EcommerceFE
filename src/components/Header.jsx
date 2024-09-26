import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className='sticky top-0 bg-gray-400'>
      <Link to="/signup">Signup</Link>
    </header>
    
  )
}

export default Header