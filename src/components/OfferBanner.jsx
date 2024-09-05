'use client';

import React, { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';

const OfferBanner = () => {
  // State to manage banner visibility
  const [isVisible, setIsVisible] = useState(true);

  // Close the banner
  const handleClose = () => {
    setIsVisible(false);
  };

  // Only show the banner if `isVisible` is true
  if (!isVisible) return null;

  return (
    <div className='w-full bg-gray-400 px-3 py-2 text-white text-center relative'>
      <span>🎉 50% Discount on all items! 🎉</span>

      {/* Close button */}
      <button
        className='absolute right-5 top-3 text-white text-lg font-bold'
        onClick={handleClose}>
        <VscChromeClose />
      </button>
    </div>
  );
};

export default OfferBanner;
