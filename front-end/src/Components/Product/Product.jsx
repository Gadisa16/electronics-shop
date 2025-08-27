import React, { useContext, memo } from 'react';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import Loader from '../Loader/Loader';
import { DataContext } from '../DataProvider/DataProvider';

const Product = memo(() => {
  const [{ filteredProducts, products, error, searchTerm }] = useContext(DataContext);
  let displayProducts = products;

  if (filteredProducts.length > 0){
    displayProducts = filteredProducts;
    const container = document.getElementById('products_id');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
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
      {
      displayProducts?.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          renderAdd={true}
          highlightedTitle={highlightText(product.title, searchTerm)}
        />
      ))
      }
    </section>
  );
});

export default Product;