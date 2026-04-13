import exp from 'express'
import {employeeModel} from '../models/emploeeModel.js'
export const employeeApp=exp.Router()

//Define employee routes

//Create employee
employeeApp.post("/employee", async (req, res, next) => {
    try {
        const employeeObj = req.body
        const newEmployeeDocument = new employeeModel(employeeObj)
        const result = await newEmployeeDocument.save()
        res.status(201).json({ message: "Employee Created", payload: result })
    } catch (err) {
        next(err)
    }
})

//Read all emps
employeeApp.get("/employee", async (req, res, next) => {
    try {
        const employee = await employeeModel.find()
        res.status(200).json({ message: "All Employees", payload: employee })
    } catch (err) {
        next(err)
    }
})

//Read emp by id
employeeApp.get("/employee/:id", async (req, res, next) => {
    try {
        const empId = req.params.id
        const employee = await employeeModel.findById(empId)
        if (!employee) return res.status(404).json({ message: "Employee not found" })
        res.status(200).json({ message: "Employee by id", payload: employee })
    } catch (err) {
        next(err)
    }
})

//Update emp by id  
employeeApp.put("/employee/:id", async (req, res, next) => {
    try {
        const empId = req.params.id
        const employeeObj = req.body
        const employee = await employeeModel.findByIdAndUpdate(empId, employeeObj, { new: true })
        if (!employee) return res.status(404).json({ message: "Employee not found" })
        res.status(200).json({ message: "Employee updated", payload: employee })
    } catch (err) {
        next(err)
    }
})

//Delete emp by id
employeeApp.delete("/employee/:id", async (req, res, next) => {
    try {
        const empId = req.params.id
        const result = await employeeModel.findByIdAndDelete(empId)
        if (!result) return res.status(404).json({ message: "Employee not found" })
        res.status(200).json({ message: "Employee deleted" })
    } catch (err) {
        next(err)
    }
})

export default employeeApp