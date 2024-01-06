import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Paper, Rating } from '@mantine/core';
import Grid from '@mui/material/Grid';
import './PlaceOrder.css';
import { CartContext } from '../CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = (props) => {
    const { item, size, increment } = useContext(CartContext);
    const [productDetails, setProductDetails] = useState([]);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    let { id } = useParams();
    const navigate = useNavigate();
    const addTOCart = function () {
        const existingItemIndex = item.findIndex((cartItem) => cartItem.id === productDetails.id);
        if (existingItemIndex !== -1) {
            setIsAddedToCart(true);
        } else {
            setIsAddedToCart(false);
            increment(productDetails);
        }
    };
    const buyNow = function () {
        const isUser = localStorage.getItem('userName');
        if(isUser){
            increment(productDetails);
            navigate('/payment')
        }else{
            navigate('/login');
        }

    }
    useEffect(() => {
        axios.get("https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products")
            .then((response) => {
                let itemfilter = response.data.filter((item) => {
                    if (item.id == id) return item;
                })
                setProductDetails(itemfilter[0]);
            })
            .catch((error) => {
                console.log("showing error", error)
            })
    }, [id]);
    if (!productDetails) {
        return <div>Loading...</div>;
    }
    return (
        <div className='placeorder'>
            <Grid container spacing={2}>
                <Grid xs={12} sm={5}>
                    <img className="placeorder_image" src={productDetails?.image} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    {productDetails && (
                        <div className="placeholder_description">
                            <div style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 500 }}> {productDetails.title} </div>
                            <div>
                                <Rating value={productDetails?.rating?.rate} fractions={2} style={{ fontSize: "20px" }} readOnly />
                                ratings |
                                {productDetails?.rating?.count}+ answered questions
                            </div>
                            <hr></hr>
                            <div>
                                <div className="textgap">Price:	<span className="pricetag">₹ {productDetails.price}</span></div>
                                {/* <div className="textgap">FREE delivery: <strong>{productDetails.description}</strong></div> */}
                                <div className="textgap">EMI starts at ₹ {100}. No Cost EMI available</div>
                                <div style={{ color: "#007600", fontSize: "20px" }} className="textgap">{"In Stock"}</div>
                                <div className="textgap">Sold by <strong>{productDetails.category}</strong> and Fulfilled by Amazon.</div>
                            </div>
                            <div>
                                <br></br>
                                <div style={{ fontSize: "24px" }} className="textgap">About this item</div>
                                <div>
                                    {productDetails.description}
                                </div>
                            </div>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper variant="outlined" className="placeorder_order">
                        <div className='placeorder_flex'>
                                <div><strong>Without Exchange</strong>
                                <div>50,999</div>
                                <div style={{ marginTop: "10px" }}><strong>Add an Accessory</strong></div>
                                <div>
                                    <label><input type="checkbox" ></input>Apple Airpods</label><br></br>
                                    <label><input type="checkbox" ></input>Apple 20W USB Power Adapter</label>
                                </div>
                                </div>
                            <div className='placeorder_mobile'>
                                <button className="placeorder_button addtocart" onClick={addTOCart}>{isAddedToCart ? "Item Added to Cart" : "Add to Cart"}</button>
                                {/* <Link to="/payment"> */}
                                    <button className="placeorder_button buynow" key="buynow" onClick={buyNow}>Buy Now</button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default PlaceOrder;