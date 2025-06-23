import mercadopago from "mercadopago";
import { HOST, MERCADOPAGO_TOKEN } from '../../config.js';
import {insertPayment, deletePending, insertPending} from '../database/Payments.js'

export const crearPayment = async (req) => {
    try {
        mercadopago.configure({
            access_token: MERCADOPAGO_TOKEN,
        });
        const result = await mercadopago.preferences.create({
            items: [
                {
                    id: 1,
                    title: "Odontología Sandra Bermudez",
                    unit_price: Number(req.price),
                    currency_id: "COP",
                    quantity: 1,
                }
            ],
            back_urls: {
                success: `${HOST}/success`,
                failure: `${HOST}/failure`,
                pending: `${HOST}/pending`,
            },
            payer:{
                phone: {number: Number(req.number)},
                email: req.email,
                name: req.name
            },
            
            notification_url: "https://1cfb-2800-e2-b480-5b3-acde-3a1e-ae98-6a55.ngrok.io/webhook",
        })
        return result.body;
    } catch (error) {
        console.log(error)
    }
}
export const registerPayment = async (req) => {
    await insertPayment(req);
    await deletePending(req.id);
}
export const registerPaymentWait = async (req) => {
    await insertPending(req);
}