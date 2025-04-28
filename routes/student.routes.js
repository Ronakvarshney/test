import express from "express";
import { fetchDetails, FetchStudentData } from "../controllers/student.controller.js";

const studentRoutes=express.Router();

studentRoutes.post("/fetchdetails",fetchDetails);
studentRoutes.get("/fetchstudents" , FetchStudentData);
export default studentRoutes;