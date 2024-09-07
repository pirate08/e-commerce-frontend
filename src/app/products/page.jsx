'use client';

import React, { useEffect, useState } from 'react';
import { getProducts } from '@/lib/api';
import ProductCard from '@/ui/ProductCard';
import ProductSkeleton from '@/ui/ProductSkeleton';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // For filtered products
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts(); // Fetch all products
        setProducts(fetchedProducts); // Set all products
        setFilteredProducts(fetchedProducts); // Initialize filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when page changes
  }, [currentPage]);

  // Search and Filter Logic
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterProducts(term, minPrice, maxPrice);
  };

  const handlePriceChange = () => {
    filterProducts(searchTerm, minPrice, maxPrice);
  };

  const filterProducts = (term, minPrice, maxPrice) => {
    let filtered = products;

    // Filter by search term
    if (term) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(term)
      );
    }

    // Filter by price range
    if (minPrice !== '' || maxPrice !== '') {
      filtered = filtered.filter((product) => {
        const price = product.price;
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        return price >= min && price <= max;
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage); // Calculate total pages
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  ); // Paginate

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className='min-h-screen px-5 py-5 md:px-14 md:py-14'>
      <div className='relative mb-8 flex justify-between items-center'>
        <div className='flex items-center'>
          <h1 className='text-xl md:text-3xl'>All Products</h1>
          <span className='ml-4 text-sm text-gray-500'>
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <div className='w-32 absolute top-8 left-0 md:left-5'>
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

      {/* Search and Filter Section */}
      <div className='flex flex-col md:flex-row md:space-x-4 mb-4'>
        {/* Search */}
        <input
          type='text'
          placeholder='Search by name...'
          value={searchTerm}
          onChange={handleSearch}
          className='px-4 py-2 w-full border rounded-md mb-2 md:mb-0'
        />

        {/* Price Range Filter */}
        <div className='flex flex-col md:flex-row md:space-x-4 gap-2'>
          <input
            type='number'
            placeholder='Min Price'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className='px-4 py-2 border rounded-md'
          />
          <input
            type='number'
            placeholder='Max Price'
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className='px-4 py-2 border rounded-md'
          />
          <button
            onClick={handlePriceChange}
            className='px-4 py-2 bg-green-700 hover:bg-orange-600 text-white rounded-md'>
            Filter
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => <ProductSkeleton key={index} />)
          : displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* Pagination Controls */}
      {!loading && filteredProducts.length > 0 && (
        <div className='flex justify-between items-center mt-8'>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 rounded-md ${
              currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-300'
            }`}>
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-200 rounded-md ${
              currentPage === totalPages
                ? 'cursor-not-allowed'
                : 'hover:bg-gray-300'
            }`}>
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
