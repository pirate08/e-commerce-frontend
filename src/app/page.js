import React from 'react';
import OfferBanner from '@/components/OfferBanner';
import HeroBanner from '@/components/HeroBanner';
import HomeBanner from '@/components/HomeBanner';
import Wrapper from '@/components/Wrapper';

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
      <Wrapper>
        {/* heading and paragaph start */}
        <div className='text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]'>
          <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
            Cushioning for Your Miles
          </div>
          <div className='text-md md:text-xl'>
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
          </div>
        </div>
        {/* heading and paragaph end */}
      </Wrapper>
    </div>
  );
}
