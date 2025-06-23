import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;

export const HOST = `http://localhost:${PORT}`;

export const URI = process.env.MONGODB_URI;

export const SECRET_KEY = process.env.TOKEN_KEY;

export const OwSan = process.env.OwS;

export const AMN = process.env.AM;

export const MERCADOPAGO_TOKEN = process.env.MERCADOPAGO_KEY;
