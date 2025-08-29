import React, { useContext, useState } from 'react';
import classes from './payment.module.css';
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { axiosInstance } from '../../API/axios';
import { ScaleLoader } from "react-spinners";
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import Layout from "../../Components/Layout/Layout";

function PaymentForm() {
    const [{ user, basket }, dispatch] = useContext(DataContext);
    const [cardError, setCardError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0);
    const total = basket.reduce((amount, item) => amount + item.price * item.amount, 0);

    const handleChange = (e) => {
        e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
        setProcessing(true);
        if (!user) throw new Error("User is not authenticated");
        if (!stripe) throw new Error("Stripe is not initialized");

        const response = await axiosInstance({
            method: "POST",
            url: `/payment/create?total=${total * 100}`,
        });
        const clientSecret = response.data?.clientSecret;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
            card: elements.getElement(CardElement),
            },
        });
        
        if (error) {
            setCardError(error.message);
            setProcessing(false);
            return;
        }

        await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
        });

        dispatch({ type: Type.EMPTY_BASKET });
        setProcessing(false);
        navigate("/orders", { state: { msg: "You have placed a new order" } });
        } catch (error) {
        console.error(error);
        setProcessing(false);
        }
    };

    const load_style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
    <Layout>
        <div className={classes.payment_header}>Checkout {totalItem}</div>

        <section className={classes.payment}>
            <div className={classes.flex}>
                <h3>Delivery Address</h3>
                <div>
                <div>{user?.email}</div>
                <div>123 React Lane</div>
                <div>Chicago, IL</div>
                </div>
            </div>
            <hr />

            <div className={classes.flex}>
                <h3>Review items and delivery</h3>
                <div>
                {basket?.map((item) => <ProductCard key={item.id} product={item} flex={true} />)}
                </div>
            </div>
            <hr />

            <div className={classes.flex}>
                <h3>Payment methods</h3>
                <div className={classes.payment_card_container}>
                <div className={classes.payment_details}>
                    <form onSubmit={handlePayment}>
                    {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                    <CardElement onChange={handleChange} />
                    <div className={classes.payment_price}>
                        <div>
                        <span style={{ display: "flex", gap: "10px" }}>
                            <p>Total Order |</p> <CurrencyFormat amount={total} />
                        </span>
                        </div>
                        <button type='submit'>
                        {processing ? (
                            <div className={classes.loading}>
                            <ScaleLoader color="yellow" height={10} style={load_style}/>
                            <p>Please Wait ...</p>
                            </div>
                        ) : "Pay Now"}
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </section>
    </Layout>
    );
}

export default PaymentForm;