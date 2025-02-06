import React from 'react';
import { Carousel } from 'antd';
import SHOE from '../assets/shoe1.avif'
import CLOTHES from '../assets/clothes.avif'
import GROCERY from '../assets/grocery.avif'

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  
};
const CarouselApp = () => (
  <Carousel style={{marginBottom:'30px'}} autoplay>
   
    <div>
    <img  src={SHOE} style={{ width: '100%', height: '500px',objectFit:'cover' }} alt="" />  
    </div>
    <div>
      <img  src={CLOTHES} style={{ width: '100%', height: '500px',objectFit:'cover' }} alt="" />
    </div>
    <div>
      <img  src={GROCERY} style={{ width: '100%', height: '500px',objectFit:'cover' }} alt="" />
    </div>
    
   
  </Carousel>
);
export default CarouselApp;