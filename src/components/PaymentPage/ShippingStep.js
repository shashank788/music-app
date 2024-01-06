import React, { useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { CartContext } from '../CartContext';
import Grid from '@mui/material/Grid';
import "./Payment.css";
const ShippingStep = ({ formData, setFormData }) => {
    // Implement form state and validation logic for the shipping step here
    const { firstName, lastName, streetAddress, aptSuite, zipCode, city, state, phoneNumber } = formData;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        console.log(formData)
    };
    useEffect(() => {
        const formDataString = JSON.stringify(formData);
        localStorage.setItem('formData', formDataString);
      }, [formData]);
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
    const totalValue = function () {
        let price = 0;
        for (let i = 0; i < item.length; i++) {
            price += item[i].price * item[i].quantity;
        }
        price += 100;
        return price.toFixed(2);
    };
    return (
        <div className='shipping_container'>
            <div className='shipping_image'><img src='https://img.freepik.com/free-vector/tiny-woman-ordering-parcel-online-via-smartphone-box-internet-client-flat-vector-illustration-delivery-service-digital-technology_74855-8640.jpg?w=740&t=st=1690806330~exp=1690806930~hmac=3a05b93f5040bb26437031fbd9d2228daec7ebde643feb9b9ded2db3b20f31a5'/></div>
            <div className='form_container'>
                <form>
                    <Grid container spacing={2} columns={16} >
                        <Grid item xs={8} >
                            <TextField
                                name="firstName"
                                label="First Name"
                                margin="normal"
                                size="small"
                                value={firstName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="lastName"
                                label="Last Name"
                                margin="normal"
                                size="small"
                                value={lastName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        name="streetAddress"
                        label="Street Address"
                        fullWidth
                        margin="normal"
                        size="small"
                        value={streetAddress}
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <TextField
                        name="aptSuite"
                        label="Apt, Suite, or Other"
                        fullWidth
                        margin="normal"
                        size="small"
                        value={aptSuite}
                        onChange={handleChange}
                    />
                    <br></br>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>
                            <TextField
                                name="zipCode"
                                label="Zip Code"
                                margin="normal"
                                size="small"
                                value={zipCode}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="city"
                                label="City"
                                margin="normal"
                                size="small"
                                value={city}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        select
                        name="state"
                        label="State"
                        margin="normal"
                        size="small"
                        fullWidth
                        value={state}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                        <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                        {/* Add other states here */}
                    </TextField>
                    <br></br>
                    <TextField
                        name="phoneNumber"
                        label="Phone Number"
                        margin="normal"
                        size="small"
                        fullWidth
                        value={phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    <div className='button_flex_center'><button className='use_payment_method'>Use this address</button></div>
                </form>
            </div>
            <div className='billing_summary'>
                <div className='button_flex_center'><button className='use_payment_method'>Use this address</button></div>
                <div className='billing_paragraph'>
                    <span>Choose a shipping address and payment method to calculate shipping, handling and payment tax.</span>
                </div>
                <hr
                    style={{
                        background: "#BBBFBF",
                        height: "1px",
                        border: "none",
                        width: "95%",
                        marginTop: "-20px",
                    }}
                />
                <h3 className='billing_htag'>Order Summary</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Items:</td>
                            <td><LiaRupeeSignSolid />{cartValue()}</td>
                        </tr>
                        <tr>
                            <td>Delivery:</td>
                            <td><LiaRupeeSignSolid />100.00</td>
                        </tr>
                        <tr>
                            <td>Total:</td>
                            <td><LiaRupeeSignSolid />{totalValue()}</td>
                        </tr>
                        <tr>
                            <td>Promotion Applied:</td>
                            <td><LiaRupeeSignSolid />100.00</td>
                        </tr>
                        <tr>
                            <td><hr
                                style={{
                                    background: "#BBBFBF",
                                    height: "1px",
                                    border: "none",
                                    width: "100%",
                                }}
                            /></td>
                            <td><hr
                                style={{
                                    background: "#BBBFBF",
                                    height: "1px",
                                    border: "none",
                                    width: "100%",
                                    marginLeft: "-20px",
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>Order Total:</td>
                            <td><LiaRupeeSignSolid />{cartValue()}</td>
                        </tr>
                        <tr>
                            <td><hr
                                style={{
                                    background: "#BBBFBF",
                                    height: "1px",
                                    border: "none",
                                    width: "100%",
                                }}
                            /></td>
                            <td><hr
                                style={{
                                    background: "#BBBFBF",
                                    height: "1px",
                                    border: "none",
                                    width: "100%",
                                    marginLeft: "-20px",
                                }}
                            /></td>
                        </tr>
                    </tbody>
                </table>
                <div className='billing_anchor'>
                    <a href='#'>How are delivery costs calculated?</a>
                </div>
            </div>
        </div>
    )
};
export default ShippingStep;