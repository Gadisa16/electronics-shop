import React from 'react';
import Header from "../Header/Header";
import PropTypes from 'prop-types';

function Layout({ children }) {
  return (
    <div>
      <Header />
      { children }
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;