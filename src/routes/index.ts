import express, { Router } from 'express';
import v1Route from './v1/v1Route';
const apiRoute : Router = express.Router();

apiRoute.get("" , (req : express.Request , res : express.Response)=>{
    res.send("go to /v1 to begin");
})
apiRoute.use("/v1" , v1Route);

export default apiRoute;