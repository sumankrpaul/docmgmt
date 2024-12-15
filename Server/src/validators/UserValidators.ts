import { body } from "express-validator";

export default {
    userRegistration: [
        body('email')
        .exists()
        .notEmpty()
        .withMessage("Email is a required")
        .isEmail()
        .withMessage("Enter a valid email"),
        body('first_name')
        .exists()
        .notEmpty()
        .withMessage("First Name is required"),
        body('last_name')
        .exists().notEmpty()
        .withMessage("Last Name is required"),
        body('password')
        .trim().exists().notEmpty()
        .withMessage("Password is required"),
        body('repeat_password')
        .trim().exists().notEmpty()
        .withMessage('Repete Password is required')
        .custom((value, {req})=>{
            if(value !== req.body.password){
                throw new Error("Password mismatch")
            }
            return true;
        })
    ],
    userLogin: [
        body('email')
        .exists()
        .notEmpty()
        .withMessage("Email is a required")
        .isEmail()
        .withMessage("Enter a valid email"),
        body('password')
        .trim().exists().notEmpty()
        .withMessage("Password is required")
    ]
}
