import mongoose from "mongoose";
const authSchema = new mongoose.Schema({
  auth_token: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const AuthModel = mongoose.model("AuthModel", authSchema);

export default AuthModel;
