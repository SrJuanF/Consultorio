import { getComments, saveComment, updateComment, deleteComment} from '../database/Comments.js'


export async function getCommentts(topic) {
    try {
        const comments = await getComments(topic);
        return comments
    } catch (error) {
        console.log(error)
    }

}

export async function saveCommentts(req) {
    try {
        const comm = await saveComment(req.body);
        return comm;
    } catch (error) {
        console.log(error)
    }
}

export async function updateCommentts(req) {
    try {
        const lvl = Number(req.query.lvl);
        const index = Number(req.query.index);
        const action = req.query.action;
        const data = req.body;
        var consulta = {};
        if(action === 'C'){
            (lvl === 3) ? consulta = { "$push": { "reviews": data } } : consulta = { "$push": { [`reviews.${index}.reviews`]: data } };
        }else if(action === 'L'){
            (lvl === 3) ? consulta = { "$push": { "likes": data } } : consulta = { "$push": { [`reviews.${index}.likes`]: data } };
        }else if(action === 'D'){
            (lvl === 3) ? consulta = { "$push": { "dislikes": data } } : consulta = { "$push": { [`reviews.${index}.dislikes`]: data } };
        }
         
        await updateComment(data._id, consulta);

    } catch (error) {
        console.log(error)
    }
}

export async function deleteCommentts(req) {
    try {
        const lvl = Number(req.query.lvl);
        const idcomm = req.query.idcomm;
        const action = req.query.action;
        const data = req.body;
        var consulta = {};
        
        if(action === 'C'){
            if(lvl === 2){
                consulta = { $set: { reviews: data } };
            }else if (lvl <= 1){
                const indexP = parseInt(req.query.indexP);
                consulta = { $set: { [`reviews.${indexP}.reviews`]: data } }
            }
        }else if(action === 'L'){
            if(lvl === 3){
                consulta = { $set: { likes: data } };
            }else if(lvl === 2){
                const indexP = parseInt(req.query.indexP);
                consulta = { $set: { [`reviews.${indexP}.likes`]: data } }
            }
        }else if(action === 'D'){
            if(lvl === 3){
                consulta = { $set: { dislikes: data } };
            }else if(lvl === 2){
                const indexP = parseInt(req.query.indexP);
                consulta = { $set: { [`reviews.${indexP}.dislikes`]: data } }
            }
        }

        await deleteComment(action, lvl, idcomm, consulta);
        
    } catch (error) {
        console.log(error)
    }
}
