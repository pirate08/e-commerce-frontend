'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';


export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-8'>
      <div className='mb-4'>
        <h1 className='text-xl md:text-3xl'>Your Cart</h1>
        <div className='w-32'>
          <svg
            width='100%'
            height='10'
            viewBox='0 0 100 10'
            preserveAspectRatio='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M0,10 Q50,0 100,10'
              stroke='#334155'
              strokeWidth='2'
              fill='none'
            />
          </svg>
        </div>
      </div>
      {cart.length === 0 ? (
        <div className='h-screen flex justify-center items-center'>
          <Image
            src='/empty-cart.jpg'
            width={300} // Adjusted size for smaller screens
            height={150}
            alt='Empty Cart...'
            className='object-contain'
          />
        </div>
      ) : (
        <>
          {cart.map((item) => {
            const discountedPrice =
              item.price * (1 - item.discountPercentage / 100);
            return (
              <div
                key={item.id}
                className='flex flex-col sm:flex-row items-center justify-between border-b py-4'>
                <div className='flex items-center mb-4 sm:mb-0'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120} // Smaller width for mobile
                    height={50}
                    className='mr-4 object-cover'
                  />
                  <div>
                    <h2 className='text-lg font-semibold'>{item.name}</h2>
                    <p className='text-sm'>
                      ${discountedPrice.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className='px-2 py-1 bg-gray-200 rounded text-sm md:text-base'>
                    -
                  </button>
                  <span className='mx-2'>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className='px-2 py-1 bg-gray-200 rounded text-sm md:text-base'>
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className='ml-4 text-red-500'>
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            );
          })}
          <div className='mt-8 flex flex-col items-end'>
            <p className='text-lg md:text-xl font-bold'>
              Total: ${cartTotal.toFixed(2)}
            </p>
            <Link href='/checkout' passHref>
              <button className='mt-4 bg-green-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 rounded'>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
