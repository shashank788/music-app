import React, { useState, useEffect } from 'react';
import "./CheckOut.css";
import { FaRupeeSign } from "react-icons/fa";

const CheckoutItems = (props) => {
    const [quantity, setQuantity] = useState(props.value.quantity);

    useEffect(() => {
        props.updateQuantity(props.index, quantity);
    }, [quantity]);

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0) {
            setQuantity(value);
        }
    };

    const handleBlur = () => {
        if (quantity < 1) {
            setQuantity(1);
        }
    };
    // const totalItemPrice = props.value.price * quantity;
    return (
            <div className='checkoutItem_div'>
                <div className='checkoutItem_div_image'>
                    <img className='checkout_image' src={props.value.image} />
                </div>
                <div className='checkoutItem_div_text'>
                    <div style={{ fontSize: "20px" }} className="textgap">{props.value.title}</div>
                    <div style={{ fontWeight: "bold" }} className="textgap price">
                        <div className='react_icon'><FaRupeeSign /></div>
                        <div>{props.value.price}</div>
                    </div>
                    <div className="textgap">In Stock</div>
                    <div className="quantity-control">
                        <button onClick={handleDecrement} className='checkOut_button'>-</button>
                        <div className='checkOut_input'>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                onBlur={handleBlur}
                                style={{border: "none", width: "30px", padding: "6px", marginLeft: "9px"}}
                            />
                        </div>
                        <button onClick={handleIncrement} className='checkOut_button'>+</button>
                    </div>
                    <button onClick={() => props.removeFromCart(props.index)} className='check_item_delete'>Delete</button>
                    {/* <div>{totalItemPrice}</div> */}
                </div>
            </div>
    )
}

export default CheckoutItems;