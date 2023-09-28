import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar';
import OverviewComponent from '../components/OverviewComponent';

export const AdminHome = () => {
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


    return (
        <div className="App">
            
            <div> 
            {
                auth?

                <div> 
                    <AdminNavBar/>

                    <div className="rectangle"/> 
                    <div className = "title-label"> Dashboard </div>


                    <h1 style = {{position: "absolute", left: "80px", top: "70px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "20px"}}> Home  </h1>
                    <hr className = "separating-line1"/>

                    <OverviewComponent/>


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

