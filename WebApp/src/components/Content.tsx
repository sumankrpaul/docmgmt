import React, { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default ({children}:{children: ReactNode})=>{
    return <div style={{height: 'calc(100% - 60px)' }} className="bg-slate-50 text-slate-900" >
        <AppBreadcrums/>
        <div style={{height: 'calc(100% - 40px)' }} className="px-4">
            {children}
        </div>
    </div>
}

const AppBreadcrums = ()=>{
    const location = useLocation();
    const [breadCrums, setBreadCrums] = useState<{name:string, path: string}[]>([]);
    const generateRoutes = ()=>{
        const pathTree = location.pathname.split('/');
        const routelist: {name:string, path: string}[] = [];
        for(let i=0; i< pathTree.length; i++){
            if(i===0){
                routelist.push({name: pathTree[i], path: pathTree[i]});
            } else {

                routelist.push( {name: pathTree[i], path:`${routelist[i-1].path}/${pathTree[i]}`});
            }
        }
        setBreadCrums(routelist)
    }
    useEffect(()=>{
        generateRoutes();
    }, [location])
    return  <div className="px-4 py-2 flex gap-x-1" >
        {breadCrums.map((subPath, index)=>{
            if(subPath.name !== ''){
                return <Link className="cursor-pointer hover:underline" to={subPath.path} > {subPath.name} {index < breadCrums.length-1? '/':''} </Link>
            }
        })}
    </div>
}