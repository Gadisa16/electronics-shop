import React from 'react';
import { FadeLoader } from 'react-spinners';

const Loader = () => {
  const loaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
  };

  return (
    <div style={loaderStyle}>
      <FadeLoader color="#36d7b7" />
    </div>
  );
};

export default Loader;
