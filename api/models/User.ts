import { Schema, model, connect } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
interface IUser {
    fullName: string
    email: string
    password: string
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
})

// 3. Create a Model.
const User = model<IUser>('User', userSchema)

export default User
