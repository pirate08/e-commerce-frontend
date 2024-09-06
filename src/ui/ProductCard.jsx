import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  // Ensure the product exists and has valid properties
  if (!product) {
    return null; // or you can return a fallback UI here
  }

  const { id, name, price, discountPercentage, image } = product;
  const discountedPrice = price * (1 - discountPercentage / 100);

  return (
    <Link href={`/products/${id}`} passHref>
      <div className='transform overflow-hidden bg-white duration-200 hover:scale-125 cursor-pointer'>
        <img src={image} className='w-full h-64 object-cover mb-5' alt={name} />
        <div className='p-4 text-black/[0.9]'>
          <h2 className='text-lg font-medium'>{name}</h2>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center text-black/[0.9]'>
              <p className='mr-2 text-lg font-semibold'>
                ${discountedPrice.toFixed(2)}
              </p>
              {discountPercentage > 0 && (
                <p
                  className='text-base font-medium'
                  style={{
                    textDecorationLine: 'line-through',
                    color: '#bab8b8',
                  }}>
                  ${price.toFixed(2)}
                </p>
              )}
            </div>
            {discountPercentage > 0 && (
              <div>
                <p
                  className='ml-auto text-right text-base font-medium'
                  style={{ color: 'green' }}>
                  {discountPercentage}% off
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
