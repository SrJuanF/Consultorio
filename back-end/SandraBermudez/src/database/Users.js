import UsersModel from './models/users.js'
import {OwSan} from '../../config.js'
import {encrypt} from '../services/handleBcrypt.js'

export const getUser = async (email) => {
    try {
        const user = await UsersModel.findOne({ correo: email });
        return user
    } catch (error) {
        console.log(error)
    }
}
export const saveUser = async (req) => {
    try {
        var newUser = '';
        if(OwSan === req.body.email){
            const pass = await encrypt('3HenAnosViajancOn50piCos');
            newUser = new UsersModel({
                nombre: req.body.name,
                correo: req.body.email,
                imagen: '/uploads/'+req.files.image[0].filename,
                password: pass
            });
        }
        else{
            newUser = new UsersModel({
                nombre: req.body.name,
                correo: req.body.email,
                imagen: '/uploads/'+req.files.image[0].filename
            });
        }
        
        await newUser.save();
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (req) => {
    try {
        const user = await UsersModel.findOneAndUpdate({ _id: req.id }, {$set:req.valores},{ new: true });
        return user;  
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (id) => {
    try {
        await UsersModel.findOneAndDelete({ _id: req });
        console.log('User Delete')
    } catch (error) {
        console.log(error)
    }
}