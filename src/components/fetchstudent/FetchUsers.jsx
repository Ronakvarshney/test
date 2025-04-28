import React, { useEffect, useState } from 'react';
import './FetchUsers.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FetchUsers = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  // Mock fetch - replace with actual API call
  useEffect(() => {
     
    const FetchStudents = async()=>{
        try{
          const res = await axios.get("http://localhost:5000/api/auth/fetchstudents");
          console.log(res.data);
          setStudents(res.data.user);
        }
        catch(error){
            console.log(error.message);
        }
    }
    FetchStudents();
    
    // setStudents([
    //   { id: 1, name: 'Ronak Mehta', email: 'ronak@example.com', course: 'MERN Stack' },
    //   { id: 2, name: 'Anjali Sharma', email: 'anjali@example.com', course: 'Data Science' },
    //   { id: 3, name: 'Aman Verma', email: 'aman@example.com', course: 'AI & ML' },
    // ]);
  }, []);

  return (
    <div className="fetch-users-container">
      <h1 className="title">Student's List</h1>
      <div className="student-grid">
        {students?.map((student) => (
          <div className="student-card" key={student._id} onClick={()=> navigate(`/fetchstudents/${student._id}`) }>
            <h2>{student.name}</h2>
            <p><strong>Email:</strong> {student.email}</p>
            {/* <p><strong>Course:</strong> {}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchUsers;
