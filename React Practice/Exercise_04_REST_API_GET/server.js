
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
    regNo: String, name: String, department: String, cgpa: Number, email: String
});
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3004, () => console.log('API running on port 3004'));
