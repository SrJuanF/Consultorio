import { getCitat, getCitats, saveCitats, updateCitats, deleteCitats, acommCitats } from '../services/citas.js'
import { OwSan } from '../../config.js'
export const Cita = async (req, res) => {
    try {
        const cita = await getCitat(req);
        res.status(200).json({ status: true, data: cita })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const Citas = async (req, res) => {
    try {
        console.log(req.user.correoIn)
        /*
        if(req.user === OwSan){

        }else{
            res.status(401).json({status:false, message: 'Invalid User'})
        }*/
        const citas = await getCitats();
        res.status(200).json({ status: true, data: citas })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const saveCitas = async (req, res) => {
    try {
        const newCitta = await saveCitats(req.body);
        return res.status(200).json({ status: true, cita: newCitta})
    } catch (error) {
        return res.status(500).json({status:false, errors:[error]})
    }
}

export const updateCitas = async (req, res) => {
    try {
        /*
        if(req.user === OwSan){

        }else{
            res.status(401).json({status:false, message: 'Invalid User'})
        }*/

        await updateCitats(req);
        res.status(200).json({ status: true})
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const deleteCitas = async (req, res) => {
    try {
        await deleteCitats(req.body);
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const AcomCitas = async (req, res) => {
    try {
        const valid = await acommCitats(req.body);
        res.status(200).json({ status: true, data: valid })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}
