import { getService, getServices, saveService, updateService, deleteService} from '../database/Services.js'
import {AMN} from '../../config.js'
import * as fs from 'fs'

export async function getServicets(req) {
    try {
        if(AMN === req){
            const services = await getServices();
            return services
        }
        return [];
    } catch (error) {
        console.log(error)
    }

}

export async function saveServicets(req) {
    try {
        /*transformaciones*/
        var data = {
            title: req.body.title,
            presentation: '/uploads/'+req.files.presentation[0].filename,
            description: req.body.description,
            content: [],
        }
        Object.keys(req.body).forEach(key => {
            (key !== 'title' && key !== 'description') ? data.content[Number(key.split('_')[1])] = { tipo: key.split('_')[0], value: req.body[key] } : '';
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
        return await saveService(data)
    } catch (error) {
        console.log(error)
    }
}

export async function updateServicets(req) {
    try {
        var present = null;
        (req.files.presentation) ? present = '/uploads/'+req.files.presentation[0].filename : present = req.body.presentation;
        var data = {
            title: req.body.title,
            presentation: present,
            description: req.body.description,
            content: [],
        }
        Object.keys(req.body).forEach(key => {
            (key !== 'title' && key !== 'presentation' && key !== 'description') ? data.content[Number(key.split('_')[1])] = { tipo: key.split('_')[0], value: req.body[key] } : '';
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
        return await updateService(neww);

    } catch (error) {
        console.log(error)
    }
}

export async function deleteServicets(req) {
    try {
        await eliminarImgDel(req.id);
        await deleteService(req.id);
    } catch (error) {
        console.log(error)
    }
}

const eliminarImgDel = async (id) =>{
    try {
        const servvice = await getService(id);
        fs.unlinkSync('./public/'+servvice.presentation)
        servvice.content.forEach((service) => {
            (service.tipo === 'image') ? fs.unlinkSync('./public/'+service.value) : '';
        });
    } catch (error) {
        console.log(error)
    }
}

export async function deleteIMGServicets(req) {
    try {
        const servvice = await getService(req.id);
        if(req.ps === 's'){
            fs.unlinkSync('./public/'+servvice.presentation)
        }
        if(req.conte.length > 0){
            req.conte.forEach((item) =>{
                (servvice.content[Number(item)].tipo === 'image') ? fs.unlinkSync('./public/'+servvice.content[item].value) : '';
            });
        }
    } catch (error) {
        console.log(error)
    }
}
