import React from 'react';
import Header from "./Header";
import '../styles/LoginSignup.css'; //imports the css file 
import user_icon from '../assets/login-signup/person.png';
import email_icon from '../assets/login-signup/email.png';
import password_icon from '../assets/login-signup/password.png';
import { useState } from 'react';

const LoginSignup = () => {

    const [action,setAction] = useState("Sign Up");

    return (
        <div className='ls-body'>
            <Header />
            <div className='container'>
                <div className="ls-header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {action==="Login"?<div></div>:<div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Name" />
                    </div>}
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Email ID" />
                    </div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Password" />
                    </div>
                </div>
                {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
                <div className="submit-container">
                    <div className={action==="Login"?"submit gray":"submit"}onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}>Log In</div>
                </div>
            </div> 
        </div>
    )
};

export default LoginSignup