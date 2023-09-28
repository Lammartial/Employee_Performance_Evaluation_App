import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

export const AdminUserEdit = () => {

    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const { userId } = useParams();
    const [userData, setUserData] = useState([]);


    const navigate_users_data = () => {
        navigate(`/admin/users/${userId}`)

    }

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const handleDeleteClick = () => {
      setShowConfirmDelete(true);
    };
  
    const handleCancelDelete = () => {
      setShowConfirmDelete(false);
    };

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

    // Fetch selected user data
    useEffect(() => {
        // Fetch user datas based on userId
        axios.get(`http://localhost:5000/users/${userId}`)
          .then((response) => {
            setUserData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          }); 
      }, [userId]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Send updated user data to the server (e.g., using axios.put)
        axios
        .put(`http://localhost:5000/users/${userId}`, userData)
        .then((response) => {
            console.log("User updated successfully");
            // You can provide a success message to the user
        })
        .catch((error) => {
            console.error("Error updating user:", error);
            // You can provide an error message to the user
        });
    
  };
   

return (
    
    <div className="App">
        {/* Add a backdrop that becomes darker when the confirmation box is shown */}
        {showConfirmDelete && <div className="backdrop" />}

        <div> 
        {
            auth?
            <div> 
                <div className="rectangle" style = {{left: "0px"}}>

                    <svg onClick = {navigate_users_data} xmlns="http://www.w3.org/2000/svg" style = {{position: "absolute", left: "15px", top: "21px", color: "white"}} width="23" height="23" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>

                    <div style = {{position: "absolute", top: "21px", left: "50px", fontWeight: "bold", fontSize: "17px", color: "white"}}> Edit User</div>            

                </div>

                <h1 style = {{position: "absolute", left: "38vw", top: "70px",  width: "90px", fontWeight: "bold", color: "black", fontSize: "19px"}}> Edit User </h1>
                <div style = {{position: "absolute", left: "5vw", top: "85px", color: "RGBA(39, 67, 125, 1)"}}> Cancel </div>
                <div style = {{position: "absolute", left: "85vw", top: "85px", color: "RGBA(166,166,166,1)"}}> Done </div>

                <hr className = "separating-line1" style = {{left: "15px", top: "110px", width: "92vw"}}/>

                <div className = 'gallery-container' style = {{left: "0px", top: "125px", maxHeight: "85vh"}}> 
                        <div className = 'gallery-container-item' style = {{height: "90vh"}}>

                            <div class="overview" style = {{top: "-40px", left: "-90px", width: "95vw", height: "320px"}}>
                                <div class="overview-column" >
                                    <div class="overview-item" style = {{width: "150px"}}>
                                        <div className = "overview-item-container" style = {{backgroundColor: "white", width: "220px", height: "220px", border: "none"}}> 
                                            <h1 style = {{fontSize: "18px"}}> Profile Image</h1>
                                            {userData.map(data => (
                                                <img
                                                src={`http://localhost:5000/avatar/${data["User ID"]}`}
                                                alt="Avatar"
                                                style={{marginTop:"8px", width: "150px", height: "150px"}}
                                                />
                                            ))}

                                        </div>
                                                
                                    </div>
                                </div>
                            </div>

                            <h1 style = {{position: "absolute", fontSize: "18px", top: "10px", left: "65vw"}}> Role</h1>
                            {userData.map(data => (
                                <div style = {{position: "absolute", top: "65px", left: "65vw", fontSize: "15px"}}> {data['User Role']}
                                
                                </div>
                                           
                            ))}

                            <select
                                className = "role-dropdown"
                                style = {{position: "absolute", top: "50px", width: "90px", left: "60vw"}}
                                name="userRole"
                                value={userData.map(data => (data["User Role"]))}
                                onChange={handleInputChange}
                            >
                                <option value="Admin">Admin</option>
                                <option value="Member">Member</option>
                                <option value="HR">HR</option>
                            </select>

                        </div>
                        
                        {userData.map(data => (
                            <h1 style = {{position: "absolute", left: "20px", top: "245px", fontWeight: "bold", color: "black", fontSize: "18px"}}> {data['User Role']} Details  </h1>
                        ))}
                        <hr className = "separating-line1" style = {{left: "20px", top: "285px", width: "90vw"}}/>     

                        {/* Left-side info fields */}
                        <h1 style = {{position: "absolute", left: "20px", top: "305px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> First Name  </h1>
                        <h1 style = {{position: "absolute", left: "20px", top: "370px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Last Name  </h1>
                        <h1 style = {{position: "absolute", left: "20px", top: "435px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Email  </h1>
                        <h1 style = {{position: "absolute", left: "20px", top: "500px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Password  </h1>
                        
                        {userData.map(data => ( 
                            data["User Role"] === "Member" && (
                                <h1 style = {{position: "absolute", left: "20px", top: "565px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Assigned Supervisor  </h1>
                            ))
                        )}
                        
                        {/* Right-side info fields */}
                        
                        <h1 style = {{position: "absolute", right: "20px", top: "305px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Phone Number  </h1>
                        <h1 style = {{position: "absolute", right: "72px", top: "370px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Position  </h1>
                        <h1 style = {{position: "absolute", right: "38px", top: "435px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Employment   </h1>
                        <h1 style = {{position: "absolute", right: "84px", top: "455px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Status  </h1>


                        {/* Left side info */}
                        {userData.map(data => ( 
                            <div style = {{position: "absolute", top: "340px", left: "20px", fontSize: "15px", color: "black"}}> {data['First Name']}
                                
                            </div>

                        ))}

                        {userData.map(data => ( 
                            <div style = {{position: "absolute", top: "405px", left: "20px", fontSize: "15px", color: "black"}}> {data['Last Name']}</div>

                        ))}

                        {userData.map(data => ( 
                            <div style = {{position: "absolute", top: "470px", left: "20px", fontSize: "15px", color: "black"}}> {data['Email']}</div>

                        ))}

                        {userData.map(data => ( 
                            <div style = {{position: "absolute", top: "535px", left: "20px", fontSize: "15px", color: "black"}}> {data['Password']}</div>

                        ))}

                        {/* Right side info */}


                        {userData.map(data => ( 
                            <div style = {{position: "absolute", top: "340px", right: "50px", fontSize: "15px", color: "black"}}> {data['Phone Number']}</div>

                        ))}

                        {userData.map(data => ( 
                            <div style = {{position: "absolute", top: "405px", left: "65vw", fontSize: "15px", color: "black"}}> {data["Position"] !== null ? data["Position"] : "None"}</div>

                        ))}

                        {userData.map(data => ( 
                            <div style = {{position: "absolute", top: "495px", left: "65vw", fontSize: "15px", color: "black"}}> {data['Employment Status'] !== null ? data["Employment Status"] : "None"}</div>

                        ))}

                    </div>



                <div className="edit-user" style = {{position: "absolute", left: "25vw", bottom: "10px"}}>
                    
                    <form onSubmit={handleSubmit}>
                        <div> 
                            <label>Avatar:</label>
                            <input type="file" id="avatar" name="avatar" accept="image/*" /* Add onChange handler to handle file selection */ />
                        </div>

                        <div>
                            <label>First Name:</label>
                            <input
                            type="text"
                            name="firstName"
                            value={""}
                            onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label>Last Name:</label>
                            <input
                            type="text"
                            name="lastName"
                            value={""}
                            onChange={handleInputChange}
                            />
                        </div>
                        {/* Add input fields for other user properties */}
                        <button type="submit">Save Changes</button>
                    </form>
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