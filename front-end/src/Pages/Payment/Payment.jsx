import React, { useState, useEffect, Suspense } from 'react';
import Loader from "../../Components/Loader/Loader";

// Lazy-load PaymentForm (its Stripe hook imports will be code-split)
const PaymentForm = React.lazy(() => import('./PaymentForm'));

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [ElementsModule, setElementsModule] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [stripeJs, stripeReact] = await Promise.all([
          import('@stripe/stripe-js'),
          import('@stripe/react-stripe-js'),
        ]);
        if (!mounted) return;
        const loadStripe = stripeJs.loadStripe;
        const key = import.meta.env.VITE_STRIPE_PK;
        if (!key) console.warn('VITE_STRIPE_PK is not set in .env');
        setStripePromise(loadStripe(key));
        setElementsModule(stripeReact);
      } catch (err) {
        console.error('Failed to load Stripe libs', err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const Elements = ElementsModule?.Elements;

  return (
    <>
      {!Elements || !stripePromise ? (
        <div style={{ minHeight: 200 }}>
          <Loader />
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <Suspense fallback={<Loader />}>
            <PaymentForm />
          </Suspense>
        </Elements>
      )}
    </>
  );
}

export default Payment;