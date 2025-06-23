import { Schema, model } from "mongoose"

const commentsSquema = new Schema({
    iduser: {type: Schema.Types.ObjectId, required: true},
    topic: String,
    nombre: String,
    imagen: String,
    comment: String,
    reviews: [{reviews: { type: Array, default: [] }}],
    likes: Array,
    dislikes: Array,
}, {versionKey: false, timestamps: true, strict: false})
const commentsModel = model('comments', commentsSquema)
export default commentsModel