import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import ProfileTab from '../tabs/ProfileTab';
import './Home.css'
import Classroomlist from '../classroom/Classroomlist';
const Home = () => {
  const { tab,  logout, setIsLoggedIn, isLoggedIn } = useApp();
  const [localUser, setLocalUser] = useState(null); // State to store user from localStorage

  useEffect(() => {
    const state = localStorage.getItem('isloggedIn');
    const bool = state === "true";
    setIsLoggedIn(bool);
    console.log(isLoggedIn);

    // Fetch user data from localStorage separately
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setLocalUser(storedUser);
    }
  } , []);

  // Fetch user details from the backend if the user ID exists
  // Removed 'user' as a dependency to avoid unnecessary re-renders

  return (
    <div className='whole-container'>
      <Navbar />

      {isLoggedIn ? (

        <div>
          <div className='homeContainer'>
            <Sidebar />
            {
              (tab == "Profile") && <ProfileTab />

            }
            {(tab == "Classrooms") && <Classroomlist />}
          </div>

          <h2>Welcome, {localUser ? localUser.name : 'Loading...'}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>You are not logged in</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
