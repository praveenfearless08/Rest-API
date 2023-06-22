const mongoose = require("mongoose");

// Define the student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
});

// Create the Student model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
