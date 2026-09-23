
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    regNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true }
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

async function runCRUD() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/CollegeDB');
        console.log('Connected to MongoDB');

        // 1. Create
        const newStudent = await Student.create({ regNo: '23ECE002', name: 'New Student', department: 'ECE' });
        console.log('Created:', newStudent.name);

        // 2. Read
        const students = await Student.find();
        console.log('Read all:', students.map(s => s.name));

        // 3. Update
        await Student.updateOne({ regNo: '23ECE002' }, { $set: { name: 'Updated Name' } });
        console.log('Updated document');

        // 4. Delete
        await Student.deleteOne({ regNo: '23ECE002' });
        console.log('Deleted document');

    } catch (e) {
        console.error(e);
    } finally {
        mongoose.disconnect();
    }
}

runCRUD();
