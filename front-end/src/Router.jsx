import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";

const Landing = React.lazy(() => import("./Pages/Landing/Landing"));
const Auth = React.lazy(() => import("./Pages/Auth/Auth"));
const Payment = React.lazy(() => import("./Pages/Payment/Payment"));
const Orders = React.lazy(() => import("./Pages/Orders/Orders"));
const Cart = React.lazy(() => import("./Pages/Cart/Cart"));
const Results = React.lazy(() => import("./Pages/Results/Results"));
const ProductDetail = React.lazy(() => import("./Pages/ProductDetail/ProductDetail"));

import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Loader from "./Components/Loader/Loader";

function Routing() {
  return (
    <Router>
      <Suspense fallback = {<Loader />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/payments"}
            >
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must log in to access your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
      </Suspense>
    </Router>
  );
}

export default Routing;