
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

app.delete('/api/students/:id', async (req, res) => {
    try {
        const deleted = await Student.findOneAndDelete({ studentId: req.params.id });
        if(!deleted) return res.status(404).json({ error: 'Not found' });
        res.status(200).json({ message: 'Deleted', student: deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log('DELETE API running on port 5000'));
