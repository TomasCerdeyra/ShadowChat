import jwt, { verify } from "jsonwebtoken";

const generateJWT = (id: string) => {
    return jwt.sign({ id }, <string>process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

const checkJWT = (JWT: string, ) => {
    return verify(JWT, <string>process.env.JWT_SECRET)
}

export {
    generateJWT,
    checkJWT
}