import { ReactNode, useEffect } from "react";
import { useDocumetContext } from "../../service/Document.context";
import { Navigate, useLocation } from "react-router-dom";
import React from "react";

export const CheckAuth = ({children}: {children: ReactNode})=>{
    const {state, dispatch} = useDocumetContext();
    const location = useLocation();
    // dispatch({type: 'CHECKAUTH', payload:{}})
    useEffect(()=>{
        dispatch({type:'CHECKAUTH', payload: {}})
    }, [location])
    if(state.auth.isAutheicated){
        return children
    }
    return <Navigate to="/signin"/>
}