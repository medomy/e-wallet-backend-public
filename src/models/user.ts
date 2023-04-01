import mongoose from "mongoose";
import { User } from "../types/user";

// name : string,
//     mobileNumber : string,
//     profilePic: string,
//     balance: number
const UserSchema = new mongoose.Schema<User>({
    name : {
        type : String,
        required: true,
        minLength : 6
    },
    mobileNumber : {
        type : String,
        required: true,
        validate : {
            validator : (v : string)=> /^01[0125][0-9]{8}$/.test(v),
            message : "mobile number is not an Egyptian number"
        },
        unique : true,
        immutable : true
    },
    balance : {
        type : Number,
        required : true,
        validate : {
            validator : (v : number)=> v >=5,
            message : "balance is below limit"
        },
    },
    profilePic : {
        type : String
    },
    password : {
        type : String
    },
    role : {
        type: String,
        validate : {
            validator : (v : string)=> v === "admin" || v=== "user",
            message : "role value is not correct"
        }
    }
})

export default mongoose.model("users" , UserSchema);