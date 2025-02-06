import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  emp_id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password:{
    type: String,
    trim: true,
    required:true
  },
  name: {
    type: String,
    trim: true,
  },
  family_name: {
    type: String,
    trim: true,
  },
  given_name: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  picture: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "author", "admin"],
    default: "user",
  },
});



const UserModel = mongoose.model("User", userSchema);

export default UserModel;
