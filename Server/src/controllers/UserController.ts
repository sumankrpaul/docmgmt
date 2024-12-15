import { Request, Response } from "express"
import { BadRequestError } from "../errors/BadRequestError"
import { IUserLoginRequest, IUserLoginResonse, IUserRegisterRequest } from "../interfaces/IFCUser";
import { User } from "../models/User";
import IResponse from "../interfaces/AppResponse";
import { Password } from "../service/Password";
import { Token } from "../service/Token";

const RegisterUser = async (req: Request<{},{},IUserRegisterRequest>, res: Response<IResponse>)=>{
    const { email, first_name, last_name, password } = req.body;
    const existingUser = await User.findOne({email: email});
    if(existingUser){
        throw new BadRequestError("User email already exists")
    }

    const newUser = User.build({
        email, first_name, last_name, password, is_verified: false
    });

    const inserted = await newUser.save();

    console.log({in_object: inserted});
    console.log(inserted.toJSON());
    
    return res.json({ message: 'User inserted successfully' });

}

const LoginUser = async (req: Request<{},{},IUserLoginRequest>, res: Response<IUserLoginResonse>) =>{
    const { email, password } = req.body;
    const user = await User.findOne({email: email})
    if(!user){
        throw new BadRequestError("No such user exists")
    }

    const isCorrect = await Password.compare(user.password, password)

    if(!isCorrect){
        throw new BadRequestError("Password not matching");
    }

    return res.json({
        message: "Logged in successfully",
        user_token: Token.generateToken(user.toJSON()),
        user_details: user.toJSON()
    })

}


export { 
    RegisterUser,
    LoginUser
}