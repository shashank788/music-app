import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const existingCart = localStorage.getItem('myCart') != undefined ? JSON.parse(localStorage.getItem('myCart')) : [];
  const [item, setItem] = useState(existingCart);
  const [apiData, setApiData] = useState([]);


  const calculateTotalSize = () => {
    return item.reduce((total, currentItem) => total + currentItem.quantity, 0);
  };

  const [size, setSize] = useState(calculateTotalSize());


  useEffect(() => {
    localStorage.setItem('myCart', JSON.stringify(item));
    setSize(item.length);
  }, [item]);

  useEffect(() => {
    const apiUrl = 'https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products'; 
    axios.get(apiUrl)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching API data:', error);
      });
  }, []);


  const increment = (value) => {
    const existingItemIndex = item.findIndex((cartItem) => cartItem.id === value.id);
  
    if (existingItemIndex !== -1) {
      const updatedCart = [...item];
      updatedCart[existingItemIndex].quantity += 1;
      setItem(updatedCart);
    } else {
      setItem([...item, { ...value, quantity: 1 }]);
    }
  };
  

  const removeFromCart = (index) => {
    const updatedCart = [...item];
    updatedCart.splice(index, 1);
    setItem(updatedCart);
  };

  const updateQuantity = (index, quantity) => {
    if (quantity >= 1) {
      const updatedCart = [...item];
      updatedCart[index].quantity = quantity;
      setItem(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ item, size, increment, removeFromCart, updateQuantity, apiData }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;




