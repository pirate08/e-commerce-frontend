import React from 'react';
import OfferBanner from '@/components/OfferBanner';
import HeroBanner from '@/components/HeroBanner';
import HomeBanner from '@/components/HomeBanner';

export default function Home() {
  return (
    <div>
      {/* --OfferBanner placed here-- */}
      <OfferBanner />
      {/* --HeroBanner placed here-- */}
      <HeroBanner />
      {/* --Video HomeBanner placed here-- */}
      <div className='py-10'>
        <HomeBanner />
      </div>
    </div>
  );
}
