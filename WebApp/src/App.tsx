import React from "react";
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppLayout } from "./Layout";
import Redirect from "./components/Redirect";

function App (){
    return <div className="h-screen">
        <Routes >
            <Route element={<AppLayout/>}>
                <Route path="/" element={<Redirect redirectTo="/my_files" />} />
                <Route path="/my_files" element={<div> My Files </div>} />
                <Route path="/shared_file" element={<div> Shared Files </div>} />
                <Route path="/me" element={<div> My Details </div>}/>
            </Route>
        </Routes>

    </div>

}

export default ()=>{
    return <Router>
        <App/>
    </Router>;
}