import React from 'react';
import Layout from '../../Components/Layout/Layout';
import Carousel from '../../Components/Carousel/CarouselEffect';
import Category from '../../Components/Category/Category';
import Product from '../../Components/Product/Product';
import ProductSkeleton from '../../Components/Skeleton/ProductSkeleton';
import { DataContext } from '../../Components/DataProvider/DataProvider';

const Landing = () => {
  const [{ loading }] = React.useContext(DataContext);

  return (
    <Layout>
      <Carousel />
      <Category />
      {loading ? <ProductSkeleton /> : <Product />}
    </Layout>
  );
};

export default Landing;