import PostsModel from './models/posts.js'

export const getPost = async (id) => {
    try {
        const post = await PostsModel.findOne({ _id: id });
        return post
    } catch (error) {
        console.log(error)
    }
}

export const getPosts = async () => {
    try {
        const posts = await PostsModel.find()
        return posts
    } catch (error) {
        console.log(error)
    }
}
export const savePost = async (req) => {
    try {
        const newPost = new PostsModel({
            title: req.title,
            presentation: req.presentation,
            content: req.content
        });
        const neww = await newPost.save();
        return neww;
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async (req) => {
    try {
        const post = await PostsModel.findOneAndUpdate({ _id: req.id }, {$set:req.valores},{ new: true });
        return post;
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (id) => {
    try {
        await PostsModel.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error)
    }
}