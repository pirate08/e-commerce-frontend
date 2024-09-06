import { Skeleton, Box } from '@chakra-ui/react';

const ProductSkeleton = () => (
  <Box className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer'>
    <Skeleton height='200px' mb={5} />
    <Box p={4}>
      <Skeleton height='20px' width='80%' mb={2} />
      <Skeleton height='20px' width='60%' />
    </Box>
  </Box>
);

export default ProductSkeleton;
