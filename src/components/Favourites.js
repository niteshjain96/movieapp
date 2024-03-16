import React,{useState} from 'react'
import Pagination from './Pagination'
import Tables from './Tables';

const Favourites = () => {
  const [curGenre,setCurGenre]=useState('All Genres');
  return (
    <>
    <div className='mt-4 px-2 flex justify-center flex-wrap space-x-2'>
    <button className='m-2 text-xl p-2 bg-blue-500 text-white rounded-xl font-bold'>All Genres</button>
    <button className='m-2 text-xl p-2 bg-gray-400 hover:bg-blue-500 text-white rounded-xl font-bold'>Action</button>
    </div>
    <div className='text-center'>
      <input type='text' placeholder='Search' className='border border-2 text-center p-1 m-2'/>
      <input type='number' placeholder='Rows' className='border border-2 text-center p-1 m-2'/>
    </div>

    <Tables/>
    <div className='mt-4'>
        <Pagination/>
    </div>
    </>
  )
}

export default Favourites