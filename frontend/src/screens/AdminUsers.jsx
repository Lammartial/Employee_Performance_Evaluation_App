import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar'

export const AdminUsers = () => {
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const [admins, setAdmins] = useState([]);
    const [HRs, setHRs] = useState([]);
    const [members, setMembers] = useState([]);
    
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState(""); // State to store search text

    // Filter the admin items based on the search text
    const filteredAdmins = admins.filter(admin => {
        const fullName = (admin['First Name'] + ' ' + admin['Last Name']).toLowerCase();
        return (
            admin['First Name'].toLowerCase().startsWith(searchText.toLowerCase()) ||
            admin['Last Name'].toLowerCase().startsWith(searchText.toLowerCase()) ||
            fullName.startsWith(searchText.toLowerCase()) ||
            admin['Email'].toLowerCase().startsWith(searchText.toLowerCase()) ||
            searchText.toLowerCase().startsWith('admin')
        )}
    );

    // Filter the HR items based on the search text
    const filteredHRs = HRs.filter(HR => {
        const fullName = (HR['First Name'] + ' ' + HR['Last Name']).toLowerCase();
        return (
            HR['First Name'].toLowerCase().startsWith(searchText.toLowerCase()) ||
            HR['Last Name'].toLowerCase().startsWith(searchText.toLowerCase()) ||
            fullName.startsWith(searchText.toLowerCase()) ||
            HR['Email'].toLowerCase().startsWith(searchText.toLowerCase()) ||
            searchText.toLowerCase().startsWith('hr')
        )}
    );
    
    // Filter the member items based on the search text
    const filteredMembers = members.filter(member => {
        const fullName = (member['First Name'] + ' ' + member['Last Name']).toLowerCase();
        return (
            member['First Name'].toLowerCase().startsWith(searchText.toLowerCase()) ||
            member['Last Name'].toLowerCase().startsWith(searchText.toLowerCase()) ||
            fullName.startsWith(searchText.toLowerCase()) ||
            member['Email'].toLowerCase().startsWith(searchText.toLowerCase()) ||
            member['Position'].toLowerCase().startsWith(searchText.toLowerCase()) ||
            searchText.toLowerCase().startsWith('member')

        )}
    );

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


    useEffect(() => {
        // Make an HTTP GET request to fetch member data from the API
        axios.get('http://localhost:5000/members')
          .then(response => {
            // Set the member data in the component's state
            setMembers(response.data);
          })
          .catch(error => {
            console.error('Error fetching member data:', error);
          });
      }, []);


    useEffect(() => {
        // Make an HTTP GET request to fetch member data from the API
        axios.get('http://localhost:5000/admins')
          .then(response => {
            // Set the member data in the component's state
            setAdmins(response.data);
          })
          .catch(error => {
            console.error('Error fetching admin data:', error);
          });
      }, []);

    useEffect(() => {
        // Make an HTTP GET request to fetch member data from the API
        axios.get('http://localhost:5000/hrs')
          .then(response => {
            // Set the member data in the component's state
            setHRs(response.data);
          })
          .catch(error => {
            console.error('Error fetching HR data:', error);
          });
      }, []);


    // Toggle the search bar visibility
    const toggleSearchBar = () => {
        setSearchVisible(!isSearchVisible);
    };

    // Handle cancel button click
    const handleCancelClick = () => {
        setSearchText(""); // Clear the search text
        setSearchVisible(false); // Hide the search bar
    };

    

    return (
        
        <div className="App">
            
            <div> 
            {
                auth?
                <div> 
                    <AdminNavBar/>

                    <div className="rectangle"/> 
                    <div className = "title-label"> Users </div>


                    <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleSearchBar} style = {{position: "absolute", left: "290px", top: "23px", color: "white"}} width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" style = {{ position: "absolute", left: "330px", top: "20px", color: "white"}} width="23" height="23" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>

                    {isSearchVisible && (
                        <div className="cancel-button">

                            <button
                                style={{
                                backgroundColor: "transparent",
                                position: "absolute",
                                border: "none",
                                cursor: "pointer",
                                marginTop: "10px",
                                color: "white"
                                }}
                                onClick={handleCancelClick}
                                >
                                Cancel
                            </button>   
                        </div>
                        
                    )}  

                    {/* Search Bar */}
                    {isSearchVisible && (
                        <div className="search-bar">

                            <svg xmlns="http://www.w3.org/2000/svg" style = {{position: "absolute", left: "10px", top: "9px", color: "RGBA(0, 18, 107, 1)"}} width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>

                            <input
                                type="text"
                                placeholder="Search"
                                value={searchText} // Bind input value to state
                                onChange={(e) => setSearchText(e.target.value)} // Update state on input change
                                style={{
                                marginTop: "2px",
                                marginLeft: "15px",
                                width: "45vw",
                                borderColor: "transparent",
                                padding: "7px"
                                }}
                            />

                        </div>

                    )}                   

                    <div className = 'gallery-container'> 
                        <div className = 'gallery-container-item'>
                            <h1 style = {{position: "absolute", left: "15px", top: "7px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "20px"}}> Admin  </h1>

                            {/* Users with Admin Role */}
                            <div className = "user-gallery" style = {{position: "absolute", top: "60px", maxHeight: "100px"}}>
                                {filteredAdmins.map(admin => (

                                <Link to={`/admin/users/${admin['User ID']}`} key={admin['User ID']} style={{ textDecoration: 'none', color: 'inherit' }}>

                                    <div className="user-gallery-item" key={admin["User ID"]}>
                                        <img
                                            src={`http://localhost:5000/avatar/${admin["User ID"]}`}
                                            alt="Avatar"
                                            style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                                        />
                                        <div className="user-info">

                                            <div style = {{fontWeight: "bold", fontSize: "16px"}}> {admin['First Name']} {admin['Last Name']}</div>
                                            <div style = {{fontSize: "12px"}}> {admin['Email']}</div>
                                            <div style = {{fontSize: "14px"}}> Admin </div>
                                        </div>

                                    </div>
                                </Link>

                                ))}
                            </div>

                            <h1 style = {{position: "absolute", left: "15px", top: "210px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "20px"}}> HR </h1> 

                            {/* Users with HR Role */}
                            <div className="user-gallery" style = {{position: "absolute", top: "260px", maxHeight: "200px"}}>
                                {filteredHRs.map(HR => (

                                <Link to={`/admin/users/${HR['User ID']}`} key={HR['User ID']} style={{ textDecoration: 'none', color: 'inherit' }}>

                                    <div className="user-gallery-item" key={HR["User ID"]}>

                                        <img
                                            src={`http://localhost:5000/avatar/${HR["User ID"]}`}
                                            alt="Avatar"
                                            style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                                        />
                                        <div className="user-info">

                                            <div style = {{fontWeight: "bold", fontSize: "16px"}}> {HR['First Name']} {HR['Last Name']}</div>
                                            <div style = {{fontSize: "12px"}}> {HR['Email']}</div>
                                            <div style = {{fontSize: "14px"}}> HR</div>
                                        </div>

                                    </div>

                                </Link>
                                ))}
                            </div>

                            <h1 style = {{position: "absolute", left: "15px", top: "500px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "20px"}}> Members </h1> 
                            {/* Users with Member Role */}
                            <div className="user-gallery" style = {{position: "absolute", top: "555px", maxHeight: "290px"}}>
                                {filteredMembers.map(member => (
                                <Link to={`/admin/users/${member['User ID']}`} key={member['User ID']} style={{ textDecoration: 'none', color: 'inherit' }}>

                                    <div className="user-gallery-item" key={member["User ID"]}>

                                        <img
                                            src={`http://localhost:5000/avatar/${member["User ID"]}`}
                                            alt="Avatar"
                                            style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                                        />
                                        <div className="user-info">

                                            <div style = {{fontWeight: "bold", fontSize: "16px"}}> {member['First Name']} {member['Last Name']}</div>
                                            <div style = {{fontSize: "12px"}}> {member['Email']}</div>
                                            <div style = {{fontSize: "14px"}}> {member['Position']}</div>
                                        </div>

                                    </div>
                                </Link>
                                ))}
                            </div>

                        </div>    
                        
                    </div>
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