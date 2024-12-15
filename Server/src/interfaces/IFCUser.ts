import { JwtPayload } from "jsonwebtoken";
import IResponse from "./AppResponse";

export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    is_verified: boolean;
}

export interface IUserTokenPayload extends JwtPayload{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    is_verified: boolean;
} 

export interface IUserRegisterRequest {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    repeat_password: string
}

export interface IUserLoginRequest {
    email: string,
    password: string
}

export interface IUserLoginResonse extends IResponse {
    user_token: string;
    user_details: IUser;
}

export interface IUserDetailResponse extends IResponse {
    user_details: IUser
}

