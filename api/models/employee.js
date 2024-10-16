const mongoose = require("mongoose");



const employeeSchema = new mongoose.Schema({
    employeeName:{
        type:String,
        required:true
    },
    employeeId:{
        type:String,
        required:true,
        unique:true
    },
    designation:{
        type:String,
        required:true,        
    },
    phoneNumber:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    joiningDate:{
        type:String,
        required:true
    },
    activeEmployee:{
        type:Boolean,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
  
    address:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


});

const Employee = mongoose.model("Employee" , employeeSchema);
module.exports = Employee;  