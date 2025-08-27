import React from 'react';
import classes from './Product.module.css';

function ProductSkeleton() {
  return (
    <div className={classes.card_container}>
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
                    key={i}
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
  );
}

export default ProductSkeleton;