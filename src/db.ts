import mongoose, { Mongoose } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const { CONNECTION_STRING } = process.env;
export function connectToDb() {
    try {
        mongoose.connect(CONNECTION_STRING!, {

        });
    } catch (err) {
        console.error(err);
     }
}