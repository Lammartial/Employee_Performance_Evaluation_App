import React, { useState} from "react";
import axios from 'axios';
import loginImage from '../images/login.jpg'; // Update the path to your banner image
import logoImage from '../images/logo.png'; // Update the path to your logo image
import {useNavigate} from "react-router-dom";

export const Login = (props) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        "User Role": "Admin"  // Default role
    });

    // Login error message
    const [errorMessage, setErrorMessage] = useState("Please fill in empty fields."); // State for error message when login
    const [errorColor, setErrorColor] = useState("white"); // State for error message when login

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    // handle login
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!values.email || !values.password) {
            setErrorMessage("Please fill in empty fields.");
            setErrorColor("red");
            setTimeout(() => {
                setErrorColor("white");
            }, 3000); // 3000 milliseconds (3 seconds)
            return; // Exit the function
        }

        axios.post("http://localhost:5000/users", values)
        .then(res => {
            if (res.data.Status === "Success") {
                if (values["User Role"] === "Member") {

                    console.log("Logged in successfully");
                    navigate("/member/welcome"); // Redirect to the Member Welcome page
                } else {
                    navigate("/admin/welcome"); // Redirect to the Admin Welcome page
                }


            } else {
                // alert(res.data.Message)
                setErrorMessage(res.data.Message); // Set error message
                setErrorColor("red");

                setTimeout(() => {
                    setErrorColor("white");
                }, 3000); // 3000 milliseconds (3 seconds)
        
            }

        })
        .catch(err => console.log(err));
    }


    return (
        <div className="App">
            <div className="auth-form-container">
                <img src={logoImage} alt="Logo" className="logo-image" />
                <img src={loginImage} alt="Banner" className="login-image" />
                <div className="welcome-login-text">Welcome!</div>
                <div className="login-to-continue-text"> LOG IN TO CONTINUE </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <input onChange={(e) => setValues({...values, email: e.target.value})}type="email" placeholder="Email" id="email" name="email" />
                        <input onChange={(e) => setValues({...values, password: e.target.value})} type="password" placeholder="Password" id="password" name="password" />
                        
                        {errorMessage && <div className="login-error-message" style={{ color: errorColor }}>{errorMessage}</div>} {/* Render error message */}
                        
                        <div className="login-as-text"> Login As </div>
                        <select className="role-dropdown" onChange={(e) => setValues({...values, "User Role": e.target.value})}>
                            <option value="Admin">Admin</option>
                            <option value="Member">Member</option>
                            <option value="HR">HR</option>
                        </select>

                        <div className="login-button-group">
                    
                            <label className="remember-checkbox">
                                <input type="checkbox"
                                />  Remember Me
                            </label>

                            <button type="submit" className="login-button">
                                Log In 
                            </button>
                        </div>
                    </form>
                        <label > {values.role} </label>
                        
            </div>
        </div>
    )
    
}