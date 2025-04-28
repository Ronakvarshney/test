import express from "express"
import { DeleteNotice, FetchNotices, NoticeCreation } from "../controllers/notice.controller.js";
import { CreateEmail } from "../services/sendEmail.js";

const Noticerouter = express.Router();

Noticerouter.post("/createnotice" , NoticeCreation);
Noticerouter.get("/notices" , FetchNotices);
Noticerouter.post("/deletenotice" , DeleteNotice)
Noticerouter.post("/createemail" , CreateEmail)
export default Noticerouter ;