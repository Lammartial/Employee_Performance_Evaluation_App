import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

export const MemberHome = () => {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:5000')
        .then(res => {
            if (res.data.Status === 'Success') {
                setAuth(true);
                setName(res.data.name);
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
                    <h3 > You are authorized {name}</h3>
                    <button className = 'btn btn-danger' onClick = {handleLogOut}> Log Out</button>
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

