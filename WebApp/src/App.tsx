import React, { useState } from "react";
import './index.css';
// @ts-ignore
import sampleimage from "../public/demo.jpg";

function App (){
    const [count, setCount] = useState(1);
    
    return <div>
        <h1>HAua Haua</h1>
        <h1>Chnaged</h1>
        <h1>Cool vite </h1>
        <img src={sampleimage} height={300} width={500} />
        
        <h1> Count Is : {count} </h1>
        <button type="button" onClick={()=> setCount(count+1)} > + Increment</button>
        <button type="button" onClick={()=> setCount(count-1)} > - Decrement</button>

        <div className="p-4 rounded bg-slate-300">
            <h1 className="text-lg font-semibold text-slate-700" >
                Testing Tailwind
            </h1>
        </div>

    </div>

}

export default App;