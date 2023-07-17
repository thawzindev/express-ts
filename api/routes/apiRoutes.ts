import express from 'express'

import loginController from '../controllers/loginController'
import schemeValidator from '../../middleware/schemeValidator'
import createUserScheme from '../schemes/users/create.scheme'
import loginUserScheme from '../schemes/users/login.scheme'
import userController from '../controllers/userController'
import { verifyToken } from '../../middleware/auth'
const router = express.Router()

router.post(
    '/user/register',
    schemeValidator(createUserScheme),
    loginController.register
)

router.get(
    '/user/login',
    schemeValidator(loginUserScheme),
    loginController.login
)

router.get('/user/profile', verifyToken, userController.profile)

export default router
