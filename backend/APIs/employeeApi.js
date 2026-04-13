import exp from 'express'
import {employeeModel} from '../models/emploeeModel.js'
export const employeeApp=exp.Router()

//Define employee routes

//Create employee
employeeApp.post("/employee",async(req,res)=>{
    //get body from req
    const employeeObj=req.body
    //create a new user document
    const newEmployeeDocument=new employeeModel(employeeObj)
    //save
    const result = await newEmployeeDocument.save()
    console.log(result)
    //send res
    res.status(201).json({mesasge:"User Created",payload:result})
})

//Read all emps
employeeApp.get("/employee",async(req,res)=>{
    //get employees from DB
    const employee=await employeeModel.find()
    //send res
    res.status(200).json({message:"All Employees",payload:employee})
})

//Read emp by id
employeeApp.get("/employee/:id",async(req,res)=>{
    //get id from req
    const empId=req.params.id
    //get employee from DB
    const employee=await employeeModel.findById({_id:empId})
    //send res
    res.status(200).json({message:"Employee by id",payload:employee})
})

//Update emp by id  
employeeApp.put("/employee/:id",async(req,res)=>{
    //get id from req
    const empId=req.params.id
    //get body from req
    const employeeObj=req.body
    //update employee in DB
    const employee=await employeeModel.findByIdAndUpdate({_id:empId},employeeObj,{new:true})
    //send res
    res.status(200).json({message:"Employee updated",payload:employee})
})

//Delete emp by id
employeeApp.delete("/employee/:id",async(req,res)=>{
    //get id from req
    const empId=req.params.id
    //delete employee from DB
    await employeeModel.findByIdAndDelete({_id:empId})
    //send res
    res.status(200).json({message:"Employee deleted"})
})