import React, { ReactNode } from "react"
import { ImageViwer } from "../../components/ImageViewer"

export default ()=>{
    return <div className=" h-full grid grid-rows-2 gap-4">
        <div> 
            <FileList>
                <RowHeader> Shared Files </RowHeader>
                <ImageViwer id="675f13949b8609c8fd507a0d" alt="testing" />
            </FileList>
        </div>
        <div> 
            <FileList>
                <RowHeader> My Files </RowHeader>
            </FileList>
        </div>
    </div>
}

const RowHeader = ({children}:{children: ReactNode})=>{
    return <h3 className="text-lg font-semibold py-1 border-b text-slate-700"> {children} </h3>
}

const FileList = ({children}: {children: ReactNode} )=>{
    return <div className="h-full shadow overflow-y-scroll">
        {children}
    </div>
}