import React, { useContext, useState, useEffect } from 'react'
import "./CheckOut.css";
import Grid from '@mui/material/Grid';
import { CartContext } from '../CartContext';
import CheckoutItems from './CheckoutItems';
import { Link } from 'react-router-dom';

const CheckOut = () => {
    const { item, increment, removeFromCart, updateQuantity } = useContext(CartContext);

    const [size, setSize] = useState(0);

    useEffect(() => {
        const totalQuantity = item.reduce((total, currentItem) => total + currentItem.quantity, 0);
        setSize(totalQuantity);
    }, [item]);

    const cartValue = function () {
        let price = 0;
        for (let i = 0; i < item.length; i++) {
            price += (item[i].price * item[i].quantity);
        }
        return price.toFixed(2);
    }
    return (
        <div className="checkout_body">
            <Grid container >
                <Grid item={10}>
                    <div className="checkout_container">
                        <div style={{ fontSize: "30px", fontWeight: "500", padding: "20px 0px 0px 20px" }}>Shopping Cart</div>
                        <div>
                            {
                                item.length > 0 ?
                                    item.map((value, index) => (
                                        <CheckoutItems value={value} index={index} removeFromCart={removeFromCart} updateQuantity={updateQuantity}/>
                                    ))
                                    : <div style={{ height: "100vh", margin: "30px" }}> Please buy something</div>
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item={2}>
                    <div className='checkout_total'>
                        <div style={{ fontSize: "24px" }}>Subtotal ({size} items): <strong>{cartValue()}</strong></div>
                        <Link to="/payment">
                            <div style={{ paddingTop: "25px " }}>
                                <button className="placeorder_button">Proceed to Buy</button>
                            </div>
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default CheckOut;