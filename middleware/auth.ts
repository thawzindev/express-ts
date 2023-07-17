import { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import { IGetUserAuthInfoRequest } from '../custom/custom'
const jwt = require('jsonwebtoken')

// export const verifyToken = (
//   req: IGetUserAuthInfoRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   //   //   req.user = {
//   //   //     name: process.env.TOKEN_KEY,
//   //   //   };

//   //   next();
//   //   const token = req.query.token;

//   let token = req.query.token;

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.TOKEN_KEY);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   next();
// };

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.headers.authorization === undefined) {
            return res.status(400).json({
                success: false,
                error: 'authorization required',
            })
        }

        let token = req.headers.authorization.split(' ')[1]

        let decoded = jwt.verify(token, process.env.TOKEN_KEY)

        req.body.user = {
            id: decoded.id,
            email: decoded.email,
            fullName: decoded.fullName,
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: 'server errror',
        })
    }

    next()
}
function next() {
    throw new Error('Function not implemented.')
}
