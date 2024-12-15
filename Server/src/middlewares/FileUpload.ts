import multer from "multer";
import path from 'path';
import fs from 'node:fs';
import { randomBytes } from "node:crypto";

const file_location =  process.env.FILELOCATION ? path.resolve(process.env.FILELOCATION) : path.resolve(path.join(...[ __dirname, '../', 'uploads' ])) 

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        if(req.currentUser){
            const user_file_loc = path.join(file_location, req.currentUser.id);
            fs.stat(user_file_loc, (err, stat)=>{
                if(err){
                    fs.mkdir(user_file_loc, (err)=>{
                        if(err) cb(err, '');
                        cb(null ,user_file_loc)
                    })
                } else {
                    cb(null, user_file_loc);
                }
            })
        }
        
    },
    filename: (req, file, cb) => {
        if(req.currentUser){
            cb(null, `${Date.now()}-${randomBytes(8).toString('hex')}-${file.originalname}` )
        }
    }
})

export const SingleUploader = (filed_name: string)=>{
    return multer({storage}).single(filed_name);
}