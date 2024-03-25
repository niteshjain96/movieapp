import React from 'react';
import Logo from '../logo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='flex px-4 sm:px-8 space-x-4 sm:space-x-8 items-center bg-black py-4'>
      <img src={Logo} className='w-10 h-10 sm:w-12 sm:h-12 rounded-full' alt='Logo' />
      <Link to='/movies' className='text-blue-400 font-bold text-sm sm:text-xl'>Movies</Link>
      <Link to='/favourites' className='text-blue-400 font-bold text-sm sm:text-xl'>Favourites</Link>
    </div>
  );
}

export default NavBar;