import React, { useState, useEffect, useContext } from 'react'
import "./Payment.css";
import { PiPlusThin } from 'react-icons/pi';
import { RxCross1 } from 'react-icons/rx';
import { LiaRupeeSignSolid } from 'react-icons/lia'
import Modal from 'react-modal';
import { CartContext } from '../CartContext';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

const PaymentStep = (props) => {
    useEffect(() => {
        const paymentString = JSON.stringify(props.selectedMethod);
        localStorage.setItem('select', paymentString);
    }, [props.selectedMethod]);

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
    const [isCardModalOpen, setIsCardModalOpen] = React.useState(false);
    const [isNetBankingModalOpen, setIsNetBankingModalOpen] = React.useState(false);
    const [isOtherUPIModalOpen, setIsOtherUPIModalOpen] = React.useState(false);
    const [isEMIModalOpen, setIsEMIModalOpen] = React.useState(false);
    const [isCODModalOpen, setIsCODModalOpen] = React.useState(false);
    const [isAlertOpen1, setIsAlertOpen1] = useState(false);
    const [isAlertOpen2, setIsAlertOpen2] = useState(false);
    const [isAlertOpen3, setIsAlertOpen3] = useState(false);
    const [upiId, setUpiId] = React.useState('');
    const [isInputFilled, setIsInputFilled] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCVV] = useState('');
    const [expiry, setExpiry] = useState('');
    const [error, setError] = useState('');
    const [validate, setValidate] = useState(false);
    // const [selectedMethod, setSelectedMethod] = useState();

    const handlePurchase = (e) => {
        e.preventDefault();
        if (!cardNumber || !cvv || !expiry) {
            setError('All fields are required.');
        } else if (!/^\d{16}$/.test(cardNumber)) {
            setError('Invalid card number. It should be 16 digits.');
        } else if (!/^\d{3}$/.test(cvv)) {
            setError('Invalid CVV. It should be 3 digits.');
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            setError('Invalid expiry date. It should be in MM/YY format.');
        } else {
            setError('');
            setValidate(true)
        }
    }
    const handleCloseAlert1 = () => {
        setIsAlertOpen1(false);
    };
    const handleCloseAlert3 = () => {
        setIsAlertOpen3(false);
    };
    const handleInputChange = (event) => {
        const { value } = event.target;
        setUpiId(value);
        setIsInputFilled(value !== '');
    };
    const handleSelected = () => {
        if (isInputFilled && upiId.length > 7 && upiId.includes('@')) {
            setValidate(true)
        } else {
            setIsAlertOpen3(true)
        }
    }
    const handleConfirm = () => {
        setIsAlertOpen2(true);
        closeModals();
    }
    const handleApply = () => {
        setIsAlertOpen1(true)
    }
    const handleCloseAlert2 = () => {
        setIsAlertOpen2(false);
    };
    const openCardModal = () => {
        setIsCardModalOpen(true);
    };

    const openNetBankingModal = () => {
        setIsNetBankingModalOpen(true);
    };

    const openOtherUPIModal = () => {
        setIsOtherUPIModalOpen(true);
    };

    const openEMIModal = () => {
        setIsEMIModalOpen(true);
    };

    const openCODModal = () => {
        setIsCODModalOpen(true);
    };

    const closeModals = () => {
        setIsCardModalOpen(false);
        setIsNetBankingModalOpen(false);
        setIsOtherUPIModalOpen(false);
        setIsEMIModalOpen(false);
        setIsCODModalOpen(false);
    };
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
        // const savedPaymentMethod = JSON.parse(localStorage.getItem('select'));


    return (
        <div className='billing_container'>
            <div className='billing_body'>
                <div className='amazon_balance'>
                    <h4>Your available balance <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>₹0.00</span></h4>
                    <hr
                        style={{
                            background: "#BBBFBF",
                            height: "1px",
                            border: "none",
                            width: "95%",
                            marginTop: "-20px",
                        }}
                    />
                    <div className='amazon_balance_content'>
                        <div>{<PiPlusThin style={{ marginTop: "5px" }} />}</div>
                        <div><input type='text' className='amazon_balance_input' placeholder='Enter Code' /></div>
                        <div><button className='apply_button' onClick={handleApply}>Apply</button></div>
                    </div>
                </div>
                <div className='amazon_card'>
                    <h4>Another payment method</h4>
                    <hr
                        style={{
                            background: "#BBBFBF",
                            height: "1px",
                            border: "none",
                            width: "95%",
                            marginTop: "-20px",
                        }}
                    />
                    <div className='amazon_radio_button'>
                        <div><input type="radio" name="payment" value="Credit or debit card" onClick={openCardModal} checked={JSON.parse(localStorage.getItem('select')) === 'Credit or debit card'}/>
                            <label for="credit" className='radio_text'>Credit or debit card</label>
                            <Modal
                                isOpen={isCardModalOpen}
                                onRequestClose={closeModals}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <div className='credit_modal_header'>
                                    <div><h3>Enter card details</h3></div>
                                    <div><RxCross1 onClick={closeModals} style={{ marginTop: "20px" }} /></div>
                                </div>
                                <div className='credit_modal_detail'>
                                    <form onSubmit={handlePurchase}>
                                        <div className='credit_modal_detail_form'>
                                            <input
                                                type="text"
                                                placeholder="Card Number"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                            />
                                        </div>
                                        <div className='credit_modal_detail_form'>
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                value={cvv}
                                                onChange={(e) => setCVV(e.target.value)}
                                            />
                                        </div>
                                        <div className='credit_modal_detail_form'>
                                            <input
                                                type="text"
                                                placeholder="Expiry (MM/YY)"
                                                value={expiry}
                                                onChange={(e) => setExpiry(e.target.value)}
                                            />
                                        </div>
                                        {error && <p className="credit_modal_detail_error">{error}</p>}
                                        {!validate &&
                                            <button onClick={handlePurchase} className='credit_modal_detail_button'>validate form details</button>
                                        }
                                        {validate && <p className='credit_modal_detail_success'>Profile Matched</p>}
                                    </form>
                                </div>
                                {validate &&
                                    <div className='button_flex_center credit_modal_detail_confirm'><input type="checkbox" value="Credit or debit card" className='use_payment_method credit_modal_detail_checkbox' onClick={handleConfirm} onChange={props.handlePaymentMethodChange} />Confirm</div>
                                }
                            </Modal>
                        </div>
                        <Snackbar open={isAlertOpen1} autoHideDuration={6000} onClose={handleCloseAlert1}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error" onClose={handleCloseAlert1}>
                                    Insufficient Balance!
                                </Alert>
                            </Stack>
                        </Snackbar>
                        <div className='sprite_image'>
                            <span className='sprite_image1'></span>
                            <span className='sprite_image2'></span>
                            <span className='sprite_image3'></span>
                            <span className='sprite_image4'></span>
                            <span className='sprite_image5'></span>
                            <span className='sprite_image6'></span>
                            <span className='sprite_image7'></span>
                        </div>
                        <div className='radio_button_gap'><input type="radio" name="payment" value="Net Banking" onClick={openNetBankingModal} checked={JSON.parse(localStorage.getItem('select')) === 'Net Banking'}/>
                            <label for="credit" className='radio_text'>Net Banking</label>
                            <Modal
                                isOpen={isNetBankingModalOpen}
                                onRequestClose={closeModals}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <div className='otherupi_header'>
                                    <div>
                                        <h3>Please enter your UPI ID</h3>
                                    </div>
                                    <div><RxCross1 onClick={closeModals} style={{ marginTop: "20px" }} /></div>
                                </div>
                                <div className='netbanking_code' style={{ marginBottom: '10px' }}>
                                    <div><input type='text' className='amazon_balance_input' placeholder='gaurav@upi' value={upiId}
                                        onChange={handleInputChange} /></div>
                                    {!validate &&
                                        <div><button className='apply_button' style={{ marginLeft: "10px" }} onClick={handleSelected}>Verify</button></div>
                                    }
                                </div>
                                {/* <div className='button_flex_center'><button className='use_payment_method' onClick={handleSelected}>Use this payment method</button></div> */}
                                {validate &&
                                    <div className='button_flex_center credit_modal_detail_confirm'><input type="checkbox" value="Net Banking" className='use_payment_method credit_modal_detail_checkbox' onClick={handleConfirm} onChange={props.handlePaymentMethodChange} />Confirm</div>
                                }
                            </Modal>
                        </div>
                        <div className='radio_button_gap'><input type="radio" name="payment" value="Other UPI Apps" onClick={openOtherUPIModal} checked={JSON.parse(localStorage.getItem('select')) === 'Other UPI Apps'}/>
                            <label for="credit" className='radio_text'>Other UPI Apps</label>
                            <Modal
                                isOpen={isOtherUPIModalOpen}
                                onRequestClose={closeModals}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <div className='otherupi_header'>
                                    <div>
                                        <h3>Please enter your UPI ID</h3>
                                    </div>
                                    <div><RxCross1 onClick={closeModals} style={{ marginTop: "20px" }} /></div>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <input type='text' className='amazon_balance_input' placeholder='Ex: gaurav@upi' value={upiId}
                                        onChange={handleInputChange} />
                                    {!validate &&
                                        <button className='apply_button' style={{ marginLeft: "10px" }} onClick={handleSelected}>Verify</button>
                                    }
                                </div>
                                {validate &&
                                    <div className='button_flex_center credit_modal_detail_confirm'><input type="checkbox" value="Other UPI Apps" className='use_payment_method credit_modal_detail_checkbox' onClick={handleConfirm} onChange={props.handlePaymentMethodChange} />Confirm</div>
                                }
                            </Modal>
                        </div>
                        <Snackbar open={isAlertOpen2} autoHideDuration={6000} onClose={handleCloseAlert2}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="success" onClose={handleCloseAlert2}>
                                    Method Selected Successfully!
                                </Alert>
                            </Stack>
                        </Snackbar>
                        <Snackbar open={isAlertOpen3} autoHideDuration={6000} onClose={handleCloseAlert3}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error" onClose={handleCloseAlert3}>
                                    Please fill details min 8 char and include @!
                                </Alert>
                            </Stack>
                        </Snackbar>
                        <div className='radio_button_gap'><input type="radio" name="payment" value="EMI" onClick={openEMIModal} checked={JSON.parse(localStorage.getItem('select')) === 'EMI'}/>
                            <label for="credit" className='radio_text'>EMI</label>
                            <Modal
                                isOpen={isEMIModalOpen}
                                onRequestClose={closeModals}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <div className='credit_modal_header'>
                                    <div><h3>Enter card details</h3></div>
                                    <div><RxCross1 onClick={closeModals} style={{ marginTop: "20px" }} /></div>
                                </div>
                                <div className='credit_modal_detail'>
                                    <form onSubmit={handlePurchase}>
                                        <div className='credit_modal_detail_form'>
                                            <input
                                                type="text"
                                                placeholder="Card Number"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                            />
                                        </div>
                                        <div className='credit_modal_detail_form'>
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                value={cvv}
                                                onChange={(e) => setCVV(e.target.value)}
                                            />
                                        </div>
                                        <div className='credit_modal_detail_form'>
                                            <input
                                                type="text"
                                                placeholder="Expiry (MM/YY)"
                                                value={expiry}
                                                onChange={(e) => setExpiry(e.target.value)}
                                            />
                                        </div>
                                        {error && <p className="credit_modal_detail_error">{error}</p>}
                                        {!validate &&
                                            <button onClick={handlePurchase} className='credit_modal_detail_button'>validate form details</button>
                                        }
                                        {validate && <p className='credit_modal_detail_success'>Profile Matched</p>}
                                    </form>
                                </div>
                                {validate &&
                                    <div className='button_flex_center credit_modal_detail_confirm'><input type="checkbox" value="EMI" className='use_payment_method credit_modal_detail_checkbox' onClick={handleConfirm} onChange={props.handlePaymentMethodChange} />Confirm</div>
                                }
                            </Modal>
                        </div>
                        <div className='radio_button_gap'><input type="radio" name="payment" value="Cash/Pay on Delivery" onClick={openCODModal} checked={JSON.parse(localStorage.getItem('select')) === 'Cash/Pay on Delivery'}/>
                            <label for="credit" className='radio_text'>Cash/Pay on Delivery</label>
                            <Modal
                                isOpen={isCODModalOpen}
                                onRequestClose={closeModals}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <div className='otherupi_header'>
                                    <div>
                                        <h3>Cash, UPI and Cards accepted.</h3>
                                    </div>
                                    <div><RxCross1 onClick={closeModals} /></div>
                                </div>
                                <div className='button_flex_center credit_modal_detail_confirm'><input type="checkbox" value="Cash/Pay on Delivery" className='use_payment_method credit_modal_detail_checkbox' onClick={handleConfirm} onChange={props.handlePaymentMethodChange} />Confirm</div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <div className='billing_summary'>
                <div className='button_flex_center'><button className='use_payment_method'>Use this payment method</button></div>
                <div className='billing_paragraph'>
                    <span>Choose a payment method to continue checking out. You will still have a chance to review and edit your order before it is final.</span>
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
export default PaymentStep;