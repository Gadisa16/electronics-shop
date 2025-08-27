// import React, { createContext, useReducer } from 'react';

// export const DataContext = createContext()

// export const DataProvider=({children, reducer, initialState})=>{
//     return (
//         <DataContext.Provider value={ useReducer(reducer, initialState) }>
//             {children}
//         </DataContext.Provider>
//     )
// }

// DataProvider.jsx
import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Type } from '../../Utility/action.type';
import { productUrl } from '../../API/endPoints';

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${productUrl}/products`);
      dispatch({ type: Type.SET_PRODUCTS, products: response.data.products });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      dispatch({ type: Type.SET_ERROR, error: 'Failed to load products' });
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
};