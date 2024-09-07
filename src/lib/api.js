const products = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    price: 150.0,
    discountPercentage: 10,
    image: '/images/product1.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [2, 3, 4],
  },
  {
    id: 2,
    name: 'Nike React Infinity Run',
    price: 160.0,
    discountPercentage: 15,
    image: '/images/product2.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [1, 3, 5],
  },
  {
    id: 3,
    name: 'Nike Zoom Pegasus 37',
    price: 120.0,
    discountPercentage: 5,
    image: '/images/product3.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [9, 10, 15],
  },
  {
    id: 4,
    name: 'Nike Air Force 1',
    price: 90.0,
    discountPercentage: 0,
    image: '/images/product4.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [1, 8, 7],
  },
  {
    id: 5,
    name: 'Nike Joyride Run Flyknit',
    price: 180.0,
    discountPercentage: 20,
    image: '/images/product5.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [12, 13, 15],
  },
  {
    id: 6,
    name: 'Nike Free RN 5.0',
    price: 100.0,
    discountPercentage: 8,
    image: '/images/product6.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [11, 7, 8],
  },
  {
    id: 7,
    name: 'Nike Air Zoom Structure 22',
    price: 120.0,
    discountPercentage: 12,
    image: '/images/product7.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [12, 13, 15],
  },
  {
    id: 8,
    name: 'Nike Metcon 5',
    price: 130.0,
    discountPercentage: 7,
    image: '/images/product8.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [1, 2, 4],
  },
  {
    id: 9,
    name: 'Nike Revolution 5',
    price: 65.0,
    discountPercentage: 0,
    image: '/images/product9.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [6, 4, 2],
  },
  {
    id: 10,
    name: 'Nike Air Zoom Vomero 14',
    price: 140.0,
    discountPercentage: 18,
    image: '/images/product10.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [15, 13, 12],
  },
  {
    id: 11,
    name: 'Nike Renew Run',
    price: 90.0,
    discountPercentage: 5,
    image: '/images/product11.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [6, 12, 5],
  },
  {
    id: 12,
    name: 'Nike Phantom Vision Elite',
    price: 250.0,
    discountPercentage: 25,
    image: '/images/product12.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [10, 11, 13],
  },
  {
    id: 13,
    name: 'Nike Air Zoom Tempo NEXT%',
    price: 200.0,
    discountPercentage: 10,
    image: '/images/product13.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [6, 7, 8],
  },
  {
    id: 14,
    name: 'Nike Wildhorse 6',
    price: 130.0,
    discountPercentage: 15,
    image: '/images/product14.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [1, 3, 15],
  },
  {
    id: 15,
    name: 'Nike SB Dunk Low',
    price: 100.0,
    discountPercentage: 0,
    image: '/images/product15.webp',
    thumbnail1: '/p1.png',
    thumbnail2: '/p2.png',
    thumbnail3: '/p3.png',
    thumbnail4: '/p7.png',
    relatedProducts: [4, 5, 7],
  },
];

const orders = [];

export const getProducts = () => {
  return Promise.resolve(products); // Return all products, no limit here
};

export const getProductById = (id) => {
  return Promise.resolve(products.find((p) => p.id === parseInt(id)));
};

export const getRelatedProducts = (relatedIds) => {
  return Promise.resolve(products.filter((p) => relatedIds.includes(p.id)));
};

export const login = (email, password) => {
  // Demo login, always succeeds
  return Promise.resolve({ id: 1, email });
};

export const signup = (email, password) => {
  // Demo signup, always succeeds
  return Promise.resolve({ id: 2, email });
};

// --Create a new order--
export const createOrder = (order) => {
  orders.push(order);
  return Promise.resolve(order); // Simulate posting the order
};

// Retrieve all orders
export const getOrders = () => {
  return Promise.resolve(orders); // Return the orders
};
