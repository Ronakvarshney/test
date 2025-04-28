import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './StudentDetails.css'; // CSS file for styling
import { FaUserCircle } from 'react-icons/fa';

const StudentDetails = () => {
  const { studentid } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/fetchdetails", {_id : studentid});
        console.log(res.data)
        setStudent(res.data.user); // Make sure your backend sends { user: { ... } }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchStudent();
  }, [studentid]);

  if (!student) {
    return <div className="loading">Loading student details...</div>;
  }

  return (
    <div className="student-details-container">
        <FaUserCircle className="avatar-icon" />
      <div className="student-card-details">
        <h2>{student.name}</h2>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.contactNo || 'N/A'}</p>
        <p><strong>RollNo:</strong> {student.rollno || 'N/A'}</p>
        <p><strong>Batch:</strong> {student.batch}</p>
        <p><strong>Year : </strong>{student.year}</p>
      </div>
    </div>
  );
};

export default StudentDetails;
