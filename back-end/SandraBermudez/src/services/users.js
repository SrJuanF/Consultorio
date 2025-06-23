import { getUser, saveUser, updateUser, deleteUser} from '../database/Users.js'
import * as fs from 'fs'

export async function getUsser(req) {
    try {
        const email  = req.user.correoIn;
        const user = await getUser(email);
        return user
    } catch (error) {
        console.log(error)
    }

}

export async function saveUssers(req) {
    try {
        const {name, email} = req.body;
        const user = await getUser(email);
        if(user){
            await eliminarImg(email);
            return 'exis';
        }else{
            const validattion = validarUser(name, email, req.files.image[0], 'Y')
            if(validattion.length === 0){
                await saveUser(req)
                return email;
            }
            return null;
        }
        
    } catch (error) {
        console.log(error)
    }
}

export async function updateUssers(req) {
    try {
        const id = req.query.id;
        const {nombre, correo} = req.body;
        let valores = {};
        var validattion = [];
        if(req.files.image){
            let imagen = '/uploads/'+req.files.image[0].filename;
            valores = {nombre: nombre, correo: correo, imagen: imagen};
            await eliminarImg(correo);
            validattion = validarUser(nombre, correo, req.files.image[0], 'Y')
        }else{
            valores = {...req.body};
            validattion = validarUser(nombre, correo);
        }

        if(validattion.length === 0){
            const data = {id: id, valores: valores};
            const user = await updateUser(data)
            return user
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteUssers(req) {
    try {
        const id  = req.query.id;
        await deleteUser(id);
        await eliminarImg(id);
    } catch (error) {
        console.log(error)
    }
}

const validarUser = (nombre, correo, imagen, sevalida) => {
    var errors = [];
    var correoValido = /\S+@\S+\.\S+/;
    if(nombre === ''){
        errors.push('El Nombre No Debe Estar Vacío')
    }
    if (!correoValido.test(correo)) {
        errors.push('Ingrese un Correo Válido')
    }
    if(sevalida === 'Y' && imagen === undefined){
        errors.push('Seleccione una Imagen en Formato jpg, jpeg o png')
    }
    else{
        if(errors.length > 0){
            fs.unlinkSync('./public/uploads/'+imagen.filename)
        }
    }
    return errors
}

const eliminarImg = async (email) =>{
    try {
        const user = await getUser(email);
        const img = user.imagen;
        fs.unlinkSync('./public/'+img)
    } catch (error) {
        console.log(error)
    }
}
