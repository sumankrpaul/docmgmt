import { Password } from "@/service/Password";
import mongoose from "mongoose";

interface UserAttr { 
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    is_verified: boolean
}

interface UserDocument extends mongoose.Document {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    is_verified: boolean
}

interface UserModel extends mongoose.Model<UserDocument> {
    build(attr: UserAttr): UserDocument;
}

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true },
    password: { type: String, require: true },
    is_verified: {type: Boolean, default: false}
}, {
    toJSON:{
        transform(doc, ret) {
            ret.id=ret._id;
            delete ret._id;
            delete ret.password
        }
    },
    toObject: {
        transform(doc, ret) {
            ret.id = ret._id;
        }
    }
})

userSchema.pre('save', async function(done) {
    if(typeof this.get('password') === 'string' && this.isModified('password')){
        const hashed =await Password.toHash(this.get('password')!);
        this.set('password', hashed)
    }
    done()
})

userSchema.statics.build = (attr: UserAttr) =>{
    return new User(attr);
}

const User = mongoose.model<UserDocument, UserModel>('user', userSchema);

export { User }