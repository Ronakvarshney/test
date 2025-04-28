import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import react-router-dom
import { AppProvider } from "./context/AppContext"
import StudentRegister from './components/auth/StudentRegister'; // Your StudentRegister component
import Home from './components/home/Home';
import { ToastContainer } from 'react-toastify'; // To show toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles
import Login from './components/auth/Login';
import TeacherRegister from './components/auth/TeacherRegoster';
import FetchUsers from './components/fetchstudent/FetchUsers';
import StudentDetails from './components/fetchstudent/StudentDetails';
import FetchTeachers from './components/fetchteachers/FetchTeachers';
import TeacherDetails from './components/fetchteachers/TeacherDetails';
import EventsPage from './components/events/EventPage';
import EventCreation from './components/events/EventCreation';
import EventDetailed from './components/events/EventDetailed';
import NoticeCreation from './components/notices/NoticeCreation';
import Notices from './components/notices/Notices';


const App = () => {
  return (

      <Router>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<StudentRegister />} /> 
            <Route path='/login' element={<Login/>} />
            <Route path='/teacherRegister' element= {<TeacherRegister/>} />
            <Route path='/fetchstudents' element={<FetchUsers/>}/>
            <Route path='/fetchstudents/:studentid' element={<StudentDetails/>}/>
            <Route path='/fetchteachers' element={<FetchTeachers/>}/>
            <Route path='/fetchteachers/:teacherid' element={<TeacherDetails/>}/>
            <Route path='/events' element={<EventsPage/>}/>
            <Route path='/eventscreation' element={<EventCreation/>}/>
            <Route path='/events/:eventid' element={<EventDetailed/>}/>
            <Route path="/createnotice" element={<NoticeCreation/>}/>
            <Route path='/notices' element={<Notices/>}/>
          </Routes>
      </Router>
  );
};

export default App;
