import commentsModel from './models/comments.js'

export const getComments = async (topic) => {
    try {
        const currentYear = new Date().getFullYear(); //Ultimo Año
        const comments = await commentsModel.find({
            createdAt: {$gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),$lte: new Date(`${currentYear}-12-31T23:59:59.999Z`)},
            topic: topic
        })
        return comments
    } catch (error) {
        console.log(error)
    }
}
export const saveComment = async (req) => {
    try {
        const newComment = new commentsModel({
            iduser: req.iduser,
            topic: req.topic,
            nombre: req.nombre,
            imagen: req.imagen,
            comment: req.comment,
            reviews: [],
            likes: [],
            dislikes: []
        });
        const comm = await newComment.save();
        return comm;
    } catch (error) {
        console.log(error)
    }
}

export const updateComment = async (id, consult) => {
    try {
        await commentsModel.updateOne({ "_id": id}, consult);
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = async (action, lvl, id, consult) => {
    try {
        if(action === 'C'){
            if(lvl === 3){
                await commentsModel.findOneAndDelete({ _id: id });
            }else{
                await commentsModel.updateOne({ "_id": id }, consult);
            }
        }else{
            await commentsModel.updateOne({ "_id": id }, consult);
        }
        
        //{$set:req.valores}
    } catch (error) {
        console.log(error)
    }
}