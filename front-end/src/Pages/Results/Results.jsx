import React, { useEffect, useState, memo, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
const ProductCard = React.lazy(() => import('../../Components/Product/ProductCard'));
import { productUrl } from '../../API/endPoints';
import axios from 'axios';
import classes from './results.module.css';
import ProductSkeleton from '../../Components/Skeleton/ProductSkeleton';

const Results = memo(() => {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/category?type=${categoryName}`).then((res)=>{
      // console.log(res)
      setCategoryProducts(res.data.products)
      setIsLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })}, []);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: '30px' }}>Results</h1>
        <p style={{ padding: '30px' }}>Category / {categoryName}</p>
        <hr />
        {
          isLoading ? ( <ProductSkeleton />) : (
          <Suspense fallback={<ProductSkeleton />}>
            <div className={classes.products_container}>
              {
              categoryProducts?.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderDesc={false}
                  renderAdd={true}
                />
              ))
              }
            </div>
          </Suspense>
          )
        }
      </section>
    </Layout>
  );
});

export default Results;