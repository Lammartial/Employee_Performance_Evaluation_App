import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useNavigate, Link, useParams} from 'react-router-dom';
import ConfirmDelete from '../components/ConfirmDelete'; // Import the ConfirmDelete component


export const AdminUserDetail = () => {

    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const [userDetail, setUserDetail] = useState([]);
    const [supervisor, setSupervisor] = useState([]);

    // Use useParams to get the user ID from the URL
    const userId  = useParams();  // Javascript object

    const navigate_users = () => {
        navigate('/admin/users');
    }

    const navigate_users_edit = () => {
        navigate(`/admin/users/edit/${userId.userId}`);
    }

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const handleDeleteClick = () => {
      setShowConfirmDelete(true);
    };
  
    const handleCancelDelete = () => {
      setShowConfirmDelete(false);
    };

    const handleConfirmDelete = () => {
        // Perform the delete operation here
        // You can call your delete API or perform any necessary actions
        // Send an HTTP DELETE request to the server
        //   axios
        //     .delete(`http://localhost:5000//${userId}`)
        //     .then((response) => {
        //       // Handle success (e.g., show success message)
        //       console.log('User deleted successfully');
        //     })
        //     .catch((error) => {
        //       // Handle error (e.g., show error message)
        //       console.error('Error deleting user:', error);
        //     });
            
        // After that, close the confirmation box
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

    useEffect(() => {
        // Fetch user details based on userId
        axios.get(`http://localhost:5000/users/${userId.userId}`)
          .then((response) => {
            setUserDetail(response.data);
          })
          .catch((error) => {
            console.error('Error fetching user detail:', error);
          }); 
      }, [userId.userId]);


    const getSupervisor = (supervisorID) => {
        // Fetch user details based on userId
        axios.get(`http://localhost:5000/users/${supervisorID}`)
          .then((response) => {
            setSupervisor(response.data);
          })
          .catch((error) => {
            console.error('Error fetching user detail:', error);
          }); 

        return supervisor.map(supervisorDetail => (supervisorDetail["First Name"] + ' ' + supervisorDetail["Last Name"]));
      };     
      
    return (
        
        <div className="App">
            {/* Add a backdrop that becomes darker when the confirmation box is shown */}
            {showConfirmDelete && <div className="backdrop" />}
            <div> 
            {
                auth?
                <div > 
                    <div className="rectangle" style = {{left: "0px"}}>
                        {/* avatar */}
                        <img
                            src={`http://localhost:5000/avatar/${userId.userId}`}
                            alt="Avatar"
                            style={{position: "absolute", marginTop: "7px", left: "45px", width: "50px", height: "50px", borderRadius: "50%" }}
                            
                        />
                        
                        {userDetail.map(detail => ( 
                            <div style = {{position: "absolute", top: "21px", left: "105px", fontWeight: "bold", fontSize: "17px", color: "white"}}> {detail['First Name']} {detail['Last Name']}</div>

                        ))}

                        <div
                                style={{
                                backgroundColor: "transparent",
                                position: "absolute",
                                border: "none",
                                cursor: "pointer",
                                right: "25px",
                                marginTop: "22px",
                                color: "white",
                                fontSize: "16px"
                                }}
                                onClick={navigate_users_edit}
                                >
                                Edit
                        </div>     
                    </div>

                
                    <svg onClick = {navigate_users} xmlns="http://www.w3.org/2000/svg" style = {{position: "absolute", left: "15px", top: "21px", color: "white"}} width="23" height="23" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>


                    <div className = 'gallery-container' style = {{left: "0px", maxHeight: "85vh"}}> 
                        <div className = 'gallery-container-item' style = {{height: "90vh"}}>

                            <div class="overview" style = {{top: "-40px", left: "-90px", width: "95vw", height: "320px"}}>
                                <div class="overview-column" >
                                    <div class="overview-item" style = {{width: "150px"}}>
                                        <div className = "overview-item-container" style = {{backgroundColor: "white", width: "220px", height: "220px", border: "none"}}> 
                                            <h1 style = {{fontSize: "18px"}}> Profile Image</h1>
                                            {userDetail.map(detail => (
                                                <img
                                                src={`http://localhost:5000/avatar/${detail["User ID"]}`}
                                                alt="Avatar"
                                                style={{marginTop:"8px", width: "150px", height: "150px"}}
                                                />
                                            ))}

                                        </div>
                                                
                                    </div>
                                </div>
                            </div>

                            <h1 style = {{position: "absolute", fontSize: "18px", top: "10px", left: "65vw"}}> Role</h1>
                            {userDetail.map(detail => (
                                <div style = {{position: "absolute", top: "65px", left: "65vw", fontSize: "15px"}}> {detail['User Role']}</div>
                            ))}

                        </div>
                        
                        {userDetail.map(detail => (
                            <h1 style = {{position: "absolute", left: "20px", top: "245px", fontWeight: "bold", color: "black", fontSize: "18px"}}> {detail['User Role']} Details  </h1>
                        ))}
                        <hr className = "separating-line1" style = {{left: "20px", top: "285px", width: "90vw"}}/>     

                        {/* Left-side info fields */}
                        <h1 style = {{position: "absolute", left: "20px", top: "305px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> First Name  </h1>
                        <h1 style = {{position: "absolute", left: "20px", top: "370px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Last Name  </h1>
                        <h1 style = {{position: "absolute", left: "20px", top: "435px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Email  </h1>
                        <h1 style = {{position: "absolute", left: "20px", top: "500px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Password  </h1>
                        
                        {userDetail.map(detail => ( 
                            detail["User Role"] === "Member" && (
                                <h1 style = {{position: "absolute", left: "20px", top: "565px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Assigned Supervisor  </h1>
                            ))
                        )}
                        
                        {/* Right-side info fields */}
                        
                        <h1 style = {{position: "absolute", right: "20px", top: "305px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Phone Number  </h1>
                        <h1 style = {{position: "absolute", right: "72px", top: "370px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Position  </h1>
                        <h1 style = {{position: "absolute", right: "38px", top: "435px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Employment   </h1>
                        <h1 style = {{position: "absolute", right: "84px", top: "455px", fontWeight: "bold", color: "RGBA(39, 67, 125, 1)", fontSize: "15px"}}> Status  </h1>


                        {/* Left side info */}
                        {userDetail.map(detail => ( 
                            <div style = {{position: "absolute", top: "340px", left: "20px", fontSize: "15px", color: "black"}}> {detail['First Name']}</div>

                        ))}

                        {userDetail.map(detail => ( 
                            <div style = {{position: "absolute", top: "405px", left: "20px", fontSize: "15px", color: "black"}}> {detail['Last Name']}</div>

                        ))}

                        {userDetail.map(detail => ( 
                            <div style = {{position: "absolute", top: "470px", left: "20px", fontSize: "15px", color: "black"}}> {detail['Email']}</div>

                        ))}

                        {userDetail.map(detail => ( 
                            <div style = {{position: "absolute", top: "535px", left: "20px", fontSize: "15px", color: "black"}}> {detail['Password']}</div>

                        ))}

                        {userDetail.map(detail => ( 
                            detail["User Role"] === "Member" && (
                                <div style = {{position: "absolute", top: "600px", left: "20px", fontSize: "15px", color: "black"}}> {detail['Supervisor ID'] == null ? "No assigned supervisor" : getSupervisor(detail['Supervisor ID'])}</div>
                                ))
                        )}
                         {/* detail['User ID' === detail['Supervisor ID']] */}

                        {/* Right side info */}


                        {userDetail.map(detail => ( 
                            <div style = {{position: "absolute", top: "340px", right: "50px", fontSize: "15px", color: "black"}}> {detail['Phone Number']}</div>

                        ))}

                        {userDetail.map(detail => ( 
                            <div style = {{position: "absolute", top: "405px", left: "65vw", fontSize: "15px", color: "black"}}> {detail["Position"] !== null ? detail["Position"] : "None"}</div>

                        ))}

                        {userDetail.map(detail => ( 
                            <div style = {{position: "absolute", top: "495px", left: "65vw", fontSize: "15px", color: "black"}}> {detail['Employment Status'] !== null ? detail["Employment Status"] : "None"}</div>

                        ))}

                    </div>
                    <div onClick={handleDeleteClick} style = {{position: "absolute", bottom: "10px", fontSize: "15px", left: "40vw", width: "80px", color: "RGBA(39, 67, 125, 1)"}}> Delete user</div>
                    
                    {/* Show the ConfirmDelete component when needed */}
                    {showConfirmDelete && (
                        <ConfirmDelete onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />
                    )}
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