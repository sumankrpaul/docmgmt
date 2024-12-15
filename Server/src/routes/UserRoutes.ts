import { Request, Response } from "express";
import AppRoute from "./Route";
import Rules from '../validators/UserValidators';
import ValidateRequest from "../middlewares/ValidateRequest";
import { LoginUser, RegisterUser } from "../controllers/UserController";
import { IUserRegisterRequest } from "../interfaces/IFCUser";
import { checkAuthenticated } from "../middlewares/Authenticate";

class UserRoutes extends AppRoute {

    initializeRoutes(){
        this.router.get('/me', checkAuthenticated , (req: Request,res: Response)=>{
           return res.json({ user_details: req.currentUser || null })
        });

        this.router.get('/search');

        this.router.get('/:userId/details');

        this.router.post('/login', Rules.userLogin, ValidateRequest, LoginUser);

        this.router.post('/register', Rules.userRegistration, ValidateRequest, RegisterUser);
    }
}


export default new UserRoutes();