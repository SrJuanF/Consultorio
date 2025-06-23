import { getCommentts, saveCommentts, updateCommentts, deleteCommentts } from '../services/comments.js'

export const Comments = async (req, res) => {
    try {
        const comment = await getCommentts(req.query.topic);
        res.status(200).json({ status: true, data: comment })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const saveComments = async (req, res) => {
    try {
        const comm = await saveCommentts(req);
        return res.status(200).json({ status: true, data: comm})
    } catch (error) {
        return res.status(500).json({status:false, errors:[error]})
    }
}

export const updateComments = async (req, res) => {
    try {
        await updateCommentts(req);
        res.status(200).json({ status: true})
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const deleteComments = async (req, res) => {
    try {
        await deleteCommentts(req);
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}