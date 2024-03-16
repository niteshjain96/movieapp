import React from 'react'

const Pagination = ({pageNumber,goAhead,goPrevious}) => {
  
  return (
    <>
    <div className='w-full flex justify-center'>
    <button className='p-2 border-2 border-indigo-500 text-indigo-500 border-r-0 rounded-l-xl bg-gray-100' 
    onClick={goPrevious}
    >Previous</button>
    <button className='p-2 border-2 border-indigo-500 text-indigo-500 bg-gray-100'>
      {pageNumber}
      </button>
    <button className='p-2 border-2 border-indigo-500 text-indigo-500 border-l-0 rounded-r-xl bg-gray-100' 
    onClick={goAhead}
    >Next</button>
    </div>
    </>
  )
}

export default Pagination