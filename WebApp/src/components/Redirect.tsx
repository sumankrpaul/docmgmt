import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default ({redirectTo}:{redirectTo: string})=>{
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(redirectTo);
    }, [])
    return<></>
}