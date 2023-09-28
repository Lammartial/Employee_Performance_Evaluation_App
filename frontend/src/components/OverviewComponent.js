import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function OverviewComponent() {

    const navigate = useNavigate()

    const navigate_users = () => {
        navigate('/admin/users');
    }

    const navigate_evals = () => {
        navigate('/admin/evaluations');
    }

    const navigate_meetings = () => {
        navigate('/admin/users');
    }

    const [numberOfAdmins, setNumberOfAdmins] = useState(0);
    const [numberOfHRs, setNumberOfHRs] = useState(0);
    const [numberOfMembers, setNumberOfMembers] = useState(0);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        // Make an HTTP GET request to fetch member data from the API
        axios.get('http://localhost:5000/members')
          .then(response => {
            // Set the number of members
            setNumberOfMembers(response.data.length);
        })
          .catch(error => {
            console.error('Error fetching member data:', error);
          });
      }, []);


    useEffect(() => {
        // Make an HTTP GET request to fetch member data from the API
        axios.get('http://localhost:5000/admins')
          .then(response => {
            // Set the number of members
            setNumberOfAdmins(response.data.length);
        })
          .catch(error => {
            console.error('Error fetching admin data:', error);
          });
      }, []);

    useEffect(() => {
        // Make an HTTP GET request to fetch member data from the API
        axios.get('http://localhost:5000/hrs')
          .then(response => {
            // Set the number of members
            setNumberOfHRs(response.data.length);
        })
          .catch(error => {
            console.error('Error fetching HR data:', error);
          });
      }, []);

    return (
        <div className = "overview-component"> 
            <div class="overview">
                <div class="overview-column">
                    <div class="overview-item" >
                        <div className = "overview-item-container" onClick = {navigate_users}> 
                            <h1 className = "number"> {numberOfAdmins} </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" style = {{position: "absolute", top: "32px", left: "35px", width: "32px", height: "32px"}} fill="RGBA(116, 116, 116, 1)" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                            </svg>
                            <p class="overview-label">Total admins</p>
                    
                        </div>
                      
                    </div>

                    <div class="overview-item" >
                        <div className = "overview-item-container" onClick = {navigate_users}> 
                            <h1 className = "number"> {numberOfMembers} </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" style = {{position: "absolute", top: "32px", left: "185px", width: "32px", height: "32px"}} fill="RGBA(116, 116, 116, 1)" class="bi bi-people" viewBox="0 0 16 16">
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                            </svg>

                            <p class="overview-label">Total members</p>

                        </div>
                    </div>

                </div>
            </div>


            <div class="overview" style = {{top: "162px"}}>
                <div class="overview-column">
                    <div class="overview-item">
                        <div className = "overview-item-container" onClick = {navigate_users}> 
                            <h1 className = "number"> {numberOfHRs} </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" style = {{position: "absolute", top: "32px", left: "35px", width: "32px", height: "32px"}} fill="RGBA(116, 116, 116, 1)" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                            </svg>
                            <p class="overview-label">Total HRs</p>
                    
                        </div>
                      
                    </div>

                    <div class="overview-item" >
                        <div className = "overview-item-container" > 
                            <h1 className = "number"> 0 </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" style = {{position: "absolute", top: "32px", left: "185px", width: "32px", height: "32px"}} fill="RGBA(116, 116, 116, 1)" class="bi bi-person-check" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                            </svg>
                            <p class="overview-label">Total assigned supervisors</p>

                        </div>
                    </div>
                                        
                </div>
            </div>


            <div class="overview" style = {{top: "315px"}}>
                <div class="overview-column">
                    <div class="overview-item">
                        <div className = "overview-item-container" onClick = {navigate_meetings}> 
                            <h1 className = "number"> 0 </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" style = {{position: "absolute", top: "32px", left: "35px", width: "32px", height: "32px"}} fill="RGBA(116, 116, 116, 1)" class="bi bi-calendar3" viewBox="0 0 16 16">
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>
                            <p class="overview-label">Total meetings</p>
                    
                        </div>
                      
                    </div>

                    <div class="overview-item" >
                        <div className = "overview-item-container" onClick = {navigate_evals}> 
                            <h1 className = "number"> 0 </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" style = {{position: "absolute", top: "32px", left: "185px", width: "32px", height: "32px"}} fill="RGBA(116, 116, 116, 1)" class="bi bi-journal-code" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"/>
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                            </svg>
                            <p class="overview-label">Total evaluations</p>

                        </div>
                    </div>
                                        
                </div>
            </div>



        </div>
    );
}


export default OverviewComponent;