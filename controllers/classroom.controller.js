import StudentModel from "../models/student.models.js";
import TeacherModel from "../models/teacher.models.js";
import AdminModel from "../models/admin.models.js";
import ClassroomModel from "../models/classroom.models.js";

// check role for the google classroom
export const checkRole = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const student = await StudentModel.findOne({ email });
        if (student) {
            return res.status(200).json({ success: true, role: "student" });
        }

        const teacher = await TeacherModel.findOne({ email });
        if (teacher) {
            return res.status(200).json({ success: true, role: "teacher" });
        }

        return res.status(404).json({ success: false, message: "User not found" });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const createClass = async (req, res) => {
    const { name, subject, code, id } = req.body;
  
    try {
      if (!name || !subject || !code || !id) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      const teacher = await TeacherModel.findById(id);
      if (!teacher) {
        return res.status(404).json({ success: false, message: "Teacher does not exist" });
      }
  
      const isCodeExist = await ClassroomModel.findOne({ code });
      if (isCodeExist) {
        return res.status(409).json({ success: false, message: "Class code already exists" });
      }
  
      const classroom = new ClassroomModel({
        name,
        subject,
        code,
        teacher: teacher._id,
      });
  
      await classroom.save();
  
      teacher.classrooms.push(classroom._id);
      await teacher.save();
  
      return res.status(201).json({ success: true, classroom });
    } catch (error) {
      console.error("Error in createClass:", error);
      return res.status(500).json({ success: false, message: "Server error while creating class" });
    }
  };
  

export const deleteClass = async (req,res) => {
    
}

export const addMember = async (req,res) => {
    
}

export const removeMember = async (req,res) => {
    
}

export const joinClass = async (req,res) => {
  const { email , code } = req.body;
  try {
    if (!email || !code) return res.status(401).json({success: false, message: "Not getting the complete values"});

    const user = await StudentModel.findOne({email: email});
    if (!user) return res.status(404).json({success: false, message: "Error in finding the student"});

    const findTheClass = await ClassroomModel.findOne({code: code});
    if (!findTheClass) return res.status(404).json({success: false, message: "Classroom not found by this code"});

    if (code === findTheClass.code) {
      findTheClass.student.push(user._id);
      return 
    }
  } catch (error) {
    
  }
}

export const getAllClass = async (req,res) => {
    try{
        const classes = await ClassroomModel.find();
        if (!classes) return res.status(404).json({success: false, message: "classroom not found"});
        return res.status(200).json({success: true, class: classes});
    } catch (err) {
        res.status(500).json({success: false, message: "Error in the catch block"})
    }
}
