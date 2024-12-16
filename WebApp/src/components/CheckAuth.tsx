import { ReactNode } from "react";
import { useDocumetContext } from "../../service/Document.context";
import { Navigate } from "react-router-dom";
import React from "react";

export const CheckAuth = ({children}: {children: ReactNode})=>{
    const {state} = useDocumetContext();

    if(state.auth.isAutheicated){
        return children
    }
    return <Navigate to="/signin"/>
}