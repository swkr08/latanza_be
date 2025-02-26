import { Router } from "express";
import { AddStudent, getAllStudents, getStudentByRollNumber, updateStudent, deleteStudent } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Route to add a student with profile picture upload
router.post("/addstudent", upload.single("profilePicture"), AddStudent);
router.get("/allstudents", getAllStudents);
router.get("/student/:rollNumber", getStudentByRollNumber);
router.put("/student/:rollNumber", upload.single("profilePicture"), updateStudent);
router.delete("/student/:rollNumber", deleteStudent);




export default router;
