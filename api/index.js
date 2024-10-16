const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
const moment = require('moment')
const mongoose = require("mongoose");
const Employee = require('./models/employee');
const Attendance = require('./models/attendance'); // Corrected spelling from Attendace to Attendance

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://mbchate08:zeDsMIbMHYg3nJQw@cluster0.kkblo.mongodb.net/')
    .then(() => {
        console.log("Connected to the database");
    }).catch((error) => {
        console.log("Error in connecting to MongoDB", error);
    });

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});




// Endpoint to register an employee 
app.post("/api/employee", async (req, res) => {
    try {
        const { employeeName, employeeId, designation, phoneNumber, dateOfBirth, joiningDate, activeEmployee, salary, address } = req.body;

        const newEmployee = new Employee({
            employeeName, employeeId, designation, phoneNumber, dateOfBirth, joiningDate, activeEmployee, salary, address
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });

    } catch (err) {
        console.log("Error Creating employee", err);
        res.status(500).json({ message: "Failed to add an employee!" });
    }
});

// Endpoint to fetch all employees
app.get("/api/employees", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ message: "Employees fetched successfully", employees });

    } catch (error) {
        console.log("Error retrieving employee", error); // Corrected variable name
        res.status(500).json({ message: "Failed to get employees!" });
    }
});


//Endpoint for attendance

app.post("/api/attendance", async (req, res) => {
    try {
      const { employeeId, employeeName, date, status } = req.body;
  
      const existingAttendance = await Attendance.findOne({ employeeId, date });
  
      if (existingAttendance) {
        existingAttendance.status = status;
        await existingAttendance.save();
        res.status(200).json(existingAttendance);
      } else {
        const newAttendance = new Attendance({
          employeeId,
          employeeName,
          date,
          status,
        });
        await newAttendance.save();
        res.status(200).json(newAttendance);
      }
    } catch (error) {
      res.status(500).json({ message: "Error submitting attendance" });
    }
  });


app.get("/api/attendance", async (req, res) => {
    try {

        const { date } = req.query;

        const attendanceData = await Attendance.find({ date: date });

        res.status(200).json(attendanceData);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Fetching Attendance" });
    }
})

app.get("/api/attendance-report-all-employee", async (req, res) => {
    try {
        const { month, year } = req.query;
        console.log("query parameters", month, year);

        const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
            .startOf("month")
            .toDate();

        const endDate = moment(startDate).endOf("month").toDate();

        const report = await Attendance.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    { $month: { $dateFromString: { dateString: '$date' } } },
                                    parseInt(req.query.month)
                                ]
                            },
                            {
                                $eq: [
                                    { $year: { $dateFromString: { dateString: '$date' } } },
                                    parseInt(req.query.year)
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$employeeId",
                    present: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 }
                        }
                    },
                    absent: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 }
                        }
                    },
                    halfday: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 }
                        }
                    },
                    holiday: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "_id",
                    foreignField: "employeeId",
                    as: "employeeDetails"
                }
            },
            {
                $unwind: "$employeeDetails"
            },
            {
                $project: {
                    _id: 1,
                    present: 1,
                    absent: 1,
                    halfday: 1,
                    name: "$employeeDetails.employeeName",
                    designation: "$employeeDetails.designation",
                    salary: "$employeeDetails.salary",
                    employeeId: "$employeeDetails.employeeId"
                }
            }
        ]);

        
        res.status(200).json(report);

    } catch (error) {
        res.status(500).json({ message: "Error fetching summary report", error: error.message });
    }
});
