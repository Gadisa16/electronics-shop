// Results.jsx
import React, { useContext, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import ProductCard from '../../Components/Product/ProductCard';
import classes from './results.module.css';
import Loader from '../../Components/Loader/Loader';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import ProductSkeleton from '../../Components/Skeleton/ProductSkeleton';

const Results = memo(() => {
  const { categoryName } = useParams();
  const [{ filteredProducts, loading, error, products }, dispatch] = useContext(DataContext);

  // Apply filter when products are available or when category changes
  useEffect(() => {
    if (!products || products.length === 0) return;

    if (categoryName) {
      dispatch({
        type: Type.FILTER_PRODUCTS,
        payload: { category: categoryName, searchTerm: '' },
      });
    } else {
      // clear filters -> will set filteredProducts to all products
      dispatch({
        type: Type.FILTER_PRODUCTS,
        payload: { category: '', searchTerm: '' },
      });
    }
  }, [categoryName, products, dispatch]);

  // On unmount reset filters so other pages don't keep the category filter
  useEffect(() => {
    return () => {
      dispatch({
        type: Type.FILTER_PRODUCTS,
        payload: { category: '', searchTerm: '' },
      });
    };
  }, [dispatch]);

  if (error) {
    return <div className={classes.error}>Error: {error}</div>;
  }

  return (
    <Layout>
      <section>
        <h1 style={{ padding: '30px' }}>Results</h1>
        <p style={{ padding: '30px' }}>Category / {categoryName}</p>
        <hr />
        {
          loading ? ( <ProductSkeleton />) : (
          <div className={classes.products_container}>
            {
            filteredProducts?.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))
            }
          </div>
          )
        }
      </section>
    </Layout>
  );
});

export default Results;