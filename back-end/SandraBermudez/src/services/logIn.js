import jwt from 'jsonwebtoken'
import {SECRET_KEY, OwSan} from '../../config.js'
import { getUser} from '../database/Users.js'
import {compare} from './handleBcrypt.js'

export async function logIn(req) {
    try {
        const {correoIn, jtgd } = req.body;
        // Validar base de datos
        const user = await getUser(correoIn);
        var token = null;
        if (user) {
            if(OwSan === correoIn){
                const checkPass = await compare(jtgd, user.password)
                if(checkPass){
                    // Generar el token JWT
                    token = jwt.sign({ correoIn }, SECRET_KEY, { expiresIn: '3h' });
                }
            }else{
                token = jwt.sign({ correoIn }, SECRET_KEY, { expiresIn: '3h' });
            }
        }
        return token;
    } catch (error) {
        console.log(error);
    }
}