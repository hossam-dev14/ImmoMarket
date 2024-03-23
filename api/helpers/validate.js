import joi from "joi";

// Define a validation schema for the request body

export const validateSignUp = (user) => {
    const sipnUpSchema = joi.object({
        username: joi.string().required().min(3),
        email: joi.string().required(),
        phone: joi.number().required().min(10),
        password: joi.string().required().min(8),
        confirmPassword: joi.string().required().min(8)
    })

    return sipnUpSchema.validate(user)
}

export const validateSignIn = (user) => {
    const signInSchema = joi.object({
        email: joi.string().required(),
        password: joi.string().required().min(8)
    })

    return signInSchema.validate(user)
}
