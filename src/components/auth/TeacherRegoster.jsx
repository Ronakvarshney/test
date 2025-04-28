import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useApp } from '../../context/AppContext';

const TeacherRegister = () => {
  const [teacher, setTeacher] = useState({
    name: '',
    teacher_id: '',
    email: '',
    contactno: '',
    password: '',
    qualification: '',
    designation: '',
    college: ''
  });

  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();
  const {user , setUser} = useApp()

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/allColleges');
        setColleges(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load colleges');
      }
    };

    fetchColleges();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(teacher)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/teacherRegister', teacher);
      if (response.status === 201) {
        toast.success('Teacher registered successfully!');
        localStorage.setItem('user',response.data.teacher);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isloggedIn',true);
        setUser(response.data.teacher);
        console.log(user);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register as a Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={teacher.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Teacher ID</label>
          <input
            type="text"
            name="teacher_id"
            value={teacher.teacher_id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={teacher.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contact Number</label>
          <input
            type="text"
            name="contactno"
            value={teacher.contactno}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={teacher.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Qualification</label>
          <input
            type="text"
            name="qualification"
            value={teacher.qualification}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={teacher.designation}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>College</label>
          <select
            name="college"
            value={teacher.college}
            onChange={handleChange}
            required
          >
            <option value="">Select a college</option>
            {colleges.map((college, index) => (
              <option key={index} value={college._id}>
                {college.name} - {college.code} - {college.address}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default TeacherRegister;
