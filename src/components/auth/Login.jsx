import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';
import axios from 'axios';
import { useApp } from '../../context/AppContext';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { setglobalUser  } = useApp();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storeduser = localStorage.getItem("user");
    const userRole = storeduser ? JSON.parse(storeduser).role : undefined;
    
      console.log(userRole)
      const res = await axios.post("http://localhost:5000/api/auth/userLogin", { user, userRole } , {withCredentials : true});
      console.log(res.data)
      if (res.data.success) {
        localStorage.setItem('isLoggedIn' , JSON.stringify(true));
        localStorage.setItem("user" , JSON.stringify( {
          id : res.data.user.id ,
          role : res.data.user.role
        }))
        setglobalUser(res.data.user);
        localStorage.setItem('role' , userRole );
        console.log(res.data);

        toast.success('Login successful!');
        navigate("/");
      }
  
    else {
      toast.error("Please Register First..")
    }
    if (user.email === '' || user.password === '') {
      toast.error('Please fill in all fields!');
      return;
    }
    // Change the navigation path accordingly
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <img src='/src/assets/People_in_programming_01ung_03.jpg' width={300}/>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>

      <p className="redirect-link">
        Don't have an account? <a href="/register">Register</a>
      </p>
      </div>
    </div>
  );
};

export default Login;
