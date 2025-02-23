import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import Student from "../models/student.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.utils.js";

export const AddStudent = asyncHandler(async (req, res, next) => {
  const {
    studentName,
    class: studentClass,
    fatherName,
    rollNumber,
    subject1,
    subject2,
    subject3,
    subject4,
    subject5,
    subject6,
    subject7,
    subject8,
    subject9,
    subject10,
    totalAttendance,
    remark,
  } = req.body;

  // Validate required fields
  if (!studentName || !studentClass || !fatherName || !rollNumber) {
    return next(new ApiError(400, "Missing required fields"));
  }

  // Check if roll number already exists
  const existingStudent = await Student.findOne({ rollNumber });
  if (existingStudent) {
    return next(new ApiError(400, "Roll number already exists"));
  }

  // Handle profile picture upload
  let profilePicture = "";
  if (req.file) {
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (!cloudinaryResponse || !cloudinaryResponse.url) {
      return next(new ApiError(500, "Failed to upload profile picture"));
    }
    profilePicture = cloudinaryResponse.url;
  }

  // Create new student
  const newStudent = await Student.create({
    studentName,
    class: studentClass,
    fatherName,
    rollNumber,
    subject1,
    subject2,
    subject3,
    subject4,
    subject5,
    subject6,
    subject7,
    subject8,
    subject9,
    subject10,
    totalAttendance,
    remark,
    profilePicture,
  });

  res.status(201).json(new ApiResponse(201, newStudent, "Student added successfully"));
});

// Get all students
export const getAllStudents = asyncHandler(async (req, res, next) => {
  const students = await Student.find();

  if (!students || students.length === 0) {
    return next(new ApiError(404, "No students found"));
  }

  res.status(200).json(new ApiResponse(200, students, "Students retrieved successfully"));
});

// Get student by roll number
export const getStudentByRollNumber = asyncHandler(async (req, res, next) => {
  const { rollNumber } = req.params;

  // Validate roll number
  if (!rollNumber) {
    return next(new ApiError(400, "Roll number is required"));
  }

  // Find student by roll number
  const student = await Student.findOne({ rollNumber });

  if (!student) {
    return next(new ApiError(404, `No student found with roll number ${rollNumber}`));
  }

  // Compute total marks for the student (filter only subject fields)
  const totalMarksObtained = Object.entries(student.toObject())
    .filter(([key, value]) => key.startsWith("subject") && typeof value === "number")
    .reduce((acc, [, marks]) => acc + marks, 0);

  // Find all students in the same class
  const studentsInClass = await Student.find({ class: student.class });

  // Calculate total marks for each student and sort in descending order
  const rankedStudents = studentsInClass
    .map((s) => ({
      studentId: s._id,
      totalMarks: Object.entries(s.toObject())
        .filter(([key, value]) => key.startsWith("subject") && typeof value === "number")
        .reduce((acc, [, marks]) => acc + marks, 0),
    }))
    .sort((a, b) => b.totalMarks - a.totalMarks); // Sort in descending order

  // Find the rank of the requested student
  const rank = rankedStudents.findIndex((s) => s.studentId.toString() === student._id.toString()) + 1;

  // Include rank in response
  res.status(200).json(new ApiResponse(200, { ...student.toObject(), rank }, "Student retrieved successfully"));
});


// Update student by roll number
export const updateStudent = asyncHandler(async (req, res, next) => {
  const { rollNumber } = req.params;

  // Validate roll number
  if (!rollNumber) {
    return next(new ApiError(400, "Roll number is required"));
  }

  // Check if student exists
  let student = await Student.findOne({ rollNumber });
  if (!student) {
    return next(new ApiError(404, `No student found with roll number ${rollNumber}`));
  }

  // Extract updated fields from request body
  const updatedData = { ...req.body };

  // If profile picture is uploaded, upload it to Cloudinary
  if (req.file) {
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (!cloudinaryResponse || !cloudinaryResponse.url) {
      return next(new ApiError(500, "Failed to upload profile picture"));
    }
    updatedData.profilePicture = cloudinaryResponse.url;
  }

  // Update student record
  student = await Student.findOneAndUpdate({ rollNumber }, updatedData, { new: true });

  res.status(200).json(new ApiResponse(200, student, "Student updated successfully"));
});

// Delete student by roll number
export const deleteStudent = asyncHandler(async (req, res, next) => {
  const rollNumber = Number(req.params.rollNumber); // Ensure rollNumber is a Number

  if (isNaN(rollNumber)) {
    return next(new ApiError(400, "Invalid roll number"));
  }

  // Find and delete student
  const student = await Student.findOneAndDelete({ rollNumber });

  if (!student) {
    return next(new ApiError(404, `No student found with roll number ${rollNumber}`));
  }

  res.status(200).json(new ApiResponse(200, null, `Student with roll number ${rollNumber} deleted successfully`));
});
