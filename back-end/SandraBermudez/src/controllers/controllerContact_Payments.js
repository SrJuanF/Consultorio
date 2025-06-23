import mercadopago from "mercadopago";
import {crearPayment, registerPayment, registerPaymentWait} from '../services/createPay.js'

export const Contact = async (req, res) => {
    try {
        //-----------------------------
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}
export const Payments = async (req, res) => {
    try {
        const payment = await crearPayment(req.body);
        res.status(200).json({ status: true, data: payment })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}
export const receiveWebhook = async (req, res) => {
    const payment = req.query;
    try {
        if (payment.type === "payment") {
            const data = await mercadopago.payment.findById(payment['data.id']);
            // Store in database
            if (data.response.status === 'approved') {
                await registerPayment(data.response);   
            }
            else if (data.response.status === 'in_process') {
                await registerPaymentWait(data.response);
            }
        }
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({ error: error.message });
    }
}