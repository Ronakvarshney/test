import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useApp } from '../../context/AppContext';
import './classroom.css';

const Classroomlist = () => {
  const { availableClass, setAvailableClass, student } = useApp(); // Make sure `student` is available in context
  const [openDialogId, setOpenDialogId] = useState(null);
  const [classCode, setClassCode] = useState("");

  useEffect(() => {
    async function fetchClass() {
      try {
        const response = await axios.get(`http://localhost:5000/api/classroom/get-classes`);
        if (!response.data.success) {
          toast.error("Error in fetching classes");
        } else {
          setAvailableClass(response.data.class);
        }
      } catch (error) {
        toast.error("Server error while fetching classes");
        console.error("Fetch error:", error);
      }
    }

    fetchClass();
  }, []);



  return (
    <div className='room-container'>
      {availableClass && availableClass.length > 0 ? (
        availableClass.map((classroom, index) => (
          <div key={index} className='room-box'>
            <p>{classroom.name}</p>
            <p> {classroom.subject}</p>
           {openDialogId ? <></> :  <button onClick={() => setOpenDialogId(classroom._id)}>Join Class</button>}

            {openDialogId === classroom._id && (
              <div className="join-dialog">
                <input
                  type='text'
                  placeholder='Enter the code'
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                />
                <button onClick={() => setOpenDialogId(false)}>Confirm</button>
                <button onClick={() => setOpenDialogId(null)}>Cancel</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No classes available.</p>
      )}
    </div>
  );
};

export default Classroomlist;
