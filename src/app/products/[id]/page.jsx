'use client'; // Make this a client-side component

import { useEffect, useState } from 'react';
import { getProductById, getRelatedProducts } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import ProductSkeleton from '@/ui/ProductSkeleton';
import { useCart } from '@/context/CartContext';
import { useToast } from '@chakra-ui/react';

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Product added to Cart',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {
    // Fetch product and related products on component mount
    const fetchProductData = async () => {
      try {
        const fetchedProduct = await getProductById(params.id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);

          // Fetch related products
          if (fetchedProduct.relatedProducts) {
            const fetchedRelatedProducts = await getRelatedProducts(
              fetchedProduct.relatedProducts
            );
            setRelatedProducts(fetchedRelatedProducts);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [params.id]);

  // Handle quantity increment
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Handle quantity decrement
  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (loading) {
    return (
      <div className='py-10'>
        <ProductSkeleton />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Calculate discounted price
  const discountedPrice =
    product.price - product.price * (product.discountPercentage / 100);

  return (
    <div>
      <div className='container mx-auto px-2 md:px-16 py-8 flex flex-col md:flex-row gap-8'>
        {/* Left Column for images */}
        <div className='flex flex-col items-center md:items-start'>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className='rounded-lg mb-4'
          />
          <div className='flex gap-2'>
            {product.thumbnail1 && (
              <Image
                src={product.thumbnail1}
                alt='Thumbnail 1'
                width={80}
                height={80}
                className='rounded-md cursor-pointer hover:border-2 hover:border-orange-500'
              />
            )}
            {product.thumbnail2 && (
              <Image
                src={product.thumbnail2}
                alt='Thumbnail 2'
                width={80}
                height={80}
                className='rounded-md cursor-pointer hover:border-2 hover:border-orange-500'
              />
            )}
            {product.thumbnail3 && (
              <Image
                src={product.thumbnail3}
                alt='Thumbnail 3'
                width={80}
                height={80}
                className='rounded-md cursor-pointer hover:border-2 hover:border-orange-500'
              />
            )}
            {product.thumbnail4 && (
              <Image
                src={product.thumbnail4}
                alt='Thumbnail 4'
                width={80}
                height={80}
                className='rounded-md cursor-pointer hover:border-2 hover:border-orange-500'
              />
            )}
          </div>
        </div>

        {/* Right Column for product details */}
        <div className='flex-1'>
          <p className='text-sm text-green-500 uppercase mb-2'>Nike</p>
          <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
          <p className='text-gray-500 mb-6 md:w-3/4'>
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>

          {/* Pricing Section */}
          <div className='flex items-center mb-6'>
            <p className='text-2xl font-bold'>${discountedPrice.toFixed(2)}</p>
            {product.discountPercentage > 0 && (
              <span className='text-green-500 font-bold text-lg ml-4'>
                {product.discountPercentage}% Off
              </span>
            )}
            <p className='line-through text-gray-500 ml-4'>
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Quantity selector */}
          <div className='flex items-center mb-6'>
            <div className='flex items-center border px-4 py-2 rounded-md'>
              <button
                className='text-lg font-bold'
                onClick={handleDecreaseQuantity}>
                -
              </button>
              <span className='mx-4 text-lg'>{quantity}</span>
              <button
                className='text-lg font-bold'
                onClick={handleIncreaseQuantity}>
                +
              </button>
            </div>
            <button
              className='ml-4 bg-green-700 hover:bg-orange-600 text-white px-6 py-3 rounded-md'
              onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className='container mx-auto px-2 md:px-16 py-8'>
          <div className='mt-12'>
            <div className='mb-6'>
              <h2 className='text-2xl font-bold'>Related Products</h2>
              <div className='w-32 ml-4'>
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
            <div className='flex gap-8 flex-wrap overflow-x-auto'>
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  passHref>
                  <div className='flex-shrink-0'>
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={400}
                      height={400}
                      className='rounded-lg'
                    />
                    <p className='mt-2 text-lg font-semibold'>
                      {relatedProduct.name}
                    </p>
                    <p className='text-black'>
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
