
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

app.put('/api/students/:id', async (req, res) => {
    try {
        const updated = await Student.findOneAndUpdate(
            { studentId: req.params.id }, 
            { $set: req.body }, 
            { new: true }
        );
        if(!updated) return res.status(404).json({ error: 'Not found' });
        res.status(200).json({ message: 'Updated', student: updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log('PUT API running on port 5000'));
