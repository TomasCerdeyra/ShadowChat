import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface reqExtend extends Request {
    user?: JwtPayload | {id: string}
} 