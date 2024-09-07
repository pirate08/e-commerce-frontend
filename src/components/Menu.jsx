import React from 'react';
import Link from 'next/link';
import { BsChevronDown } from 'react-icons/bs';

// --NavItems--
const data = [
  { id: 1, name: 'Home', url: '/' },
  { id: 2, name: 'Categories', subMenu: true },
  { id: 3, name: 'Products', url: '/products' },
  { id: 4, name: 'My Orders', url: '/orders' },
  { id: 5, name: 'Contact', url: '/contact' },
];

// --Sub NavItems--
const subMenuData = [
  { id: 1, name: 'Jordan', doc_count: 11 },
  { id: 2, name: 'Sneakers', doc_count: 8 },
  { id: 3, name: 'Running shoes', doc_count: 64 },
  { id: 4, name: 'Football shoes', doc_count: 107 },
];

const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
  return (
    <ul className='hidden md:flex items-center gap-8 font-medium text-black'>
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {/* --Logic to check if submenu is true or not if true then it will display submenu */}
            {!!item?.subMenu ? (
              <li
                className='cursor-pointer flex items-center gap-2 relative'
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}>
                {item.name}
                <BsChevronDown size={14} />

                {showCatMenu && (
                  <ul className='bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg'>
                    {/* {categories?.map(({ attributes: c, id }) => {
                      return (
                        <Link
                          key={id}
                          href={`/category/${c.slug}`}
                          onClick={() => setShowCatMenu(false)}>
                          <li className='h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md'>
                            {c.name}
                            <span className='opacity-50 text-sm'>
                              {`(${c.products.data.length})`}
                            </span>
                          </li>
                        </Link>
                      );
                    })} */}
                    {subMenuData.map((submenu) => {
                      return (
                        <Link key={submenu.id} href='/'>
                          <li className='h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md'>
                            {submenu.name}
                            <span className='opacity-50 text-sm'>78</span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              // --Other navItems--
              <li className='cursor-pointer'>
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
