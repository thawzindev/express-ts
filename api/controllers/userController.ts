import { Request, Response } from 'express'
import User from '../models/User'
let jwt = require('jsonwebtoken')

const profile = async (req: Request, res: Response) => {
    let { id } = req.body.user
    const user = await User.findOne({ _id: id })

    if (!user) {
        return res.status(400).json({
            success: false,
            error: 'User not found',
        })
    }

    return res.json({
        id,
        email: user.email,
        fullName: user.fullName,
    })
}

export default {
    profile,
}
