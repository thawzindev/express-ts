import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
let jwt = require('jsonwebtoken');

const login = async (req: Request, res: Response) => {
    let { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({
            success: false,
            error: 'User not found',
        });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.json({
            success: false,
            error: 'Wrong email or password',
        });
    }

    let token = generateToken(user.id, user.fullName, user.email);

    return res.json({
        success: true,
        data: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            token,
        },
    });
};

const register = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;

    try {
        const user = new User({
            fullName,
            email,
            password: await bcrypt.hash(password, 10),
        });

        await user.save();

        let userObj = { id: user.id, email, fullName };

        // Create token
        const token = jwt.sign(userObj, process.env.TOKEN_KEY, {
            expiresIn: '2h',
        });

        res.json({
            ...userObj,
            token,
        });

        res.json({ success: true });
    } catch (error) {
        res.json({ success: false });
    }
};

const generateToken = (id: string, fullName: string, email: string): String => {
    const token = jwt.sign(
        {
            id,
            fullName,
            email,
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: '48h',
        }
    );

    return token;
};

export default {
    register,
    login,
};
