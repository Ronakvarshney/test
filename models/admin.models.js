import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  role : {
    type : String ,
    required : true 
  },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  profilePic: String,
  designation: String
});

const AdminModel = mongoose.model('Admin', AdminSchema);

export default AdminModel;
