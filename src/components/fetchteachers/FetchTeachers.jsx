import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FetchTeachers.css';
import { useNavigate } from 'react-router-dom';

const FetchTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTeachers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/fetchteachers');
        console.log(res.data)
        setTeachers(res.data.teachers); // ensure your backend sends { teachers: [...] }
      } catch (err) {
        console.error('Error fetching teachers:', err.message);
      }
    };

    fetchAllTeachers();
  }, []);

  return (
    <div className="fetch-teachers-container">
      <h1 className="title">Teachers List</h1>
      <div className="teacher-grid">
        {teachers.map((teacher) => (
          <div
            className="teacher-card"
            key={teacher._id}
            onClick={() => navigate(`/fetchteachers/${teacher._id}`)}
          >
            <h2>{teacher.name}</h2>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Qualification:</strong> {teacher.qualification}</p>
            {/* <p><strong>Experience:</strong> {teacher.experience} years</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchTeachers;
