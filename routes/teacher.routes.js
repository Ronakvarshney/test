import express from 'express'
import { fetchDetails, FetchTeachers } from '../controllers/teacher.controller.js';

const Teacherrouter = express.Router();


Teacherrouter.get("/fetchteachers" , FetchTeachers );
Teacherrouter.post("/Tfetchdetails" , fetchDetails);
export default Teacherrouter ;

