import { logIn } from '../services/logIn.js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY, OwSan } from '../../config.js'

// Middleware para verificar el token en las rutas protegidas
export function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
}
export const rutaManageProtegida = async (req, res) => {
    //  Especificar que sea Sandra
    if(req.user === OwSan){
        res.json({ message: 'Acceso permitido', user: req.user });
    }else{
        res.status(401).json({ message: 'Usuario Restringido' });
    }
    
}
export const logInController = async (req, res) => {
    const token = await logIn(req);
    (token === null) ? res.status(401).json({ message: 'Credenciales incorrectas' }) : res.header('auth-token', token).json({ token, expiration: Date.now() + 3 * 60 * 60 * 1000});
}


