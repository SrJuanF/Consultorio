import { Schema, model } from "mongoose"

const userSquema = new Schema({
    nombre: String, 
    correo: String,
    imagen: String,
}, {versionKey: false, strict: false})
const UsersModel = model('users', userSquema)
export default UsersModel