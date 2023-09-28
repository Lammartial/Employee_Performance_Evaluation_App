import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar'

export const AdminEvaluations = () => {
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

    return (
        
        <div className="App">
            
            <div> 
            {
                auth?

                <div > 
                    <AdminNavBar/>
                    <h1 > Evaluations</h1>
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




