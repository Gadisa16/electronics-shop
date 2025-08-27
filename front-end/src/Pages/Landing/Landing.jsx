import React from 'react';
import Layout from '../../Components/Layout/Layout';
import Carousel from '../../Components/Carousel/CarouselEffect';
import Category from '../../Components/Category/Category';
import Product from '../../Components/Product/Product';
import ProductSkeleton from '../../Components/Product/ProductSkeleton';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import classes from "../../Components/Product/Product.module.css";

const Landing = () => {
  const [{ loading }] = React.useContext(DataContext);

  return (
    <Layout>
      <Carousel />
      <Category />
      {loading
        ? (
          // Show 6 skeleton cards while loading
          <div className={classes.products_container}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProductSkeleton key={`skeleton-${idx}`} />
            ))}
          </div>
        )
        : <Product />
      }
    </Layout>
  );
};

export default Landing;