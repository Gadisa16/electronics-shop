import React, { useContext, useEffect } from 'react';
import { DataContext } from './Components/DataProvider/DataProvider.jsx';
import { Type } from './Utility/action.type.js';
import { auth } from './Utility/firebase.js';
import Routing from './Router.jsx';

const App = () => {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Routing />
    </div>
  );
};

export default App;
