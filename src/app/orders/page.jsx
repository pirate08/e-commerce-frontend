'use client';
import { useEffect, useState } from 'react';
import { getOrders } from '@/lib/api';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import { useToast } from '@chakra-ui/react';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  const handleRemoveItem = (orderIndex, itemIndex) => {
    // Create a deep copy of the orders array
    const updatedOrders = [...orders];

    // Remove the item from the specific order
    updatedOrders[orderIndex].items.splice(itemIndex, 1);

    // If the order has no more items, remove the entire order
    if (updatedOrders[orderIndex].items.length === 0) {
      updatedOrders.splice(orderIndex, 1);
    }

    // Update the orders state with the new data
    setOrders(updatedOrders);

    // Optionally update orders in localStorage or API
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-8'>
      <div className='mb-6'>
        <h1 className='text-xl md:text-3xl'>My Orders</h1>
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
      {orders.length > 0 ? (
        orders.map((order, orderIndex) => (
          <div key={orderIndex} className='mb-4 p-4 border rounded shadow-sm'>
            <h2 className='text-lg font-bold'>Order #{orderIndex + 1}</h2>
            <p>Date: {order.date}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
            <div className='mt-2'>
              <h3 className='text-md font-semibold mb-2'>Items:</h3>
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className='flex items-center mb-2'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-20 h-20 mr-4'
                  />
                  <div>
                    <p>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(orderIndex, itemIndex)}
                    className='ml-4 text-red-500 hover:text-red-700'
                    title='Remove item'>
                    <MdDelete
                      size={20}
                      onClick={() =>
                        toast({
                          title: 'Order Removed',
                          status: 'success',
                          duration: 2000,
                          isClosable: true,
                        })
                      }
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className='flex h-screen items-center justify-center'>
          <Image
            src='/noorders.webp'
            width={300}
            height={150}
            alt='Empty Cart...'
            className='object-contain'
          />
        </p>
      )}
    </div>
  );
}
