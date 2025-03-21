import React from 'react'
import Topbar from '../Layout/Topbar'
import NavBar from './Navbar'

const Header = () => {
  return (
    <header className='border-b border-gray-200'>
      {/* TopBar */}
      <Topbar/>
      {/* NavBar */}
      <NavBar/>
      {/* Cart Drawer */}
    </header>
  )
}

export default Header
