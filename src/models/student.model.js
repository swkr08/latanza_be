import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    class: { type: Number, required: true, min: 1 },
    fatherName: { type: String, required: true },
    rollNumber: { type: Number, required: true, unique: true },
    subject1: { type: Number, required: true, min: 0, max: 100 },
    subject2: { type: Number, required: true, min: 0, max: 100 },
    subject3: { type: Number, required: true, min: 0, max: 100 },
    subject4: { type: Number, required: true, min: 0, max: 100 },
    subject5: { type: Number, required: true, min: 0, max: 100 },
    subject6: { type: Number, required: true, min: 0, max: 100 },
    subject7: { type: Number, required: true, min: 0, max: 100 },
    subject8: { type: Number, required: true, min: 0, max: 100 },
    totalAttendance: { type: Number, required: true, min: 0, max: 100 },
    remark: { type: String },
    profilePicture: { type: String, default: "" }, // Profile picture URL
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);
