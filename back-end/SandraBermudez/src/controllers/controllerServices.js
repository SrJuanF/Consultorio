import { getServicets, saveServicets, updateServicets, deleteServicets, deleteIMGServicets } from '../services/services.js'

export const Services = async (req, res) => {
    try {
        const services = await getServicets(req.query.amen);
        res.status(200).json({ status: true, data: services })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const saveServices = async (req, res) => {
    try {
        /*
        if(req.user === OwSan){

        }else{
            res.status(401).json({status:false, message: 'Invalid User'})
        }*/
        const newServvice = await saveServicets(req);
        return res.status(200).json({ status: true, service: newServvice})
    } catch (error) {
        return res.status(500).json({status:false, errors:[error]})
    }
}

export const updateServices = async (req, res) => {
    try {
        /*
        if(req.user === OwSan){

        }else{
            res.status(401).json({status:false, message: 'Invalid User'})
        }*/
        const service = await updateServicets(req);
        res.status(200).json({ status: true, data: service })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const deleteServices = async (req, res) => {
    try {
        /*
        if(req.user === OwSan){

        }else{
            res.status(401).json({status:false, message: 'Invalid User'})
        }*/
        await deleteServicets(req.body);
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}
export const deleteIMGServices = async (req, res) => {
    try {
        /*
        if(req.user === OwSan){

        }else{
            res.status(401).json({status:false, message: 'Invalid User'})
        }*/
        await deleteIMGServicets(req.body);
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}