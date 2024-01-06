import React, { useState, useEffect } from 'react';
import './DisplayContent.css';
import LeftSide from './Left/LeftSide';
import RightSide from './Right/RightSide';
import axios from 'axios';

const DisplayContent = () => {
  const [listOfProduct, setListOfProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get("https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products")
      .then((response) => {
        setListOfProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts with the fetched data
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, []);

  // Define the onFilterChange function to be passed to LeftSide
  const handleFilterChange = (filterValues) => {
    const filteredItems = listOfProduct.filter((item) => {
      if (filterValues.men && item.category === "men's clothing") return true;
      if (filterValues.jewelery && item.category === "jewelery") return true;
      if (filterValues.electronics && item.category === "electronics") return true;
      if (filterValues.women && item.category === "women's clothing") return true;
      return false;
    });
    console.log(filteredItems)
    setFilteredProducts(filteredItems);
    if (
      !filterValues.men &&
      !filterValues.jewelery &&
      !filterValues.electronics &&
      !filterValues.women
    ) {
      setFilteredProducts(listOfProduct);
    } else {
      setFilteredProducts(filteredItems);
    }
  };

  return (
    <div className='display_content'>
      <div>
        <LeftSide onFilterChange={handleFilterChange} />
      </div>
      <div>
        <RightSide filteredProducts={filteredProducts} />
      </div>
    </div>
  );
};

export default DisplayContent;
