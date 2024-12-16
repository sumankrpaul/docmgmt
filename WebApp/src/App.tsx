import React from "react";
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppLayout } from "./Layout";
import Redirect from "./components/Redirect";
import {AuthPage, Dashboard, MyFiles} from './Pages';
import { DocumentContextProvider } from "../service/Document.context";
import { CheckAuth } from "./components/CheckAuth";
import  { Toaster } from 'react-hot-toast';
function App (){
    return <div className="h-screen">
        <Toaster></Toaster>
        <Routes >
            <Route path="/signin" element={<AuthPage/>} ></Route>
            <Route element={<AppLayout/>}>
                <Route path="/" element={<Redirect redirectTo="/dashboard" />} />
                <Route path="/dashboard" element={<CheckAuth><Dashboard/></CheckAuth>} />
                <Route path="/myfiles" element={<CheckAuth><MyFiles/></CheckAuth>} />
            </Route>
        </Routes>

    </div>

}

export default ()=>{
    return <DocumentContextProvider>
        <Router>
            <App/>
        </Router>
    </DocumentContextProvider>;
}