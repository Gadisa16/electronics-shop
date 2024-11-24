import React, {useEffect,useState} from 'react';
import axios from 'axios';
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from '../Loader/Loader';
import { productUrl } from '../../API/endPoints';

function Product() {
    const [products,setProducts]=useState([])
    const [isLoading, setIsLoading]= useState(false);

    useEffect(()=>{
      axios.get(`${productUrl}/products`)
      .then((res)=>{
          // console.log(res)
          setProducts(res.data.products);
          setIsLoading(false)
      })
      .catch((err)=>{
          console.log(err);
          setIsLoading(false)
      })
    },[])


  return (
    <>
    {
      isLoading ? (<Loader/>) :
      ( <section className={classes.products_container}>
        {
            products?.map((singleProduct)=>{
              return  <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id}/>
                  })
        }
        </section>)
    }
    </>
  )
}

export default Product