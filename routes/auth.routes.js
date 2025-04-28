import express from "express"
import { createCollege,getAllColleges , UserLogin, UserLogout, UserRegister  } from "../controllers/auth.controller.js";
const authRoutes = express.Router();

authRoutes.post("/stuRegister",UserRegister);
authRoutes.post("/userLogin" , UserLogin);
authRoutes.get("/userLogout" , UserLogout)
authRoutes.post("/addClg", createCollege)
authRoutes.get("/allColleges",getAllColleges);

export default authRoutes ;