import React, { useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import { SlLocationPin } from 'react-icons/sl';
import { BiCart } from 'react-icons/bi';
import classes from './Header.module.css';
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';
import logo_img from "/logo1.png";
import logo_img_webp from "/logo1.webp";

function Header() {
    const [{ user, basket }, dispatch] = useContext(DataContext);

    // Calculate the total number of items in the basket
    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount;
    }, 0);


    return (
        <section className={classes.fixed}>
        <section>
            <div className={classes.header_container}>
            <div className={classes.logo_container}>
                {/* Logo */}
                <Link to="/" className={classes.main_logo}>
                <picture>
                    <source srcSet={logo_img_webp} type="image/webp"/>
                    <img src={logo_img} alt="website's logo"/>
                </picture>

                </Link>

                <div className={classes.delivery}>
                    {/* Delivery info */}
                    <span>
                        {/* Location icon */}
                        <SlLocationPin />
                    </span>
                    <div>
                        <p>Deliver to</p>
                        <span>Ethiopia</span>
                    </div>
                </div>
            </div>

            <div className={classes.search}>
                {/* Search bar */}
                <select name="" id="">
                    <option value="">All</option>
                    <option value="">Mobile</option>
                    <option value="">Gaming</option>
                    <option value="">TV</option>
                    <option value="">Audio</option>
                    <option value="">Laptop</option>
                    <option value="">Appliances</option>
                </select>
                <input type="text" name="" id="" placeholder="Search product" />
                {/* Search icon */}
                <BsSearch size={38} />
            </div>

            <div className={classes.order_container}>
                {/* Right-side links */}
                <Link to="" className={classes.language}>
                <img
                    src="https://media.istockphoto.com/id/1218025187/photo/flag-of-ethiopia-blowing-in-the-wind.jpg?s=612x612&w=0&k=20&c=RYYJzRkU8xzpgcj247FbwgdqpX8NSIW0E2k5i317Cq4="
                    alt="flag"
                />
                <select name="" id="">
                    <option value="">EN</option>
                    <option value="">AM</option>
                    <option value="">FR</option>
                    <option value="">OR</option>
                </select>
                </Link>

                {/* User account section */}
                <Link to={!user && '/auth'} className={classes.login_logout}>
                <div>
                    {user ? (
                    <>
                        <p>Hello {user?.email?.split('@')[0]}</p>
                        <span onClick={() => auth.signOut()}>Sign Out</span>
                    </>
                    ) : (
                    <>
                        <p>Hello, Sign In</p>
                        <span>Account & Lists</span>
                    </>
                    )}
                </div>
                </Link>

                {/* Orders link */}
                <Link to="/orders" className={classes.return_orders}>
                    <p>Returns</p>
                    <span>& Orders</span>
                </Link>

                {/* Cart link */}
                <Link to="/cart" className={classes.cart}>
                    <BiCart size={35} />
                    <span>{totalItem}</span>
                </Link>
            </div>
            </div>
        </section>
        {/* <LowerHeader /> */}
        </section>
    );
}

export default Header;