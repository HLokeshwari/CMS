import React, { useState } from 'react';
import logo from './images/logo.jpg';
import './index.css';
import { callApi, errorResponse, setSession } from './main';

const popupwindowstyle = { width: '300px', height: '450px', background: 'white' };
const logostyle = { width: '75px', height: '75px', position: 'absolute', left: '115px', top: '10px' };
const logodivstyle = { height: '100px' };
const space = { height: '10px' };

function Admin() {
    const [showLoginPopup] = useState(true);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            validate();
        }
    };

    const validate = () => {
        const T1 = document.getElementById('T1');
        const T2 = document.getElementById('T2');

        const url = 'http://localhost:5000/admin/signin';
        const data = JSON.stringify({
            adminid: T1.value,
            adminpwd: T2.value,
        });
        callApi('POST', url, data, adminSuccess, errorResponse);
    };

    const adminSuccess = (res) => {
        const data = JSON.parse(res);
        if (data === 1) {
            const T1 = document.getElementById('T1');
            setSession('sid', T1.value, 24 * 60);
            window.location.replace('/adminhome');
        } else {
            alert('Invalid Credentials!');
        }
    };

    return (
        <div className='full-height' onKeyPress={handleKeyPress}>
            <div className='loginheader'>
                <div className="kl-university-loginheader" style={{ float: 'left', marginLeft: '4px', marginTop: '1px' }}>
                    KL University
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
                            <div>
                                <button className='btn' onClick={validate}>
                                    Sign In
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

export default Admin;
