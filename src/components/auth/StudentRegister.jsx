import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './StudentRegister.css';
// import { useApp } from '../../context/AppContext';

const StudentRegister = () => {
  const [user, setUser] = useState({
    name: '',
    rollno: '',
    email: '',
    contactNo: '',
    password: '',
    year: '',
    batch: '',
    college: '',
    role: 'student',
    branch: '',
    qualification: '',
    teacherid: ''
  });
  
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
    try {
      const response = await axios.post('http://localhost:5000/api/auth/stuRegister', user, {
        withCredentials: true
      });
      console.log(response.data)
      if (response.data.success) {
        toast.success('Registration successful!');
        localStorage.setItem('user' , JSON.stringify({id : response.data.user._id , role : response.data.user.role}));
        localStorage.setItem('role' , JSON.stringify(response.data.user.role));
        
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Registration</h2>

        <div className="form-grid">
          <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Full Name" required />
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="contactNo" value={user.contactNo} onChange={handleChange} placeholder="Contact Number" required />
          <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />

          {/* Conditional fields for student role */}
          {user.role === 'student' && (
            <>
              <input type="text" name="rollno" value={user.rollno} onChange={handleChange} placeholder="Roll Number" required />

              <input type="text" name="year" value={user.year} onChange={handleChange} placeholder="Year" required />
              <input type="text" name="batch" value={user.batch} onChange={handleChange} placeholder="Batch" required />
              <input type="text" name="branch" value={user.branch} onChange={handleChange} placeholder="Branch" required />
            </>
          )}
          {user.role === 'teacher' && (
            <>
              <input type='text' name='teacherid' value={user.teacherid} onChange={handleChange} placeholder='Fill Your TeacherId' required />
              <input type='text' name='qualification' value={user.qualification} onChange={handleChange} placeholder='Fill Your Qualifications' required />

            </>
          )}

          <select name="role" value={user.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>

          <select name="college" value={user.college} onChange={handleChange} required>
            <option value="">Select College</option>
            <option value="college1">College 1</option>
            <option value="college2">College 2</option>
            <option value="college3">College 3</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default StudentRegister;
