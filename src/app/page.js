'use client';
import React, { useEffect, useState } from 'react';
import OfferBanner from '@/components/OfferBanner';
import HeroBanner from '@/components/HeroBanner';
import HomeBanner from '@/components/HomeBanner';
import Wrapper from '@/components/Wrapper';
import { getProducts } from '@/lib/api';
import ProductCard from '@/ui/ProductCard';
import ProductSkeleton from '@/ui/ProductSkeleton';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false); // set loading to false once data is fetched
    };

    fetchProducts();
  }, []);

  // Limit displayed products to 5
  const displayedProducts = products.slice(0, 5);

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
        {/* heading and paragraph start */}
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
        {/* heading and paragraph end */}
        {/* products grid start */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0'>
          {loading
            ? Array(5)
                .fill(0)
                .map((_, index) => <ProductSkeleton key={index} />) // show 5 skeletons
            : displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
        {/* products grid end */}
        {/* Conditionally display "See More" button if there are more than 5 products */}
        {products.length > 5 && (
          <div className='text-center py-5'>
            <Link href='/products' legacyBehavior>
              <a className='inline-block'>
                <button className='px-4 py-2 bg-green-700 text-white font-semibold rounded hover:bg-green-500'>
                  See More
                </button>
              </a>
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
