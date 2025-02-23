# Latanza Backend

Latanza Backend is a RESTful API built using **Node.js, Express, and MongoDB** for managing student records. It includes features like adding, updating, deleting, and retrieving student details, along with additional functionalities like pagination, attendance reports.

## 🚀 Features
- Student Registration with Profile Picture Upload (Cloudinary)
- Get All Students with Pagination & Filtering
- Fetch Student Details by Roll Number
- Update Student Information
- Permanent Deletion of Student Records
- Generate Student Report Card

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **File Uploads:** Multer + Cloudinary
- **Logging:** Morgan

---

## 📌 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/latanza-backend.git
cd latanza-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root folder and add:
```env
PORT=9090
MONGODB_URL=mongodb+srv://your_user:your_password@your_cluster.mongodb.net/?retryWrites=true&w=majority
ORIGIN=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4️⃣ Start the Server
```sh
npm start
```
The API will run on `http://localhost:9090`

---

## 📌 API Endpoints
### 1️⃣ Add a Student
**Endpoint:** `POST /api/v1/students/addstudent`
**Description:** Adds a student with profile picture upload.
**Request Type:** `multipart/form-data`
#### **Request Body:**
```json
{
  "studentName": "John Doe",
  "class": 10,
  "fatherName": "Mr. Doe",
  "rollNumber": 101,
  "subject1": 85,
  "subject2": 90,
  "subject3": 78,
  "totalAttendance": 95,
  "remark": "Excellent student"
}
```
#### **Response:**
```json
{
  "statusCode": 201,
  "message": "Student added successfully",
  "data": { ... }
}
```

---

### 2️⃣ Get All Students (With Filters & Pagination)
**Endpoint:** `GET /api/v1/students`
**Query Parameters:**
- `page` (optional) - Pagination page number
- `limit` (optional) - Number of students per page
- `class` (optional) - Filter by class
- `rollNumber` (optional) - Search by roll number
#### **Example Request:**
```sh
GET /api/v1/students?page=1&limit=10&class=10
```
#### **Response:**
```json
{
  "statusCode": 200,
  "message": "Students retrieved successfully",
  "data": { "students": [...], "totalStudents": 50 }
}
```

---

### 3️⃣ Get Student by Roll Number
**Endpoint:** `GET /api/v1/students/student/:rollNumber`
#### **Example Request:**
```sh
GET /api/v1/students/student/101
```
#### **Response:**
```json
{
  "statusCode": 200,
  "message": "Student retrieved successfully",
  "data": { ... }
}
```

---

### 4️⃣ Update Student by Roll Number
**Endpoint:** `PUT /api/v1/students/student/:rollNumber`
**Request Type:** `multipart/form-data`
#### **Example Request:**
```sh
PUT /api/v1/students/student/101
```
#### **Request Body:**
```json
{
  "studentName": "John Updated",
  "class": 11
}
```
#### **Response:**
```json
{
  "statusCode": 200,
  "message": "Student updated successfully",
  "data": { ... }
}
```

---

### 7️⃣ Delete Student Permanently
**Endpoint:** `DELETE /api/v1/students/student/:rollNumber`
#### **Response:**
```json
{
  "statusCode": 200,
  "message": "Student deleted successfully"
}
```

---
### 🔥 Additional Enhancements
- **Logging** with Morgan
- **Error Handling Middleware** for structured responses
- **Environment-Based Configurations** for security

---

## 📌 Running in Production
Use `pm2` to run in production mode:
```sh
pm install -g pm2
pm run build
pm start
```

---

## 💡 Contributing
Contributions are welcome! Feel free to open issues or submit PRs.

---

## 📄 License
This project is licensed under the MIT License.

