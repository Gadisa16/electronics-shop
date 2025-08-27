import React from 'react';
import classes from './ProductSkeleton.module.css';
import PropTypes from 'prop-types';

function ProductSkeleton({first_container = false}) {
  return (
    <div className={first_container ? classes.products_container : "display_none"}>
    {Array.from({ length: 6 }).map((_, idx) => (
      <div className={classes.card_container} key={`skeleton-${idx*3}`}>
        {/* Image skeleton */}
        <div className={`${classes.skeleton_img}  skeleton`} />

        <div>
          {/* Color and Brand skeleton */}
          <h3>
            <span className={`${classes.skeleton_text} skeleton`} style={{ width: '60px', height: '20px', marginRight: '8px', display: 'inline-block' }} />
            <span className={`${classes.skeleton_text} skeleton`} style={{ width: '60px', height: '20px', display: 'inline-block' }} />
          </h3>
          
          {/* Rating and discount skeleton */}
          <div className={classes.rating}>
              {[...Array(6)].map((_, i) => (
                  <span
                      key={i*3}
                      className={`${classes.skeleton_text} skeleton`}
                      style={{
                          width: i !== 5 ? '10px' : "40px",
                          height: i !== 5 ? '16px' : "8px",
                          marginRight: i !== 4 ? '8px' : "24px",
                          display: 'inline-block'
                      }}
                  />
              ))}
          </div>
          {/* Price skeleton */}
          <div>
              <span className={`${classes.skeleton_text} skeleton`} style={{ width: '40px', height: '16px', display: 'inline-block' }} />
          </div>

        </div>
      </div>
    ))}
    </div>
  );
}

ProductSkeleton.propTypes = {
  first_container: PropTypes.bool,
};

export default ProductSkeleton;