import { IUser } from "./IfcUser";
import { IUserFile } from "./IfcUserFiles";
import { createContext, Dispatch, ReactNode, useEffect, useReducer } from "react";

export enum IAPIStatus { 
    Idle="idle",
    Pending="pending",
    Success="success",
    Error="error"
}

export interface initialState {
    auth: {
        isAutheicated: boolean;
        me: IUser|null;
        status: IAPIStatus;
        error: string;
    };
    my_files: {
        total_files: number;
        file_list: IUserFile[];
        status: IAPIStatus;
        error: string;
    };
    shared_files: {
        total_files: number;
        file_list: IUserFile[];
        status: IAPIStatus;
        error: string;
    }
}

export interface ContextProps {
    state: initialState,
    dispatch: Dispatch<ContextActions>
}

export type ContextActions = {
    type: 'SETAUTHUSER';
    payload: { isAuthenticated: boolean, user: IUser, status: IAPIStatus }
} | {
    type: 'SETAUTHSTATUS';
    payload: { status: IAPIStatus }
} | {
    type: 'SETAUTHEERROR';
    payload: { error: string }
} | {
    type: 'LOGOUTUSER'; 
    payload: {}
}