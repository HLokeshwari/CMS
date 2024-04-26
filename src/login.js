import React, { useState } from 'react';
import logo from './images/logo.jpg';
import './index.css'
import { callApi, errorResponse, setSession } from './main';
import ReCAPTCHA from "react-google-recaptcha";

const popupwindowstyle = { width: '300px', height: '450px', background: 'white' };
const forgotwindowstyle = { width: '300px', height: '450px', background: 'white' };
const logostyle = { width: '75px', height: '75px', position: 'absolute', left: '115px', top: '10px' };
const logodivstyle = { height: '100px' };
const space = { height: '10px' };

function Login() {
    const onChange=() =>{
        
    };
    const [showLoginPopup, setShowLoginPopup] = useState(true);

    const toggleLoginPopup = () => {
        const forgot = document.getElementById('forgotPassword');
        if (forgot.style.display === 'block') {
            forgot.style.display = 'none';
        }
        setShowLoginPopup(prevState => !prevState);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            validate();
        }
    };

    const validate = () => {
        const T1 = document.getElementById('T1');
        const T2 = document.getElementById('T2');

        const url = 'http://localhost:5000/login/signin';
        const data = JSON.stringify({
            emailid: T1.value,
            pwd: T2.value,
        });
        callApi('POST', url, data, loginSuccess, errorResponse);
    };

    const loginSuccess = (res) => {
        const data = JSON.parse(res);
        if (data === 1) {
            const T1 = document.getElementById('T1');
            setSession('sid', T1.value, 24 * 60);
            window.location.replace('/home');
        } else {
            alert('Invalid Credentials!');
        }
    };

    const Forgotpassword = () => {
        const login = document.getElementById('login');
        const forgot = document.getElementById('forgotPassword');
        login.style.display = 'none';
        forgot.style.display = 'block';
    };

    const resetPassword = () => {
        const forgotEmail = document.getElementById('forgotEmail').value;
        const newPassword = document.getElementById('newPassword').value;

        if (!forgotEmail || !newPassword) {
            alert('Please enter your email and new password.');
            return;
        }

        const url = 'http://localhost:5000/forgot-password';
        const data = JSON.stringify({
            email: forgotEmail,
            newPassword: newPassword,
        });

        callApi('POST', url, data, resetPasswordSuccess, errorResponse);
    };

    const resetPasswordSuccess = (res) => {
        const data = JSON.parse(res);
        alert(data.message);
        if (data.message === 'Password updated successfully.') {
            setForgotPasswordMode(false);
        }
    };

    const setForgotPasswordMode = (mode) => {
        const login = document.getElementById('login');
        const forgot = document.getElementById('forgotPassword');
        login.style.display = mode ? 'none' : 'block';
        forgot.style.display = mode ? 'block' : 'none';
    };

    const handleContactUsClick = () => {
        window.location.replace('/contact');
    };

    return (
        <div className='full-height' onKeyPress={handleKeyPress}>
            <div className='loginheader'>
                <div className="kl-university-loginheader" style={{ float: 'left', marginLeft: '4px', marginTop: '1px' }}>
                    Student Course Management System
                </div>
                <div className='loginheader-links'>
                    <span onClick={toggleLoginPopup}>🔒Login</span>
                    <span onClick={handleContactUsClick}>Contact us</span>
                </div>
            </div>
            <div id='content' className='logincontent'>
                <div id='login' className='popup' style={{ display: showLoginPopup ? 'block' : 'none' }}>
                    <div id='popupwindow' className='popupwindow' style={popupwindowstyle}>
                        <div className='loginstyle1'>Login</div>
                        <div className='loginstyle2'>
                            <div style={logodivstyle}>
                                <img src={logo} alt='' style={logostyle} />
                            </div>
                            <div>Username*</div>
                            <div>
                                <input type='text' id='T1' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div>
                                <input type='password' id='T2' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <ReCAPTCHA sitekey="6LffyscpAAAAAO4qV_Vs96wsrGAYnqQCK78nlF3b"
                             onChange={onChange}/>
                            <div>
                                <button className='btn' onClick={validate}>
                                    Sign In
                                </button>
                            </div>
                            <div>
                                Forgot Password?{' '}
                                <label className='linklabel' onClick={Forgotpassword}>
                                    Reset here
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='forgotPassword' className='forgot' style={{ display: 'none' }}>
                    <div id='forgotPasswordWindow' className='forgotwindow' style={forgotwindowstyle}>
                        <div className='loginstyle1'>Forgot Password</div>
                        <div className='loginstyle2'>
                            <div>Enter your email address:</div>
                            <div>
                                <input type='text' id='forgotEmail' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div>New Password:</div>
                            <div>
                                <input type='password' id='newPassword' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div>
                                <button className='btn' onClick={resetPassword}>
                                    Reset Password
                                </button>
                            </div>
                            <div style={space}></div>
                            <div>
                                <button className='btn' onClick={() => setForgotPasswordMode(false)}>
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='footer' className='loginfooter'>
                Copyright @ Lokeshwari. All rights reserved.
            </div>
        </div>
    );
}

export default Login;
