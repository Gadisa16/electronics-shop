import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const MotionCard = ({ children, className = '', hoverScale = 1.03, liftShadow = '0 12px 30px rgba(0,0,0,0.12)', style = {} }) => {
    
    const variants = {
        hidden: { opacity: 0, y: 18, scale: 0.995 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
        <motion.div
            className={className}
            style={{ willChange: 'transform, opacity', ...style }}
            initial="hidden"
            whileInView="visible"
            viewport={{ 
                once: false, 
                amount: 0.2,
                margin: "-50px 0px -50px 0px" // <- The key change. Adjust these negative margins
            }}
            variants={variants}
            transition={{ duration: 0.55, ease: [0.22, 0.8, 0.2, 1] }}
            whileHover={{ scale: hoverScale, boxShadow: liftShadow }}
            whileTap={{ scale: 0.98 }}
            onViewportEnter={() => console.log('Entered view!')} // For debugging
            onViewportLeave={() => console.log('Left view!')}   // For debugging
        >
            {children}
        </motion.div>
    );
};

MotionCard.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    hoverScale: PropTypes.number,
    liftShadow: PropTypes.string,
    style: PropTypes.object,
};

export default MotionCard;