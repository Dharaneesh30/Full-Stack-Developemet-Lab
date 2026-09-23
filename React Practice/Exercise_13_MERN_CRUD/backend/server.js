
// Unified backend for Ex 13 MERN CRUD
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/CollegeDB').then(() => console.log('MongoDB connected'));

const Student = mongoose.models.Student || mongoose.model('Student', new mongoose.Schema({
    studentId: String, name: String, department: String
}));

app.get('/api/students', async (req, res) => { res.json(await Student.find()); });
app.post('/api/students', async (req, res) => { res.json(await new Student(req.body).save()); });
app.delete('/api/students/:id', async (req, res) => { res.json(await Student.findOneAndDelete({studentId: req.params.id})); });

app.listen(5000, () => console.log('MERN Backend running on port 5000'));
