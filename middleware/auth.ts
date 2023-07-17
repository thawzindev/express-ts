import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { IGetUserAuthInfoRequest } from '../custom/custom';
const jwt = require('jsonwebtoken');

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
            });
        }

        let token = req.headers.authorization.split(' ')[1];

        jwt.verify(
            token,
            process.env.TOKEN_KEY,
            function (
                err: any,
                decoded: { id: string; email: string; fullName: string }
            ) {
                if (err) return res.status(400).json({ success: false });

                req.body.user = {
                    id: decoded.id,
                    email: decoded.email,
                    fullName: decoded.fullName,
                };
            }
        );
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: 'server errror',
        });
    }

    next();
};
function next() {
    throw new Error('Function not implemented.');
}
