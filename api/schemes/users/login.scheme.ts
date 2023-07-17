import { z } from 'zod'

const loginUserScheme = z.object({
    body: z.object({
        email: z
            .string({
                required_error: 'Email is required',
            })
            .email('Not a valid email'),
        password: z.string({
            required_error: 'password is required',
        }),
    }),
})

export default loginUserScheme
