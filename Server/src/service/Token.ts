import jwt from 'jsonwebtoken';
import { IUser, IUserTokenPayload } from '../interfaces/IFCUser';
const JWT_SERCRET = process.env.JWTSECRET!;


export class Token {
    static generateToken(userDetail: IUser){
        return jwt.sign({
            ...userDetail
        }, JWT_SERCRET, {expiresIn: 86400 })
    }
    static verifyToken(token: string) {
        try{
            const decoded = jwt.verify(token, JWT_SERCRET) as IUserTokenPayload;
            return decoded
        } catch (err) {
            return false;
        }
    }
}