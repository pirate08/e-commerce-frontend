import React from 'react';

const HomeBanner = () => {
  return (
    <div className='relative md:w-4/5 w-11/12 mx-auto h-[300px] md:h-[600px] bg-gray-800'>
      {/* YouTube Video Embed */}
      <iframe
        className='w-full h-full'
        src='https://www.youtube.com/embed/uXlWYZ022zU?autoplay=1&mute=1&loop=1&playlist=uXlWYZ022zU'
        title='YouTube video player'
        allow='autoplay; encrypted-media'
        allowFullScreen></iframe>

      {/* Overlay Content */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <h1 className='text-white text-4xl md:text-6xl font-bold'>
          Welcome to Our Store
        </h1>
      </div>
    </div>
  );
};

export default HomeBanner;
