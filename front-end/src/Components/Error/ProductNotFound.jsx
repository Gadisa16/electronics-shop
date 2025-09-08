import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductNotFound.module.css';

function ProductNotFound({ error }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorTitle}>Oops! Product Not Found</h1>
        <p className={styles.errorMessage}>
          {error || "We couldn't find the product you're looking for."}
        </p>
      </div>
    </div>
  );
}

ProductNotFound.propTypes = {
  error: PropTypes.string,
};

export default ProductNotFound;