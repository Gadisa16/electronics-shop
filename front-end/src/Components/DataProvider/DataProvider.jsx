import React, { createContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Type } from '../../Utility/action.type';
import { productUrl } from '../../API/endPoints';

export const DataContext = createContext();

const DataProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${productUrl}/products`);
      dispatch({ type: Type.SET_PRODUCTS, products: response.data.products });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      dispatch({ type: Type.SET_ERROR, error: error.message || 'Failed to load products' });
    }
  }, [productUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  {/*
    - The dependency array [state, dispatch] tells React:
    “Only re-run this function and create a new array if state or dispatch changes.”
    - This way, components consuming DataContext won’t re-render unnecessarily
    when the context value remains the same.
*/}
  const value = useMemo(() => [state, dispatch], [state, dispatch]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
};

export default DataProvider;