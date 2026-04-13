//create Employee Schema (name,email.designation  & companyName)
import {model,Schema} from 'mongoose'

const employeeSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"Email already exists"]
    },
    mobile:{
        type:String,
        required:[true,"Mobile no is required"],
        unique:[true,"Mobile already exists"]
    },
    designation:{
        type:String,
        required:[true,"Designation is required"],
    },
    companyName:{
        type:String,
        required:[true,"Company Name is required"]
    }

},{
    versionKey:false,
    timestamps:true
})

//Generate model
   export const employeeModel= model("employee",employeeSchema)