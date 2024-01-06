import React, { useEffect } from 'react'
import Navbar from './NavBar/Navigation';
import Footer from './Footer/Footer';
import { useNavigate } from 'react-router';
import { auth } from '../firebase';

const Layout = (props) => {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     auth.onAuthStateChanged((user)=> {
    //         if(!user){
    //             navigate('/')
    //         }
    //         console.log(user);
    //     });
    // }, [])
  return (
    <>
    <Navbar/>
    {props.children}
    <Footer />
    </>
  )
}

export default Layout;