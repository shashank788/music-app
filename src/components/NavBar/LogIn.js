import React, { useState } from 'react';
import "./LogIn.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth, provider } from '../../firebase';
const LogIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const google = e => {
        e.preventDefault();
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                signInWithPopup(auth, provider)
                    .then((userCredential) => {
                        console.log(userCredential)
                        const userName = userCredential.user.displayName;
                        localStorage.setItem('userName', userName);
                        navigate('/')
                        // navigate("/", {
                        //     state: {
                        //         userName,
                        //     },
                        // });
                    })
                    .catch((error) => {
                        console.log("Error", error)
                    });
            })
            .catch((error) => {
                console.log('Error setting persistence', error);
            });
    }

    const SignIn = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // const userName = userCredential.user.displayName;
                navigate('/');
                // navigate("/", {
                //     state: {
                //       userName,
                //     },
                //   });
                console.log("seccess", user)
                // ...
            })
            .catch((error) => {
                console.log("Error", error)
            });

    }
    const register = e => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential)
                    navigate('/')
                const user = userCredential.userName;
                const userId = user.uid;
                console.log("Registration successful for user:", user);
            })
            .catch((error) => {
                console.log("Error", error)
            })
    }

    return (
        <div className='login'>
            <Link to="/">
                <img className='login_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png?20220213013322' />
            </Link>
            <div className='login_container'>
                <h1>Sign-In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' className='text_color' value={email} placeholder='Enter your email' onChange={e => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type='password' className='text_color' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button type='submit' onClick={SignIn} className='login_signinbutton'>Sign In</button>
                </form>
                <p>By signing-in you agree to the Amazon Clone condition of use and sale</p>
                <button onClick={register} className='login_registerbutton'>Create your Amazon account</button>
            </div>
            <h2 className="hr-lines"> Or Sign In With Google </h2>
            <div className='google_image'>
                <img src='https://onymos.com/wp-content/uploads/2020/10/google-signin-button-1024x260.png' onClick={google} />
            </div>
        </div>
    )
}

export default LogIn;