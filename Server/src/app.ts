import express, { NextFunction,Request, Response } from "express";
import {json} from "body-parser";
import ErrorHandler from "./middlewares/ErrorHandler";
import 'express-async-errors';
import { NotFoundError } from "./errors/NotFoundError";
import { User } from "./models/User";
import { checkAuthenticated } from "./middlewares/Authenticate";

const App = express();
const someAsyncStuff = ()=>new Promise<void>((resolve)=>{
    setTimeout(()=> {  resolve() }, 10)
})

App.use(json());

App.get("/", (req: Request, res: Response)=>{
    res.json({ message: " Trust me bro " });
});


App.get("/error", async (req: Request, res: Response, next: NextFunction)=>{
    try{
        await someAsyncStuff();
        throw new Error("Alpha is beta");
    } catch (err) {
        next(err)
    }
});

App.get('/check', checkAuthenticated, (req: Request,res: Response)=>{
    res.json(req.currentUser);
})

App.all('*', ()=> { throw new NotFoundError } )

App.use(ErrorHandler);


export default App;