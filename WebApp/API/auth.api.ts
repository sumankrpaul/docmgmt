import { IResponse } from "../interface/IfcCommon"
import { IUser } from "../interface/IfcUser"
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

interface LoginUserResponse extends IResponse {
    user_details: IUser,
    user_token: string,
}

export const registerUser = async (payload: RegisterUserPayload)=>{
    try {
        const response = await publicInstance.post<IResponse>('/user/register', {...payload})
        return response;
    } catch(err) {
        throw err as { message: string };
    }
}

export const loginExistingUser = async (payload: LoginUserPayload)=>{
    try{
        const response = await publicInstance.post<LoginUserResponse>('/user/login', {...payload});
        return response;
    } catch(err) {
        throw err as { message: string }
    }
}