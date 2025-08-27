// Results.jsx
import React, { useContext, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import ProductCard from '../../Components/Product/ProductCard';
import classes from './results.module.css';
import Loader from '../../Components/Loader/Loader';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';

const Results = memo(() => {
  const { categoryName } = useParams();
  const [{ filteredProducts, loading, error }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (categoryName) {
      dispatch({
        type: Type.FILTER_PRODUCTS,
        payload: { category: categoryName, searchTerm: '' },
      });
    }
  }, [categoryName, dispatch]);

  if (error) {
    return <div className={classes.error}>Error: {error}</div>;
  }

  return (
    <Layout>
      <section>
        <h1 style={{ padding: '30px' }}>Results</h1>
        <p style={{ padding: '30px' }}>Category / {categoryName}</p>
        <hr />
        <div className={classes.products_container}>
          {loading ? (
            <Loader />
          ) : (
            filteredProducts?.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))
          )}
        </div>
      </section>
    </Layout>
  );
});

Results.propTypes = {
  // Add any props if needed in the future
};

export default Results;