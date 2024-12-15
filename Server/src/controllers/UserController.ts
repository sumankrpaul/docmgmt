import { Request, Response } from "express"
import { BadRequestError } from "../errors/BadRequestError"
import { IUserDetailResponse, IUserLoginRequest, IUserLoginResonse, IUserRegisterRequest, IUserSearchResponse } from "../interfaces/IFCUser";
import { User } from "../models/User";
import IResponse from "../interfaces/AppResponse";
import { Password } from "../service/Password";
import { Token } from "../service/Token";
import mongoose from "mongoose";

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

const SearchUser = async (req: Request<{},{},{}, {search?: string}>, res: Response<IUserSearchResponse>)=>{
    const searchString = req.query.search;
    if(!searchString || searchString.length < 3 ){
        throw new BadRequestError("Seach should have atleast 3 character")
    }


    const userList = await User.aggregate([
        { $match: { $expr:{ $regexMatch: { input: {$concat: ["$first_name", "$last_name", "$email"]}, regex: RegExp(searchString), options: 'i'} } }},
        { $addFields: { id: { $toString: "$_id" } } },
        { $project: { _id: 0, password: 0 } }
    ]);

    if(userList && userList.length) {
        return res.json({
            message: "List of user found",
            total_users: userList.length,
            user_list: userList
        })
    }

    return res.json({
        message: "No such user found",
        total_users: 0,
        user_list: []
    })


}

const UserDetails = async (req: Request<{userId: string},{},{}>, res: Response<IUserDetailResponse>)=>{
    const userId = req.params.userId;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new BadRequestError("User Id is invalid");
    }

    const userDetail = await User.findById(userId);
    if(userDetail){
        return res.json({
            message: "User is avbailable",
            user_details: userDetail.toJSON()
        })
    }
    throw new BadRequestError("No such user found", 404);
}

export { 
    RegisterUser,
    LoginUser,
    SearchUser,
    UserDetails
}