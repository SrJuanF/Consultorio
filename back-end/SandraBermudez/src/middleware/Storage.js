import multer from 'multer'

const guardar = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'./public/uploads')
    },
    filename: (req,file,cb) => {
        if(file !== null){
            const ext = file.originalname.split('.').pop()
            cb(null,Date.now()+'.'+ext)
        }
    }
})

const filtro = (req,file,cb) => {
    if(file && (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/png')){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}

export const subirImagen = multer({storage: guardar, fileFilter: filtro}).fields([
    { name: 'image', maxCount: 20 }, // Para campos de imágenes con nombre 'imagen'
    { name: 'presentation', maxCount: 1 } // Para campos de presentación con nombre 'presentation'
]);

// Middleware para manejar errores
export const manejarErroresMulter = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ error: 'Error al subir la imagen', details: err.message });
    } else if (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    } else {
        next();
    }
};