
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/CollegeDB')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const studentSchema = new mongoose.Schema({
    studentId: String, name: String, department: String, email: String, marks: Number
});
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

app.post('/api/students', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const saved = await newStudent.save();
        res.status(201).json({ message: 'Student added', student: saved });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log('POST API running on port 5000'));
