import React from "react";
import logoImage from '../images/logo.png'; 
import welcomeImage from "../images/welcomeImage.jpg";
import {useNavigate} from "react-router-dom";


// Change backgroundColor style of App to RGBA(241, 244, 249, 1)
export const MemberWelcome = () => {
    const navigate = useNavigate()
    const handleGetStartedClick = () => {
        // Navigate to the desired route when the button is clicked
        navigate('/member'); // Replace 'your-desired-route' with the actual route
      };

    return (
        <div className="App" style = {{backgroundColor: "RGBA(241, 244, 249, 1)"}}>
            <div className="welcome-container">
                <img src={logoImage} alt="Logo" className="logo-image" />
                <img src={welcomeImage} alt="Image" className="welcome-image" />
                <h1 className="performance-title">Performance</h1>
                <h1 className="evaluation-title">evaluation</h1>
                <p className="description">
                    <span style={{ lineHeight: "1.5" }}>
                    Welcome to the <b>Performance Evaluation App</b>! Access your evaluation forms, collaborate with your evaluator, and track your progress. Take an active role in your career growth. Get started now!
                    </span>
                </p>
                <button className="get-started-button" onClick = {handleGetStartedClick}>Get started {" "} 
                <svg width="15px" height="15px" style={{ verticalAlign: "text-bottom", marginBottom: "1px"}}
                    viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#ffffff"></path></g></svg> 
                </button>
            </div>
        </div>
    );
}

