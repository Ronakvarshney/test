import StudentModel from "../models/student.models.js";

export const fetchDetails = async (req, res) => {
  const { _id } = req.body;

  try {
    // Finding the student by ID
    const student = await StudentModel.findById(_id); // No need to wrap in an object

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      user: student, // match what frontend expects: res.data.user
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching student details',
    });
  }
};


export const FetchStudentData = async(req , res)=>{
  try{
    const fetch = await StudentModel.find();
    if(!fetch){
      return res.status(409).json({
        success : false ,
        message : "error while fetching"
      })
    };

    return res.status(200).json({
      success : true ,
      message : 'data fetches successfully' ,
      user : fetch
    })

  }
  catch(error){
    return res.status(500).json({
      success : false ,
      message : error.message
    })
  }
}
