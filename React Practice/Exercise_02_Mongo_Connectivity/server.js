
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/CollegeDB')
    .then(async () => {
        console.log('MongoDB connected successfully');
        
        const studentSchema = new mongoose.Schema({
            regNo: { type: String, required: true, unique: true },
            name: { type: String, required: true },
            department: { type: String, required: true }
        });
        
        const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
        
        const count = await Student.countDocuments();
        if(count === 0) {
            await Student.insertMany([
                { regNo: '23CSE001', name: 'Arun', department: 'CSE' },
                { regNo: '23IT001', name: 'Divya', department: 'IT' }
            ]);
            console.log("Initial students inserted.");
        } else {
            console.log("Students collection already exists.");
        }
        process.exit(0);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });
