const mongoose = require('mongoose');

const attendaSchema = new mongoose.Schema({
    employeeId:{
        type:String,
        required:true
    },
    employeeName:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

const Attendance = mongoose.model('Attendance',attendaSchema);
module.exports = Attendance;  