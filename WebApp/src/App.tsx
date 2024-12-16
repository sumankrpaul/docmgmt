import React from "react";
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppLayout } from "./Layout";
import Redirect from "./components/Redirect";
import {AuthPage, Dashboard, MyFiles} from './Pages';
import { DocumentContextProvider } from "../service/Document.context";
import { CheckAuth } from "./components/CheckAuth";

function App (){
    return <div className="h-screen">
        <Routes >
            <Route path="/signin" element={<AuthPage/>} ></Route>
            <Route element={<CheckAuth><AppLayout/></CheckAuth>}>
                <Route path="/" element={<Redirect redirectTo="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/myfiles" element={<MyFiles/>} />
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