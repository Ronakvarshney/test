import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import StudentModel from "../models/student.models.js";
import AdminModel from "../models/admin.models.js";
import TeacherModel from "../models/teacher.models.js";
import CollegeModel from "../models/college.models.js";

const JWT_SECRET = "your_jwt_secret";


export const UserRegister = async (request, response) => {
  const user = request.body;
  const {
    name, email, role, password, branch,
    contactNo, qualification, teacherid, college,
    year, batch, rollno
  } = user;

  if (!name || !email || !role || !password) {
    return response.json({
      success: false,
      message: "Provide all fields"
    });
  }

  let existingUser;
  if (role === "student") {
    existingUser = await StudentModel.findOne({ email });
  } else if (role === "admin") {
    existingUser = await AdminModel.findOne({ email });
  } else if (role === "teacher") {
    existingUser = await TeacherModel.findOne({ email });
  }

  if (existingUser) {
    return response.json({
      success: false,
      message: "User Already Exists, Please Login"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newuser;
  if (role === "student") {
    newuser = await StudentModel.create({
      name, email, rollno, branch, batch, year,
      password: hashedPassword, contactNo, role
    });
  } else if (role === "admin") {
    newuser = await AdminModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      contact: contactNo,
      designation: ""
    });
  } else if (role === "teacher") {
    newuser = await TeacherModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      contactno: contactNo,
      teacher_id: teacherid,
      qualification,

    });
  }





  return response.json({
    success: true,
    message: "Registered successfully",
    user: newuser
  });
};



export const UserLogin = async (request, response) => {
  try {
    const { user } = request.body;
    let existingUser;

    // Search in Student, Teacher, then Admin
    existingUser = await StudentModel.findOne({ email: user.email });
    if (!existingUser) {
      existingUser = await TeacherModel.findOne({ email: user.email });
    }
    if (!existingUser) {
      existingUser = await AdminModel.findOne({ email: user.email });
    }

    if (!existingUser) {
      return response.json({
        success: false,
        message: "User does not exist. Please register.",
      });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(user.password, existingUser.password);
    if (!isPasswordMatch) {
      return response.json({
        success: false,
        message: "Incorrect password.",
      });
    }

    // Create JWT token
    const payload = {
      id: existingUser._id,
      role: existingUser.role,
    };
    const token = jwt.sign(payload, "secret", { expiresIn: "2h" });

    // Set cookie
    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production",
    });

    return response.json({
      success: true,
      message: "User logged in successfully.",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      token,
    });

  } catch (error) {
    console.error(error);
    return response.json({
      success: false,
      message: error.message,
    });
  }
};

export const UserLogout = async (request, response) => {
  try {
    response.clearCookie('token', {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });

    return response.json({
      success: true,
      message: "Logout successfully.."
    })
  }
  catch (error) {
    return response.json({
      success: false,
      message: error.message
    })
  }
}



// Create a new college
export const createCollege = async (req, res) => {
  const { name, code, email, password, contact, address, departments, profilePic } = req.body;

  try {
    // Check if all fields are provided
    if (!name || !code || !email || !password || !contact || !address) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if college with the same code or email already exists
    const existingCollege = await CollegeModel.findOne({ code });
    if (existingCollege) {
      return res.status(409).json({ success: false, message: "College with this code already exists" });
    }

    // Create a new college
    const newCollege = new CollegeModel({
      name,
      code,
      email,
      password,
      contact,
      address,
      departments,
      profilePic
    });

    // Save the college to the database
    await newCollege.save();

    return res.status(201).json({
      success: true,
      message: "College created successfully",
      college: newCollege
    });

  } catch (error) {
    console.error("Error creating college:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all colleges
export const getAllColleges = async (req, res) => {
  try {
    const colleges = await CollegeModel.find();
    console.log(colleges);
    return res.status(200).json({
      success: true,
      data: colleges
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

