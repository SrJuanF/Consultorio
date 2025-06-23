import Payment from './models/payment.js';
import Pending from './models/paymentwait.js';

export const insertPayment = async (req) => {
    try {
        const newPayment = new Payment({
            id: req.id,
            ...req
        });
        await newPayment.save();
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.id === 1) {
            console.error('Clave Repetida');
        }
        else{
            console.log(error);
        }
    }
};
export const insertPending = async (req) => {
    try {
        const newPending = new Pending({
            id: req.id,
            ...req
        });
        await newPending.save();
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.id === 1) {
            console.error('Clave Repetida');
        }
        else{
            console.log(error);
        }
    }
};
export const deletePending = async (req) => {
    try {
        const elimino = await Pending.findOneAndDelete({id: req});
        /*if(!elimino){
            console.log('No existia')
        }*/
    }
    catch (error) {
        console.log(error);
    }
}