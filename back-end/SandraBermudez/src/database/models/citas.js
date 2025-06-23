import { Schema, model } from "mongoose"

const citaSquema = new Schema({
    iduser: {type: Schema.Types.ObjectId, required: true},
    title: String,
    email: String, 
    modalidad: String,
    description: String,
    start: String,
    end: String
}, {versionKey: false})
const CitasModel = model('citas', citaSquema)
export default CitasModel