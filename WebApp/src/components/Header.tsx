import React, { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

export default ()=>{
    return <div className="py-4 px-3 bg-slate-600 flex justify-between text-slate-100 " >
        <h1 className="text-lg">
            Doc Management 
        </h1>
        <div className="flex gap-x-2">
            <AppLink to="/dashboard" > Dashboard </AppLink>
            <AppLink to="/myfiles" > My Files </AppLink>
        </div>
    </div>
}
const AppLink = ({children, to}: {children: ReactNode, to: string})=>{
    const location = useLocation();
    const activeClass = "underline opacity-90"
    return <Link to={to} className={`cursor-pointer hover:underline ${location.pathname.includes(to)? activeClass : ''} `} >{children}</Link>
}