'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { createOrder } from '@/lib/api'; // Assuming you have an API function to create orders
import { useToast } from '@chakra-ui/react';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const toast = useToast();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      items: cart,
      total,
      customerInfo: formData,
      date: new Date().toLocaleDateString(), // Adding order date
    };

    // API call to create order
    createOrder(order)
      .then(() => {
        clearCart();
        // Optionally redirect or show a confirmation message
        console.log('Order submitted successfully:', order);
      })
      .catch((error) => {
        console.error('Failed to submit order:', error);
      });

    // Also save the order to localStorage (for local persistence)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...orders, order]));
  };

  return (
    <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-8'>
      <div className='mb-4'>
        <h1 className='text-xl md:text-3xl'>Checkout</h1>
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

      {/* Order Summary */}
      <div className='mb-8'>
        <h2 className='text-lg mb-4'>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className='flex items-center mb-4'>
            <Image src={item.image} alt={item.name} width={80} height={50} />
            <div className='ml-4'>
              <h3 className='font-semibold'>{item.name}</h3>
              <p>
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
          </div>
        ))}
        <p className='text-xl font-bold'>Total: ${total.toFixed(2)}</p>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block mb-2'>Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Address</label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleInputChange}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Phone</label>
          <input
            type='text'
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Card Number</label>
          <input
            type='text'
            name='cardNumber'
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>

        <div className='flex space-x-4'>
          <div className='mb-4'>
            <label className='block mb-2'>Expiry Date</label>
            <input
              type='text'
              name='expiryDate'
              value={formData.expiryDate}
              onChange={handleInputChange}
              required
              className='w-full px-3 py-2 border rounded'
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-2'>CVV</label>
            <input
              type='text'
              name='cvv'
              value={formData.cvv}
              onChange={handleInputChange}
              required
              className='w-full px-3 py-2 border rounded'
            />
          </div>
        </div>

        <button
          type='submit'
          className='mt-4 bg-green-700 hover:bg-orange-600 text-white px-6 py-3 rounded-md'
          onClick={() =>
            toast({
              title: 'Order Placed',
              description: 'Check the My Orders to track your orders.',
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
          }>
          Place Order
        </button>
      </form>
    </div>
  );
}
