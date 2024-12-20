import React, { useEffect, useState } from 'react';
import { getStoerdFile } from '../../API/image.api';

export const ImageViwer = ({id,alt, ...props}:{id: string, alt: string})=>{
    const [imageSrc, setImgSrc] = useState<string|null>(null);
    
    const getImageSrc = ()=>{
        getStoerdFile(id).then((src)=>{
            setImgSrc(src);
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getImageSrc();
    }, [id])
    if(imageSrc){
        return <img src={imageSrc} alt={alt} {...props}/>
    } else {
        return 'loading';
    }
}