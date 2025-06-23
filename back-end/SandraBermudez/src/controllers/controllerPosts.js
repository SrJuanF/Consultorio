import { getPostts, savePostts, updatePostts, deletePostts, deleteIMGPostts } from '../services/posts.js'

export const Posts = async (req, res) => {
    try {
        const posts = await getPostts(req.query.amen);
        res.status(200).json({ status: true, data: posts })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const savePosts = async (req, res) => {
    try {
        /*
        if(req.user === OwSan){

        }else{
            res.status(401).json({status:false, message: 'Invalid User'})
        }*/
        const newPostt = await savePostts(req);
        return res.status(200).json({ status: true, post: newPostt})
    } catch (error) {
        return res.status(500).json({status:false, errors:[error]})
    }
}

export const updatePosts = async (req, res) => {
    try {
        /*
        if(req.user.correoIn === OwSan){

        }else{
            res.status(401).json({status:false, message: 'Invalid User'})
        }*/
        const post = await updatePostts(req);
        res.status(200).json({ status: true, data: post })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const deletePosts = async (req, res) => {
    try {
        /*
        if(req.user === OwSan){

        }else{
            res.status(401).json({status:false, message: 'Invalid User'})
        }*/
        await deletePostts(req.body);
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const deleteIMGPosts = async (req, res) => {
    try {
        /*
        if(req.user === OwSan){

        }else{
            res.status(401).json({status:false, message: 'Invalid User'})
        }*/
        await deleteIMGPostts(req.body);
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}