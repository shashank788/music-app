import React, { useState, useEffect, useContext } from 'react'
import "./Payment.css";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShippingStep from './ShippingStep';
import PaymentStep from './PaymentStep';
import ReviewStep from './ReviewStep';
import { Link } from 'react-router-dom';
const Payment = () => {
    const [selectedMethod, setSelectedMethod] = useState(() => {
        const gaurav = localStorage.getItem('select');
        if(gaurav){
            return JSON.parse(gaurav);
        }
        return null;
    });
    const [isdisable, setIsdisable] = useState(() => {
        const gaurav = localStorage.getItem('select');
        if(gaurav){
            const garg = JSON.parse(gaurav);
            if(garg !== null){
                return false
            }
            return true
        }
        return true;
    });
    const handlePaymentMethodChange = (e) => {
        setIsdisable(false)
        setSelectedMethod(e.target.value)
    }

    const [activeStep, setActiveStep] = useState(() => {
        const savedActiveStep = localStorage.getItem('activeStep');
        return savedActiveStep ? parseInt(savedActiveStep, 10) : 0;
      });
    const [formData, setFormData] = useState(() => {
        const savedFormData = localStorage.getItem('formData');
        return savedFormData ? JSON.parse(savedFormData) : {
          firstName: '',
          lastName: '',
          streetAddress: '',
          aptSuite: '',
          zipCode: '',
          city: '',
          state: '',
          phoneNumber: '',
        };
      });

    const handleNext = () => {
        setActiveStep((prevStep) => {
          const nextStep = prevStep + 1;
          localStorage.setItem('activeStep', nextStep);
          return nextStep;
        });
      };

    const handleBack = () => {
        setActiveStep((prevStep) => {
          const nextStep = prevStep - 1;
          localStorage.setItem('activeStep', nextStep);
          return nextStep;
        });
      };

    const handleStepContent = (step) => {
        switch (step) {
            case 0:
                return <ShippingStep
                    formData={formData}
                    setFormData={setFormData}
                />;
            case 1:
                return <PaymentStep selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} handlePaymentMethodChange={handlePaymentMethodChange}/>;
            case 2:
                return <ReviewStep formData={formData} setActiveStep={setActiveStep} activeStep={activeStep}/>;
            default:
                return null;
        }
    };

    useEffect(() => {
        localStorage.setItem('activeStep', activeStep);
      }, [activeStep]);

    return (
        <div className='payment_body'>
            <div className='payment_header'>
                <Link to='/'>
                    <div className='payment_header_logo'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png?20220213013322' />
                    </div>
                </Link>
                <div className='payment_header_text'><h1>Checkout</h1></div>
                <div className='payment_header_lock'>
                    <img src='https://m.media-amazon.com/images/G/31/x-locale/checkout/truespc/secured-ssl._CB485936980_.png' />
                </div>
            </div>
            <Stepper activeStep={activeStep}>
                <Step>
                    <StepLabel>Shipping and Gift Options</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment and Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Review and Place Order</StepLabel>
                </Step>
            </Stepper>

            <Typography>{handleStepContent(activeStep)}</Typography>
            <div className='payment_button'>
                <div className='back_button'>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                </div>
                <div className='next_button'>
                    <Button disabled={(isdisable && activeStep !== 0) || activeStep === 2} variant="contained" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Payment;