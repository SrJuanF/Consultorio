import { Schema, model } from "mongoose"

const serviceSquema = new Schema({
    title: String,
    presentation: String,
    description: String,
    content: Array
}, {versionKey: false})
const ServicesModel = model('services', serviceSquema)
export default ServicesModel