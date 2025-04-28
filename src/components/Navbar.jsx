import { Link, useNavigate } from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import "./Navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const {isLoggedIn , setIsLoggedIn} = useApp();
  // const [user , setuser] = useState();
  const navigate = useNavigate();

  const LogoutHandler = async()=>{
    try{
       const res = await axios.get("http://localhost:5000/api/auth/userLogout" , {withCredentials : true});
       console.log(res.data);
       if(res.data.success){
        localStorage.removeItem('role');
        localStorage.removeItem('isLoggedIn')
        toast.success(res.data.success);
        navigate("/")
       }
    }catch(error ){
      console.log(error.message);
    }
  }
  // useEffect(() => {
  //   const storeduser = localStorage.getItem("role");
  //   setuser(storeduser);
  // }, [])
  return (
    <div className="navbar">
      <div className="logo-section">
        <GiGraduateCap className="logo-icon" />
        <div className="logo-text">
          <span>Campus</span>
          <span>Connect</span>
        </div>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/college">College</Link>
      </div>
      {
        isLoggedIn ?
          <div className="logout-button">
            <button onClick={LogoutHandler}>
              <FiLogOut style={{ marginRight: "6px" }} />
              Log out
            </button>
          </div> :
          <div className="logout-button">
            <button onClick={()=> navigate('/login') }> 
              <FiLogOut style={{ marginRight: "6px" }} />
              Log In
            </button>
          </div>
      }
     <ToastContainer/>
    </div>
  );
};

export default Navbar;
