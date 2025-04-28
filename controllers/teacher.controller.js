import TeacherModel from "../models/teacher.models.js"


export const FetchTeachers = async(req , res)=>{
    try{
     const fetch = await TeacherModel.find();
     if(!fetch){
        return res.status(409).json({
            success : false ,
            message : "error while fetching data"
        })
     }

     return res.status(201).json({
        success : true ,
        message : "data fetches successfully" ,
        teachers : fetch
     })
    }
    catch(error){
        return res.status(500).json({
            success : false ,
            message : error.message
        })
    }
}


export const fetchDetails = async (req, res) => {
    const { _id } = req.body;
  
    try {
      // Finding the student by ID
      const teacher = await TeacherModel.findById(_id); // No need to wrap in an object
  
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'teacher not found',
        });
      }
  
      res.status(200).json({
        success: true,
        teacher, // match what frontend expects: res.data.user
      });
    } catch (error) {
      console.error("Error fetching teacher details:", error);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching teacher details',
      });
    }
  };
  
  