import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';

function ProductCard({ product, flex, renderDesc, renderAdd, renderTitle }) {
  const { image, title, id, price, rating, description, brand, color, discount = 0 } = product;
  const [state, dispatch] = useContext(DataContext);
  // console.log(image, title, id, rating, price, description, brand, color, discount);
  // console.log(discount);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, price, description, brand, color, discount },
    });
  };


  return (
    <div className={`${classes.card_container} ${flex ? classes.product_flexed : ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{color || 'No color'}, {brand || 'No brand'}</h3>
        {renderTitle && <h4>{title}</h4>}
        {renderDesc && <div style={{ maxWidth: '750px' }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
          {discount && <small className={classes.discount}>discount: {discount}</small> }
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
}

export default ProductCard;
