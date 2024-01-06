import React from 'react';
import './RightSide.css';
import Product from './Product';
import { Link } from 'react-router-dom';

const RightSide = ({ filteredProducts }) => {
  return (
    <div className="RightSide_main">
      {
        filteredProducts.map((item) => (
          <Link to={`/order/` + item.id} key={item.id}>
            <Product definition={item} />
          </Link>
        ))
      }
    </div>
  );
};

export default RightSide;
