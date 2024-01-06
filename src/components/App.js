import React, {useState} from 'react'
import '../styles/App.css';
import MainPage from './MainBody/MainPage';
import DisplayContent from './DisplayContent/DisplayContent';
import PlaceOrder from './PlaceOrder/PlaceOrder';
import CheckOut from './Checkout/CheckOut';
import Order from './Order/Order';
import CartContextProvider from './CartContext';
import LogIn from './NavBar/LogIn';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Payment from './PaymentPage/Payment';
import Layout from './Layout';
import Electronics from './Navfooterdata/Electronics';
import Jewelery from './Navfooterdata/Jewelery';
import Mens from './Navfooterdata/Mens';
import Womens from './Navfooterdata/Womens';


const App = () => {
  return (
    <>
    <Router basename='/'>
    <CartContextProvider>
    <Routes> 
       {/* <Route path="/" element={[<Navbar/>, <MainPage />, <Footer/>]}/>
       <Route path="/login" element={<LogIn />}/>
       <Route path='/checkout' element={[<Navbar/>, <CheckOut/>, <Footer/>]}/>
       <Route path='/display' element={[<Navbar/>, <DisplayContent/>, <Footer/>]}/>
       <Route path='/order/:id' element={[<Navbar/>, <PlaceOrder/>, <Footer/>]}/> */}
       <Route path='/' element={<Layout><MainPage/></Layout>}/>
       <Route path='/login' element={<LogIn/>}/>
       <Route path='/checkout' element={<Layout><CheckOut/></Layout>}/>
       <Route path='/display' element={<Layout><DisplayContent/></Layout>}/>
       <Route path='/order' element={<Layout><Order/></Layout>}/>
       <Route path='/order/:id' element={<Layout><PlaceOrder/></Layout>}/>
       <Route path='/payment' element={<Payment/>}/>
       <Route path='/electronics' element={<Layout><Electronics/></Layout>}/>
       <Route path='/jewelery' element={<Layout><Jewelery/></Layout>}/>
       <Route path='/mens' element={<Layout><Mens/></Layout>}/>
       <Route path='/womens' element={<Layout><Womens/></Layout>}/>
    </Routes>
    </CartContextProvider>
    </Router>
    </>
  )
}

export default App;
