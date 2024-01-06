import React, { useState, useEffect, useContext } from 'react';
import "./ReviewStep.css";
import { BiRupee } from 'react-icons/bi';
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const ReviewStep = ({ formData, setActiveStep, activeStep }) => {
  const handlePrevious = () => {
    const prevStep = Math.max(activeStep - 1, 0); 
    setActiveStep(prevStep);
    localStorage.setItem('activeStep', prevStep);
  };
  const handlePreviousTwo = () => {
    const prevStep = Math.max(activeStep - 2, 0); 
    setActiveStep(prevStep);
    localStorage.setItem('activeStep', prevStep);
  };
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const popUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      // setIsPaymentSuccess(true); 
      setVisible(!visible);
    }, 5000);
  }
  const scrollToTop = () => {
    setIsLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      // setIsPaymentSuccess(true); 
      setVisible(!visible);
    }, 5000);
  };
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
  const currentDate = new Date();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(currentDate.getDate() + 5);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedFiveDaysLater = fiveDaysLater.toLocaleDateString('en-IN', options);
  const { firstName, lastName, streetAddress, aptSuite, zipCode, city, state, phoneNumber } = formData;
  const paymentDetailMethod = JSON.parse(localStorage.getItem('select'));
  const cartDetails = JSON.parse(localStorage.getItem('myCart'));
  console.log(cartDetails)
  return (
    <>
      <div className={`review_container ${visible ? 'blur_background' : ''}`}>
        <div className='review_big_body'>
          <div className='delivery_address'>
            <div className='purchase_heading'>
              <span>1<span style={{ width: "20px", display: "inline-block" }}></span></span>
              <span>Delivery address</span>
            </div>
            <div className='delivery_address_list'>
              <ul>
                <li>{firstName} {lastName}</li>
                <li>{streetAddress} {aptSuite}</li>
                <li>{city}, {state} {zipCode}</li>
                <li>{phoneNumber}</li>
              </ul>
            </div>
              <div className='delivery_address_change' onClick={handlePreviousTwo}>change</div>
          </div>
          <hr
            style={{
              background: "#BBBFBF",
              height: "1px",
              border: "none",
              width: "100%",
              marginTop: "-10px"
            }}
          />
          <div className='delivery_payment'>
            <div className='purchase_heading'>
              <span>2<span style={{ width: "20px", display: "inline-block" }}></span></span>
              <span>Payment method</span>
            </div>
            <div className='delivery_payment_method'>
              {paymentDetailMethod}
            </div>
              <div className='delivery_payment_change' onClick={handlePrevious}>change</div>
          </div>
          <hr
            style={{
              background: "#BBBFBF",
              height: "1px",
              border: "none",
              width: "100%",
            }}
          />
          <div className='purchase_item'>
            <div className='purchase_heading'>
              <span>3<span style={{ width: "20px", display: "inline-block" }}></span></span>
              <span>Review items and delivery</span>
            </div>
            <div className='review_sprite'>
              <div className='sprite_div'>
                <div className='sprite'></div>
                <div className='sprite_text'><h4>One-time password required at time of delivery</h4></div>
              </div>
              <p>Please ensure someone will be available to receive this delivery.</p>
            </div>
            <div className='delivery_products'>
              <div className='date_heading'>Delivery date: <span className='display_date'>{formattedFiveDaysLater}</span></div>
              <div className='products_div'>
                {cartDetails.map((item) => (
                  <div key={item.id} className='delivery_product'>
                    <div className='product_image'>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className='product_detail'>
                      <h4>{item.title}</h4>
                      <p className='product_detail_price'> {<BiRupee />}{item.price}</p>
                      <p className='product_detail_qty'>Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='placeOrder'>
            <div className='button_flex_center' id='extra_class'><button className='use_payment_method' onClick={scrollToTop}>Place your order</button></div>
            <div className='placeOrder_text'>
              <div className='placeOrder_text_rupee'>Order Total: <div style={{ marginTop: "5px" }}><LiaRupeeSignSolid /></div>{cartValue()}</div>
              <div className='placeOrder_text_div'>By placing your order, you agree to Amazon's privacy notice and conditions of use.</div>
            </div>
          </div>
        </div>
        <div className='billing_summary'>
          <div className='button_flex_center'><button className='use_payment_method' onClick={popUp} >Place your order</button></div>
          <div className='billing_paragraph'>
            <span style={{ color: "#565959" }}>By placing your order, you agree to Amazon's privacy notice and conditions of use.</span>
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
          <div className='review_anchor'>
            <a href='#'>How are delivery costs calculated?</a>
            <a href='#'>Why didn't I qualify for FREE Delivery?</a>
          </div>
        </div>
      </div>
      {paymentDetailMethod === 'Cash/Pay on Delivery' ? (visible && (
        <div className='payment_success_message'>
          <img src="https://www.nicepng.com/png/detail/1-10729_free-vector-green-checkmark-clip-art-green-circle.png" alt="Checkmark" />
          <h2>Order Placed Successful!</h2>
          <p>Thank you for your purchase.</p>
          <Link to='/order'>
            <button>See Orders</button>
          </Link>
        </div>
      )) : (visible && (
        <div className='payment_success_message'>
          <img src="https://www.nicepng.com/png/detail/1-10729_free-vector-green-checkmark-clip-art-green-circle.png" alt="Checkmark" />
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
          <Link to='/order'>
            <button>See Orders</button>
          </Link>
        </div>
      ))}

      {isLoading && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          zIndex: 9999,
        }}>
          <CircularProgress />
        </Box>
        )}
    </>
  )
};
export default ReviewStep; 