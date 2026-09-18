db = db.getSiblingDB("CollegeDB");

db.createCollection("Students");

db.Students.insertOne({
    regNo: "23CSE001",
    name: "Arun",
    department: "CSE",
    cgpa: 8.5
});

db.Students.insertMany([
    {
        regNo: "23CSE002",
        name: "Bala",
        department: "CSE",
        cgpa: 7.8
    },
    {
        regNo: "23ECE001",
        name: "Charan",
        department: "ECE",
        cgpa: 8.9
    },
    {
        regNo: "23IT001",
        name: "Divya",
        department: "IT",
        cgpa: 9.2
    }
]);

print("ALL STUDENTS");
db.Students.find().forEach(printjson);

print("CSE STUDENTS");
db.Students.find({
    department: "CSE"
}).forEach(printjson);

print("CGPA GREATER THAN 8.0");
db.Students.find({
    cgpa: { $gt: 8.0 }
}).forEach(printjson);

print("NAME AND CGPA");
db.Students.find(
    {},
    {
        _id: 0,
        name: 1,
        cgpa: 1
    }
).forEach(printjson);

print("SORT BY CGPA DESCENDING");
db.Students.find()
    .sort({ cgpa: -1 })
    .forEach(printjson);

db.Students.updateOne(
    { regNo: "23CSE002" },
    { $set: { cgpa: 8.2 } }
);

print("AFTER UPDATEONE");
db.Students.find().forEach(printjson);

db.Students.updateMany(
    {},
    {
        $set: {
            email: "student@college.edu"
        }
    }
);

print("AFTER UPDATEMANY");
db.Students.find().forEach(printjson);

db.Students.deleteOne({
    regNo: "23IT001"
});

print("AFTER DELETEONE");
db.Students.find().forEach(printjson);
