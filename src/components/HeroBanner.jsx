'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: '/slide-1.png', alt: 'Slide 1' },
    { image: '/slide-2.png', alt: 'Slide 2' },
    { image: '/slide-3.png', alt: 'Slide 3' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // Auto-advance every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative text-white text-[20px] w-full max-w-[1360px] mx-auto'>
      <div className='relative h-[300px] md:h-[600px] overflow-hidden'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}>
            <img
              src={slide.image}
              alt={slide.alt}
              className='w-full h-full object-cover'
            />
            <div className='px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90'>
              <Link href='/products'>Shop now</Link>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className='absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90'>
        <BiArrowBack className='text-sm md:text-lg' />
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90'>
        <BiArrowBack className='rotate-180 text-sm md:text-lg' />
      </button>
    </div>
  );
};

export default HeroBanner;
