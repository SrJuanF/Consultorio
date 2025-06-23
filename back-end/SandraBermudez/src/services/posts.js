import { getPost, getPosts, savePost, updatePost, deletePost} from '../database/Posts.js'
import {AMN} from '../../config.js'
import * as fs from 'fs'

export async function getPostts(req) {
    try {
        if(AMN === req){
            const posts = await getPosts();
            return posts;
        }
        return [];
    } catch (error) {
        console.log(error)
    }
}

export async function savePostts(req) {
    try {
        var data = {
            title: req.body.title,
            presentation: '/uploads/'+req.files.presentation[0].filename,
            content: [],
        }
        Object.keys(req.body).forEach(key => {
            (key !== 'title') ? data.content[Number(key.split('_')[1])] = { tipo: key.split('_')[0], value: req.body[key] } : '';
        });
        if(req.files.image){
            req.files.image.forEach(file =>{
                var sinExt = file.originalname.split('_')[1];
                var ind = Number(sinExt.split('.')[0]);
                data.content[ind] = {tipo: 'image', value: '/uploads/'+ file.filename};
            })
            for(var i = 0; i < data.content.length; i++){
                if(data.content[i].tipo === 'image'){
                    data.content[i].valuef = data.content[i+1].value;
                    data.content[i].valuet = data.content[i+2].value;
                    data.content.splice((i+1),2)
                }
            }
        }
        return await savePost(data)
    } catch (error) {
        console.log(error)
    }
}

export async function updatePostts(req) {
    try {
        var present = null;
        (req.files.presentation) ? present = '/uploads/'+req.files.presentation[0].filename : present = req.body.presentation;
        var data = {
            title: req.body.title,
            presentation: present,
            content: [],
        }
        Object.keys(req.body).forEach(key => {
            (key !== 'title' && key !== 'presentation') ? data.content[Number(key.split('_')[1])] = { tipo: key.split('_')[0], value: req.body[key] } : '';
        });
        if(req.files.image){
            req.files.image.forEach(file =>{
                var sinExt = file.originalname.split('_')[1];
                var ind = Number(sinExt.split('.')[0]);
                data.content[ind] = {tipo: 'imagee', value: '/uploads/'+ file.filename};
            })
            for(var i = 0; i < data.content.length; i++){
                if(data.content[i].tipo === 'imagee'){
                    data.content[i].tipo = 'image';
                    data.content[i].valuef = data.content[i+1].value;
                    data.content[i].valuet = data.content[i+2].value;
                    data.content.splice((i+1),2)
                }
            }
        }

        const neww = {id: req.query.id, valores: data}
        return await updatePost(neww);
    } catch (error) {
        console.log(error)
    }
}

export async function deletePostts(req) {
    try {
        await eliminarImgDel(req.id);
        await deletePost(req.id);
    } catch (error) {
        console.log(error)
    }
}

const eliminarImgDel = async (id) =>{
    try {
        const postt = await getPost(id);
        fs.unlinkSync('./public/'+postt.presentation)
        postt.content.forEach((post) => {
            (post.tipo === 'image') ? fs.unlinkSync('./public/'+post.value) : '';
        });
    } catch (error) {
        console.log(error)
    }
}

export async function deleteIMGPostts(req) {
    try {
        const postt = await getPost(req.id);
        if(req.ps === 's'){
            fs.unlinkSync('./public/'+postt.presentation)
        }
        if(req.conte.length > 0){
            req.conte.forEach((item) =>{
                (postt.content[Number(item)].tipo === 'image') ? fs.unlinkSync('./public/'+postt.content[item].value) : '';
            });
        }
    } catch (error) {
        console.log(error)
    }
}
