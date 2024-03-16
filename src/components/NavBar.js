import React from 'react'
import Logo from '../logo.png'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <>
    <div className='flex px-8 space-x-8 items-center bg-black py-4' >
    <img src={Logo} className='w-[50px] md:w-[60px] h-12 rounded-2xl' alt='Logo'/>
    <Link to='/movies'><h2 className='text-blue-400 font-bold text-xl md:text-3xl '>Movies</h2></Link>
    <Link to='/favourites'><h2 className='text-blue-400 font-bold text-xl md:text-3xl'>Favourites</h2></Link>
    </div>
    </>
  )
}

export default NavBar