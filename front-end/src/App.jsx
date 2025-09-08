import React, { useContext, useEffect } from 'react';
import { DataContext } from './Components/DataProvider/DataProvider.jsx';
import { Type } from './Utility/action.type.js';
import { auth } from './Utility/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import Routing from './Router.jsx';

const App = () => {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      dispatch({
        type: Type.SET_USER,
        user: authUser ?? null,
      });
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <Routing />
    </div>
  );
};

export default App;
