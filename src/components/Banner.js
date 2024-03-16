import React from 'react';
import Image from '../Banner.png';

const Banner = () => {
  const containerStyle = {
    position: 'relative',
    width: '100%',
    background: `url(${Image}) center/cover no-repeat`, // Use the imported Image variable
  };

  return (
    <div style={containerStyle} className='h-[30vh] md:h-[60vh]'>
      <div className=' text-xl md:text-3xl text-white p-4 bg-gray-900 w-full flex justify-center opacity-50'>
        Spider-Man : No Way Home
      </div>
    </div>
  );
};

export default Banner;