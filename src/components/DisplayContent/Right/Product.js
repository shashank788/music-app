import React from 'react'
import './RightSide.css';
import { Rating, Group } from '@mantine/core';
import getSymbolFromCurrency from 'currency-symbol-map';
const Product = (props) => {
     return (
          <div className="product">
               <div className="product_image">
                    <img src={props.definition.image} height={"280px"} width={"212px"} />
               </div>
               <div className="product_name">
                    {props.definition.title}
               </div>
               <div className="product_rating">
                    <Rating value={props.definition.rating.rate} fractions={2} style={{ fontSize: "20px" }} readOnly />
               </div>
               <div className="product_price">
                    {getSymbolFromCurrency('INR')}{props.definition.price}
               </div>
          </div>
     )
}

export default Product;