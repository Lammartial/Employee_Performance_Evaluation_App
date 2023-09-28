import SideNav, {Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {useNavigate, useLocation} from 'react-router-dom';
import {useState, useEffect} from "react";
import ActionComponent from './ActionComponent';
import axios from 'axios';

function AdminNavBar() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const [navColor, setNavColor] = useState(""); // Define your hover color
    const [navColor1, setNavColor1] = useState(""); // Define your hover color
    const [navColor2, setNavColor2] = useState(""); // Define your hover color
    const [navColor3, setNavColor3] = useState(""); // Define your hover color

    const [isExpanded, setIsExpanded] = useState(false);
    const [adminLabelColor, setAdminLabelColor] = useState("transparent");
    const [adminNameColor, setAdminNameColor] = useState("transparent");
    const [moreIconColor, setMoreIconColor] = useState("transparent");

    const [lineWidth, setLineWidth] = useState('65%');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')

    const [isActionComponentVisible, setActionComponentVisibility] = useState(false);
    const toggleVisibility = () => {
        setActionComponentVisibility(!isActionComponentVisible);
      };

    const [avatarData, setAvatarData] = useState(null);

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:5000')
        .then(res => {
            if (res.data.Status === 'Success') {
                setName(res.data.name);
                setEmail(res.data.email);
            }
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/avatar", {
            withCredentials: true, // Send cookies
            responseType: 'arraybuffer', // Receive binary data
        })
        .then((response) => {
            const imageBlob = new Blob([response.data], { type: 'image/jpeg' }); // Adjust the type based on your image format
            const imageUrl = URL.createObjectURL(imageBlob);
            setAvatarData(imageUrl);
        })
        .catch((error) => {
            console.error('Error fetching avatar:', error);
        });
    }, []);

    const handleToggleClick = () => {
        setIsExpanded(!isExpanded);
        // Make admin label appear when click on toggle
        if (!isExpanded) {
            setTimeout(() => {
                setAdminNameColor("black");
                setMoreIconColor("black");
                setAdminLabelColor("RGBA(50, 86, 160, 1)");
                setLineWidth("90%")
            }, 50)
            
        } else {
            setTimeout(() => {
                setActionComponentVisibility(false);
                setMoreIconColor("transparent");
                setAdminNameColor("transparent");
                setAdminLabelColor("transparent");
                setLineWidth("65%")
            }, 50)
        }
        return isExpanded;
    };

    return (

        <SideNav

            onSelect = {(selected) => {
                console.log(selected);
                navigate('/admin/' + selected);

            }}
            className = "nav-bar" 
        >   

            <Toggle className = "toggle-icon" onClick={handleToggleClick}/>

            <div className = "admin-label" style = {{color: adminLabelColor}}> ADMIN </div>

            <SideNav.Nav defaultSelected = "" >
                <NavItem eventKey = "" style = {{backgroundColor: location.pathname === "/admin" || location.pathname === "/admin/" ? "white" : navColor}}
                onMouseOver={() => setNavColor("RGBA(176,172,168,15%)")} // Change to your desired hover color
                onMouseLeave={() => setNavColor("")} // Reset to default color
                onMouseDown={() => setNavColor("RGBA(176,172,168,35%)")} // Pressed color
                onMouseUp={() => setNavColor("white")} // Release mouse
                >

                    <NavIcon> 
                        {/* rectangle indicator */}
                        <div
                            className="indicator"
                            style={{
                                backgroundColor: 
                                location.pathname === "/admin" || location.pathname === "/admin/" ? "RGBA(50, 86, 160, 1)" : "transparent"
                            }}
                        ></div>

                        <i className='fa fa-fw fa-home' style = {{fontSize: "1.5em", color: "RGBA(0, 18, 107, 1)"}}> </i> 
                    </NavIcon>
                    <NavText style = {{color: "black", fontWeight: "bold", position: "absolute" ,left: "70px"}}> Dashboard </NavText>
                </NavItem>

                <NavItem eventKey = "calendar" 
                    style = {{backgroundColor: location.pathname === "/admin/calendar" ? "white" : navColor1}} 
                    onMouseOver={() => setNavColor1("RGBA(176,172,168,15%)")} // Change to your desired hover color
                    onMouseLeave={() => setNavColor1("")} // Reset to default color
                    onMouseDown={() => setNavColor1("RGBA(176,172,168,35%)")} // Pressed color
                    onMouseUp={() => setNavColor("white")} // Release mouse
                >

                    <NavIcon> 
                        <div
                            className="indicator"
                            style={{
                                backgroundColor: 
                                location.pathname === "/admin/calendar" ? "RGBA(50, 86, 160, 1)" : "transparent"
                            }}
                        ></div>

                        <i className='fa-regular fa-calendar' style = {{fontSize: "1.5em", color: "RGBA(0, 18, 107, 1)"}}> </i> 
                    </NavIcon>
                    <NavText style = {{color: "black", fontWeight: "bold", position: "absolute" ,left: "70px"}}> Calendar </NavText>
                </NavItem>

                <NavItem eventKey = "evaluations"
                    style = {{backgroundColor: location.pathname === "/admin/evaluations" ? "white" : navColor2}} 
                    onMouseOver={() => setNavColor2("RGBA(176,172,168,15%)")} // Change to your desired hover color
                    onMouseLeave={() => setNavColor2("")} // Reset to default color
                    onMouseDown={() => setNavColor2("RGBA(176,172,168,35%)")} // Pressed color
                    onMouseUp={() => setNavColor2("white")}
                >
                    <NavIcon> 
                        <div
                            className="indicator"
                            style={{
                                backgroundColor: 
                                location.pathname === "/admin/evaluations" ? "RGBA(50, 86, 160, 1)" : "transparent"
                            }}
                        ></div>

                        <i className='fa-regular fa-pen-to-square' style = {{fontSize: "1.5em", color: "RGBA(0, 18, 107, 1)"}}> </i> 
                    </NavIcon>
                    <NavText style = {{color: "black", fontWeight: "bold", position: "absolute" ,left: "70px"}}> Evaluations </NavText>
                </NavItem>

                <NavItem eventKey = "users"
                    style = {{backgroundColor: location.pathname === "/admin/users" ? "white" : navColor3}} 
                    onMouseOver={() => setNavColor3("RGBA(176,172,168,15%)")} // Change to your desired hover color
                    onMouseLeave={() => setNavColor3("")} // Reset to default color
                    onMouseDown={() => setNavColor3("RGBA(176,172,168,35%)")} // Pressed color
                    onMouseUp={() => setNavColor3("white")}
                >
                    <NavIcon> 
                        <div
                            className="indicator"
                            style={{
                                backgroundColor: 
                                location.pathname === "/admin/users" ? "RGBA(50, 86, 160, 1)" : "transparent"
                            }}
                        ></div>
                        <i className='fa-regular fa-user' style = {{fontSize: "1.5em", color: "RGBA(0, 18, 107, 1)"}}> </i> 
                    </NavIcon>
                    <NavText style = {{color: "black", fontWeight: "bold", position: "absolute" ,left: "70px"}}> Users </NavText>
                </NavItem>

                {isActionComponentVisible && <ActionComponent />}

                <hr className = "separating-line" style = {{width: lineWidth}}/>
                <div className = "name-label" style = {{color: adminNameColor}}> {name} </div>
                <div className = "email-label" style = {{color: adminLabelColor}}> {email} </div>
                
                {/* avatar */}
                <div className="avatar">
                    {avatarData ? (
                        <img src={avatarData} alt="Avatar" style = {{width: "48px", height: "48px", borderRadius: "50%"}} />
                    ) : (
                        <p>No avatar available</p>
                    )}
                </div>

                <svg
                    onClick = {toggleVisibility} style = {{position: "absolute", left: "200px", bottom: "55px", color: moreIconColor}} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>

            </SideNav.Nav>
        </SideNav>
    );
}

export default AdminNavBar;

