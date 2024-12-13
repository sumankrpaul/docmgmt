import {scrypt, randomBytes} from 'crypto'
export class Password {
    private static  keylength = 64;

    static toHash(password: string) {
        return new Promise<string>((resolve, reject)=>{
            const salt = randomBytes(8).toString('hex');
            scrypt(password, salt, Password.keylength, (err, derivedKey)=>{
                if(err) reject(err);
                resolve(`${derivedKey.toString('hex')}.${salt}`)
            })
        })
    }
    static compare(storedPass: string, pass: string ){
        return new Promise<boolean>((resolve, reject)=>{
            const [hashedPass, salt] = storedPass.split('.');
            scrypt(pass, salt, Password.keylength, (err, derivedKey)=>{
                if(err) reject(err);
                resolve(derivedKey.toString('hex') === hashedPass);
            })
        })
    }
}