import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from './img/data';
import classes from './CarouselEffect.module.css';

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}>

        {
            img.map((imageItemLink)=>{
              return <img key={imageItemLink} src={imageItemLink} style={{height:"500px"}}/>
            })
        }
      </Carousel>
      {/* background overlay */}
      <div className={classes.hero_image}></div>
    </div>
  )
}

export default CarouselEffect