import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },  // ✅ Ensure profiles are linked properly
  fullName: String,
  phoneNumber: String,
  userType: { type: String, enum: ["Student", "Employee"], default: "Student" },
  collegeName: String,
  branch: String,
  year: String,
  companyName: String,
  designation: String,
  profilePicture: String,
});

export default mongoose.model("Profile", ProfileSchema);
