import express from 'express';

const v1Route : express.Router = express.Router();

v1Route.get("" , (req : express.Request , res : express.Response)=>{
    res.send("you can now use the api routes");
})

export default v1Route;