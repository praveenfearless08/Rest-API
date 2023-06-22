const express = require("express");
const { connect, getDatabase } = require("./db");
const Student = require("./models/student");

const app = express();
const port = 3000;

// Connect to the MongoDB database
connect().catch((err) => console.error(err));

// Middleware to parse JSON request bodies
app.use(express.json());

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Post the data
app.post("/students", async (req, res) => {
  try {
    const { name, age, grade } = req.body;

    const student = new Student({
      name,
      age,
      grade,
    });

    await student.save();

    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (student) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
