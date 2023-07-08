const mongoose = require("mongoose");
const Employee = require("../model/Employee");

exports.getEmployees = async (req, res) => {
    const employees = await Employee.find({});
    console.log(employees);
    res.status(200).json(employees);
}

exports.addNewEmployee = async (req, res) => {
    const newUser = await Employee.create({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName
    });
    res.status(201).json({"success": `${req.body.firstName} has been successfully added to the employee list!`})
}

exports.updateEmployeeById = async (req, res) => {
    const idToBeUpdated = new mongoose.Types.ObjectId(req.body.id);
    const result = await Employee.updateOne(
        {_id: idToBeUpdated},
        {$set: {firstName: req.body.firstName, lastName: req.body.lastName}}
    )

    if(result.nModified == 0){
        return res.status(404).json({"message": "No matching records found"})
    }
    res.status(200).json({"message": `Record has been updated.`})
}

exports.deleteEmployeeById = async (req, res) => {
    const idToBeDeleted = new mongoose.Types.ObjectId(req.body.id);
    const result = await Employee.deleteOne({_id: idToBeDeleted});
    if(result.deletedCount == 0){
        return res.status(400).json({"message": "No records found to be deleted."})
    }
    
    res.status(200).json({"message": `The record has been deleted.`})
}

exports.getEmployeeById = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const result = await Employee.findOne({_id: id});
    res.status(200).json(result);
}