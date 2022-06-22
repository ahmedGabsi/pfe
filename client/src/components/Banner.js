import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Banner() {
  return (
     <Carousel  autoPlay   showIndicators={false} showThumbs={false} showStatus={false} interval={5000} >
        <div className="">
            <img alt="" className='h-1/2' loading="lazy" src="https://m.media-amazon.com/images/I/61OtAZzHosL._SX3000_.jpg" />
        </div >
        <div >
        <img alt="" className='h-1/2'  loading="lazy" src="https://m.media-amazon.com/images/I/71GXrHXR2BL._SX3000_.jpg" />
        </div>
        <div>
        <img alt="" className='h-1/2'  loading="lazy"  src="https://m.media-amazon.com/images/I/61z5Ng9oFKL._SX3000_.jpg" />
        </div>
        <div >
        <img alt="" className='h-1/2'  loading="lazy"  src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/February/Fuji_TallHero_Toys_ar_AE_2x._CB661271423_.jpg" />
        </div>
        <div>
        <img alt="" className='h-1/2'  loading="lazy"  src="https://m.media-amazon.com/images/I/61HXzYWhgvL._SX3000_.jpg" />
        </div>
        
       

    </Carousel>
  

  )
}

export default Banner