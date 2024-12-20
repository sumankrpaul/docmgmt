import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { detailKey, tokenKey } from "../API/common";
import { ContextActions, ContextProps, IAPIStatus, initialState } from "../interface/IfcContext";
import { IUser } from "../interface/IfcUser";

const contextInitialState: ContextProps = {
    state:{
        auth: {
            isAutheicated: false,
            me: null,
            status: IAPIStatus.Idle,
            error: ""
        },
        my_files: {
            total_files: 0,
            file_list: [],
            status: IAPIStatus.Idle,
            error: ""
        },
        shared_files: {
            total_files: 0,
            file_list: [],
            status: IAPIStatus.Idle,
            error: ""
        }
    },
    dispatch: ()=>{}
}

const reducer = (state: initialState, action: ContextActions): initialState =>{
    const {type, payload} = action;

    switch(type){
        // Auth Actions
        case 'SETAUTHUSER': {
            const { auth } = state;
            localStorage.setItem(tokenKey, payload.user_token);
            localStorage.setItem(detailKey, JSON.stringify(payload.user))
            return { ...state, auth: {...auth, isAutheicated: payload.isAuthenticated, me: payload.user, status: payload.status} }
        }
        case 'LOGOUTUSER': {
            localStorage.removeItem(tokenKey);
            localStorage.removeItem(detailKey);
            return { ...state, auth: { isAutheicated: false, me: null, status: IAPIStatus.Idle, error: '' } }
        }
        case 'SETAUTHEERROR': {
            const { auth } = state;
            return { ...state, auth: { ...auth, status: IAPIStatus.Error, error: payload.error } }
        }
        case 'SETAUTHSTATUS': {
            const {auth} = state;
            return { ...state, auth: {...auth, status: payload.status, error: ''}}
        }
        case 'CHECKAUTH': {
            const storedToken = localStorage.getItem(tokenKey);
            const storedUser = localStorage.getItem(detailKey);
            if(storedToken && storedUser){
                let user_detail: null| IUser = null;
                try {
                    user_detail = JSON.parse(storedUser) as IUser
                } catch {
                    localStorage.removeItem(tokenKey);
                    localStorage.removeItem(detailKey);
                    return {...state, auth:{ isAutheicated: false, status: IAPIStatus.Idle, error:'', me: null }};
                }
                return {...state, auth:{ isAutheicated: true, status: IAPIStatus.Idle, error:'', me: user_detail }};
            }
            return {...state, auth:{ isAutheicated: false, status: IAPIStatus.Idle, error:'', me: null }};
        }
        default:
            return {...state}
    }
}

const AppDocumentContext = createContext<ContextProps>(contextInitialState);

export const DocumentContextProvider = ({children}: {children: ReactNode})=>{
    const [state, dispatch] = useReducer(reducer, contextInitialState.state);
    return <AppDocumentContext.Provider value={{state, dispatch}}>
        {children}
    </AppDocumentContext.Provider>;
}

export const useDocumetContext = ()=>{
    const context = useContext(AppDocumentContext);
    if(context === undefined){
        throw new Error("useDocument must be used only under a proviver")
    }
    return context;
}

