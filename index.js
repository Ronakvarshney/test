
import express from 'express'
import cors from "cors"
import authRoutes from './routes/auth.routes.js';
import dbConnect from './lib/dbConnect.js';
import studentRoutes from './routes/student.routes.js';
import Teacherrouter from './routes/teacher.routes.js';
import EventRouter from './routes/event.route.js';
import Noticerouter from './routes/notice.route.js';
const app = express();
dbConnect();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // allows cookies and credentials to be sent
}));

app.use(express.json());

app.use('/api/auth' , authRoutes);
app.use("/api/auth" , studentRoutes);
app.use("/api/auth" , Teacherrouter);
app.use("/api/auth" , EventRouter);
app.use("/api/auth" , Noticerouter);
app.listen(5000 , ()=>{
    console.log("server running ")
})