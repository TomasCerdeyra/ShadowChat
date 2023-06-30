import jwt, { verify } from "jsonwebtoken";

const generateJWT = async (id: string) => {
    return jwt.sign({ id }, <string>process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

const checkJWT = async (JWT: string, ) => {
    return verify(JWT, <string>process.env.JWT_SECRET)
}

export {
    generateJWT,
    checkJWT
}