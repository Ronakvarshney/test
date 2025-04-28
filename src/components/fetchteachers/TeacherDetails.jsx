import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TeacherDetails.css'; // You'll create this CSS file
import { FaUserCircle } from 'react-icons/fa';

const TeacherDetails = () => {
    const { teacherid } = useParams();
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/auth/Tfetchdetails", { _id: teacherid });
                setTeacher(res.data.teacher);
                console.log(res.data.teacher)
            } catch (error) {
                console.error("Error fetching teacher:", error.message);
            }
        };
        fetchTeacher();
    }, [teacherid]);

    if (!teacher) {
        return <div className="loading">Loading teacher details...</div>;
    }

    return (
        <div className="teacher-details-container">
            <FaUserCircle className="avatar-icon" />

            <h2>{teacher.name}</h2>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>TeacherId:</strong> {teacher.teacher_id}</p>
            <p><strong>Phone:</strong> {teacher.contactno || 'N/A'}</p>
            <p><strong>Qualification:</strong> {teacher.qualification || 'N/A'} years</p>
            <p><strong>Address:</strong> {teacher.address || 'N/A'}</p>
            <p><strong>Joined On:</strong> {new Date(teacher.createdAt).toDateString()}</p>

        </div>
    );
};

export default TeacherDetails;
