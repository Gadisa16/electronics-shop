import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import Loader from '../Loader/Loader';
import { DataContext } from '../DataProvider/DataProvider';

const Product = memo(() => {
  const [{ filteredProducts, products, error, loading, searchTerm }] = useContext(DataContext);
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;
  
  console.log("here is products: ", displayProducts);

  // Utility function to highlight matched text
  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  if (error) {
    return <div className={classes.error}>Error: {error}</div>;
  }

  return (
    <section className={classes.products_container} id="products_id">
      {loading ? (
        <Loader />
      ) : (
        displayProducts?.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            renderAdd={true}
            highlightedTitle={highlightText(product.title, searchTerm)}
          />
        ))
      )}
    </section>
  );
});

Product.propTypes = {
  // Add any props if needed in the future
};

export default Product;