import { IResponse } from "../interface/IfcCommon"
import { publicInstance } from "./common"

export interface RegisterUserPayload {
    "first_name": string,
    "last_name": string,
    "email": string,
    "password": string,
    "repeat_password": string
}

export interface LoginUserPayload {
    "email": string,
    "password": string,
}


export const registerUser = async (payload: RegisterUserPayload)=>{
    try {
        const response = await publicInstance.post<IResponse>('/user/register', {...payload})
        return response;
    } catch(err) {
        console.log(err);
    }
}

export const loginExistingUser = async (payload: LoginUserPayload)=>{
    try{
        const response = await publicInstance.post<IResponse>('/user/login', {...payload});
        return response;
    } catch(err) {
        console.log(err);
    }
}