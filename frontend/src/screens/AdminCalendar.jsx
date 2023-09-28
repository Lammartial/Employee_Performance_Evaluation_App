import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar'

export const AdminCalendar = () => {
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:5000')
        .then(res => {
            if (res.data.Status === 'Success') {
                setAuth(true);
            } else {
                setAuth(false);
                setMessage(res.data.Message);
            }

        })
    }, [])

    // LOG OUT functionality
    const handleLogOut = () => {
        axios.get('http://localhost:5000/logout')
        .then(res => {
            if (res.data.Status === 'Success'){
                navigate('/login')
            } else {
                alert("error");
            }

        }).catch(err => console.log(err))
    }


    return (
        
        <div className="App">
        
            <div> 
            {
                auth?
                <div> 
                    <AdminNavBar/>
                    <h1 style = {{position: "absolute", left: "80px", top: "70px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "20px"}}> Calendar  </h1>
                    <hr className = "separating-line1"/>                
                    
                    <div className="rectangle"/> 
                </div>
                : 

                <div> 
                    <h3 > {message}</h3>
                    <h3 > Login Now </h3>
                    <Link to = '/login' className = 'btn btn-primary'> Log In</Link>
                </div>

            }
            </div>
        </div>
    );
}
