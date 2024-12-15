import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './components/Header';
import Content from './components/Content';

const AppLayout = ()=>{
    return <div className="h-full">
        <Header/>
        <Content>
            <Outlet/>
        </Content> 
    </div>
}

export {AppLayout}