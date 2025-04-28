import express from "express";
import { createClass, getAllClass } from "../controllers/classroom.controller.js";
const classRoute = express.Router();

classRoute.post("/create-class", createClass);
classRoute.get('/get-classes',getAllClass);

export default classRoute;