import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import Routes from './src/routes/routes.js'
import { PORT, URI } from './config.js'

// Conectar a MongoDB con Mongoose
mongoose.connect(URI)
    .then(() => {
        console.log('Conexión a la BD Exitosa');
    })
    .catch((err) => {
        console.error('Error de conexión a la base de datos:', err);
    });

var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb'}));
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(Routes);
app.use(express.static('public'));
app.listen(PORT);

console.log('Server on port', PORT);