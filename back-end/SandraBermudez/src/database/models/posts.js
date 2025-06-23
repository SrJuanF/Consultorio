import { Schema, model } from "mongoose"

const postSquema = new Schema({
    title: String,
    presentation: String,
    content: Array
}, {versionKey: false})
const PostsModel = model('posts', postSquema)
export default PostsModel