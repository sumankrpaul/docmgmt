import { IUser } from "@/interfaces/IUser";
import jwt from 'jsonwebtoken';
console.log(process.env);
const JWT_SERCRET = process.env.JWTSECRET!;

export class Token {
    static generateToken(userDetail: IUser){
        return jwt.sign({
            ...userDetail
        }, JWT_SERCRET, {expiresIn: 300 })
    }
    static verifyToken(token: string) {
        try{
            console.log(JWT_SERCRET);
            const decoded = jwt.verify(token, JWT_SERCRET) as IUser;
            return decoded
        } catch (err) {
            return false;
        }
    }
}