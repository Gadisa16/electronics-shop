import React, { useContext, useState, useMemo, useEffect } from 'react';
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
import { Type } from '../../Utility/action.type';
import debounce from 'lodash.debounce';

const CATEGORIES = [
    { value: '', label: 'All' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'TV', label: 'TV' },
    { value: 'Audio', label: 'Audio' },
    { value: 'Laptop', label: 'Laptop' },
    { value: 'Appliances', label: 'Appliances' },
];

function Header() {
    const [{ user, basket }, dispatch] = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    // Calculate the total number of items in the basket
    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount;
    }, 0);

    //handle search and filter
    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     dispatch({
    //         type: Type.FILTER_PRODUCTS,
    //         payload: { searchTerm, category },
    //     });
    // };

    // Debounced search handler
    const debouncedSearch = useMemo(() =>
        debounce((term, cat) => {
            console.log("from debounce", term, cat)
            dispatch({
                type: Type.FILTER_PRODUCTS,
                payload: { searchTerm: term.trim(), category: cat },
            });
        }, 300),
        [dispatch]
    );

    // Handle search input changes
    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        debouncedSearch(newSearchTerm, category);
    };

    // Handle category changes
    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        debouncedSearch(searchTerm, newCategory);
    };

    // Clean up debounce on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);


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
                <select
                value={category}
                onChange={handleCategoryChange}
                aria-label="Select product category"
                >
                {CATEGORIES.map((cat) => (
                    <option className={classes.option_style} key={cat.value} value={cat.value}>
                    {cat.label}
                    </option>
                ))}
                </select>
                <input
                    type="text"
                    placeholder="Search product"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    aria-label="Search products"
                />

                <button style={{ background: "none", border: "none" }}>
                    <BsSearch size={38} />
                </button>
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

Header.propTypes = {
  // props if needed in the future
};

export default Header;