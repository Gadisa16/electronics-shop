import React, { createContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Type } from '../../Utility/action.type';
import { productUrl } from '../../API/endPoints';

export const DataContext = createContext();

const DataProvider = ({ children, reducer, initialState }) => {
  // initializer to hydrate state from localStorage (only basket here)
  const init = (initState) => {
    try {
      const persisted = localStorage.getItem('basket');
      if (persisted) {
        return { ...initState, basket: JSON.parse(persisted) };
      }
    } catch (err) {
      console.warn('Failed to parse persisted basket', err);
    }
    return initState;
  };

  const [state, dispatch] = useReducer(reducer, initialState, init);

  const fetchProducts = useCallback(async () => {
    dispatch({ type: Type.SET_LOADING, loading: true });
    try {
      const response = await axios.get(`${productUrl}/products`);
      dispatch({ type: Type.SET_PRODUCTS, products: response.data.products });
      dispatch({ type: Type.SET_LOADING, loading: false });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      dispatch({ type: Type.SET_ERROR, error: error.message || 'Failed to load products' });
      dispatch({ type: Type.SET_LOADING, loading: false });
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // persist basket whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('basket', JSON.stringify(state.basket || []));
    } catch (err) {
      console.warn('Failed to persist basket', err);
    }
  }, [state.basket]);

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