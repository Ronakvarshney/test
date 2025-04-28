import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaUser, FaFlag, FaChalkboardTeacher,
  FaBriefcase, FaComments, FaBookmark,
  FaUsers, FaLayerGroup
} from "react-icons/fa";
import { useApp } from "../context/AppContext";

const Sidebar = () => {
  const { tab, setTab } = useApp();
  const [chatOpen, setChatOpen] = useState(false);

  const handleTabClick = (label) => {
    setTab(label);
    if (label === "Chat") {
      setChatOpen(prev => !prev);
    } else {
      setChatOpen(false);
    }
  };

  return (
    <div className="sidebar-container">
      <div className={`features-tabs ${tab === "Profile" ? "active-tab" : ""}`} onClick={() => handleTabClick("Profile")}>
        <FaUser /> Profile
      </div>
      <div className={`features-tabs ${tab === "My Clubs" ? "active-tab" : ""}`} onClick={() => handleTabClick("My Clubs")}>
        <FaFlag /> My Clubs
      </div>
      <div className={`features-tabs ${tab === "Classrooms" ? "active-tab" : ""}`} onClick={() => handleTabClick("Classrooms")}>
        <FaChalkboardTeacher /> Classrooms
      </div>
      <div className={`features-tabs ${tab === "Placement Cell" ? "active-tab" : ""}`} onClick={() => handleTabClick("Placement Cell")}>
        <FaBriefcase /> Placement Cell
      </div>
      <div className={`features-tabs ${tab === "General Chat" ? "active-tab" : ""}`} onClick={() => handleTabClick("General Chat")}>
        <FaComments /> General Chat
      </div>
      <div className={`features-tabs ${tab === "Resources" ? "active-tab" : ""}`} onClick={() => handleTabClick("Announcements")}>
        <FaBookmark /> Announcements
      </div>
      <div className={`features-tabs ${tab === "Chat" ? "active-tab" : ""}`} onClick={() => handleTabClick("Chat")}>
        <FaUsers /> Chat
      </div>

      {chatOpen && (
        <>
          <div className={`features-tabs ${tab === "Group A" ? "active-tab" : ""}`} onClick={() => handleTabClick("Group A")}>
            <FaLayerGroup /> Group A
          </div>
          <div className={`features-tabs ${tab === "Group B" ? "active-tab" : ""}`} onClick={() => handleTabClick("Group B")}>
            <FaLayerGroup /> Group B
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
