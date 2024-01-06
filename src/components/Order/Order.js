import React, { useState, useEffect, useContext } from 'react';
import "./Order.css";
import { CartContext } from '../CartContext';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
const Order = () => {
    const cartDetails = JSON.parse(localStorage.getItem('myCart'));
    const formDetails = JSON.parse(localStorage.getItem('formData'));
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-IN', options);
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
        <div className='order_container'>
            <h1>Your Orders</h1>
            {/* <div> */}
                <div className='order_header'>
                    <div className='order_placed'>
                        <span className='order_placed_1'>ORDER PLACED</span>
                        <br></br>
                        <span className='order_placed_2'>{formattedDate}</span>
                    </div>
                    <div className='order_placed'>
                        <span className='order_placed_1'>TOTAL</span>
                        <br></br>
                        <span className='order_placed_2'>{<BiRupee />}{cartValue()}</span>
                    </div>
                    <div className='order_placed'>
                        <span className='order_placed_1'>SHIP TO</span>
                        <br></br>
                        <div className="tooltip">{formDetails.firstName} {formDetails.lastName}<i className='a_icon'></i>
                            <span className="tooltiptext"><div className='delivery_address_list'>
                                <ul>
                                    <li>{formDetails.firstName} {formDetails.lastName}</li>
                                    <li>{formDetails.streetAddress} {formDetails.aptSuite}</li>
                                    <li>{formDetails.city}, {formDetails.state} {formDetails.zipCode}</li>
                                    <li>{formDetails.phoneNumber}</li>
                                </ul>
                            </div></span>
                        </div>
                    </div>
                </div>
                <div className='order_product_display'>
                    <h3>Successful</h3>
                    <div className='order_product_pay'>Paid on: {formattedDate}</div>
                    <div className='products_div'>
                        {cartDetails.map((item) => (
                            <div key={item.id} className='delivery_product'>
                                <div className='product_image'>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className='product_detail'>
                                    <Link to={`/order/${item.id}`}>
                                        <h4 className='product_detail_title'>{item.title}</h4>
                                    </Link>
                                    <Link to={`/order/${item.id}`}>
                                        <button className='view_button'>View your item</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}

export default Order;