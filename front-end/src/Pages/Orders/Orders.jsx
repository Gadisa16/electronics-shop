import React, { useContext, useState, useEffect } from 'react';
import Layout from "../../Components/Layout/Layout";
import { db } from '../../Utility/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from './orders.module.css';
import ProductCard from "../../Components/Product/ProductCard.jsx";
import Loader from '../../Components/Loader/Loader.jsx';

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      let unsubscribe = null;

      if (user) {
        const ordersCol = collection(db, 'users', user.uid, 'orders');
        const q = query(ordersCol, orderBy('created', 'desc'));

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            setOrders(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
            setLoading(false);
          },
          (err) => {
            console.error('Orders snapshot error', err);
            setOrders([]);
            setLoading(false);
          }
        );
      } else {
        setOrders([]);
        setLoading(false);
      }

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [user]);

  //onSnapshot method to provide real-time updates
  //snapshot object contains an array of orders

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {loading ? (<Loader />) : (
            orders?.length === 0 ? (
              <div style={{ padding: "20px" }}>You don't have orders yet.</div>
            ) : (
            <div>
              {orders?.map((eachOrder, i) => (
                <div key={i*3}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map(order => (
                    <ProductCard
                      flex={true}
                      product={order}
                      key={order.id}
                    />
                  ))}
                </div>
              ))}
            </div>
            )
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
