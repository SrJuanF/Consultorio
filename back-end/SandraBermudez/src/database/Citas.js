import CitasModel from './models/citas.js'

export const getCita = async (id) => {
    try {
        const fechaActual = new Date();
        const fechaInicioMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        const consulta = {$and: [{ start: { $gte: fechaInicioMesActual.toISOString() } },{ iduser: id }]};
        const cita = await CitasModel.find(consulta) // Pendientes del usuario
        return cita
    } catch (error) {
        console.log(error)
    }
}
export const getTimes = async (req) => {
    try {
         // Coincidencia exacta con la fechaString al inicio del campo end
        const dates = await CitasModel.find({$or: [ { end: { $regex: `^${req}` } }, { start: { $regex: `^${req}` } } ]});
        return dates
    } catch (error) {
        console.log(error)
    }
}
export const getCitas = async () => {
    try {
        const fechaActual = new Date();
        const fechaInicioMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        // Crear un objeto de consulta para buscar citas a partir de la fecha de inicio del mes actual
        const consulta = {start: { $gte: fechaInicioMesActual.toISOString() }};
        const citas = await CitasModel.find(consulta) 
        return citas
    } catch (error) {
        console.log(error)
    }
}
export const saveCita = async (req) => {
    try {
        const newCita = new CitasModel({...req});
        const savedCita = await newCita.save();
        return savedCita;
    } catch (error) {
        console.log(error)
    }
}

export const updateCita = async (req) => {
    try {
        await CitasModel.findOneAndUpdate({ _id: req.id }, {$set:req.valores});//{$set:req.valores},{ new: true } 
    } catch (error) {
        console.log(error)
    }
}

export const deleteCita = async (id) => {
    try {
        await CitasModel.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error)
    }
}