import React, { useContext, useState } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import PropTypes from 'prop-types';

function ProductCard({ product, flex, renderDesc, renderAdd, renderTitle, highlightedTitle }) {
  const { image, title, id, price, rating, description, brand, color, discount = 0 } = product;
  const [state, dispatch] = useContext(DataContext);

  const [imgSrc, setImgSrc] = useState(image);
  const [errorOccurred, setErrorOccurred] = useState(false); // Track if error happened to prevent retry loops

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, price, description, brand, color, discount },
    });
  };

  const handleImageError = () => {
    if (!errorOccurred) {
      setImgSrc('/product_placeholder.avif'); // Fall back to placeholder
      setErrorOccurred(true); // Prevent infinite retries if placeholder also fails (unlikely)
    }
  };

  console.log("imageeeee",image);

  return (
    <div className={`${classes.card_container} ${flex ? classes.product_flexed : ''}`}>
      <Link to={`/products/${id}`}>
      <img
          src={imgSrc}
          alt={title}
          onError={handleImageError}
          loading="lazy"
        />
        {/* <img src={image || "/product_placeholder.webp"} alt={title} /> */}
      </Link>
      <div>
        <h3>{color || 'No color'}, {brand || 'No brand'}</h3>
        {renderTitle && (
          <h4
          dangerouslySetInnerHTML = {
            highlightedTitle ? { __html: highlightedTitle } : undefined
          }>
            { !highlightedTitle && title }
        </h4>)}
        {renderDesc && <div style={{ maxWidth: '750px' }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate || 2.65} precision={0.1} />
          <small>{rating?.count}</small>
          {<small className={classes.discount}>discount: {discount}</small> }
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  flex: PropTypes.bool,
  renderDesc: PropTypes.bool,
  renderAdd: PropTypes.bool,
  renderTitle: PropTypes.bool,
  highlightedTitle: PropTypes.string,
};

export default ProductCard;
