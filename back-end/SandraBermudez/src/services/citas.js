import { getCita, getCitas, saveCita, updateCita, deleteCita, getTimes} from '../database/Citas.js'
import {getUser} from '../database/Users.js'

export async function getCitat(req) {
    try {
        const id  = req.query.id;
        const cita = await getCita(id);
        return cita
    } catch (error) {
        console.log(error)
    }

}

export async function getCitats() {
    try {
        const citas = await getCitas();
        return citas
    } catch (error) {
        console.log(error)
    }

}

export async function saveCitats(req) {
    try {
        const user = await getUser(req.email);
        if(user){
            const data = {
                iduser: user._id,
                title: req.title,
                email: req.email,
                modalidad: req.modalidad.toLowerCase(),
                description: req.description,
                start: req.start,
                end: req.end
            }
            const newCitta = await saveCita(data)
            return newCitta
            return ''
        }
        return 'n'
    } catch (error) {
        console.log(error)
    }
}

export async function updateCitats(req) {
    try {
        const id = req.body._id;
        const data = {id: id, valores: req.body};
        await updateCita(data);
    } catch (error) {
        console.log(error)
    }
}

export async function deleteCitats(req) {
    try {
        const id  = req.id;
        await deleteCita(id);
    } catch (error) {
        console.log(error)
    }
}

export async function acommCitats(req) {
    try {
        const user = await getUser(req.email);
        if(user){
            const times = await getTimes(req.datte);
            var hours = ['06:00', '07:00','08:00','09:00','10:00','11:00','12:00','14:00','15:00','16:00']
            if(times.length > 0){
                console.log(times)
                times.forEach((time) =>{
                    var ini = time.start.split('T')[1];
                    var fin = time.end.split('T')[1];
                    (Number(fin.split(':')[1]) > 30) ? fin = String(Number(fin.split(':')[0]) + 1) + ":00": fin = fin.split(':')[0] + ":00";
                    
                    var indexHoraIni= hours.indexOf(ini);
                    var indexHoraFin = hours.indexOf(fin);
                    (indexHoraFin) ? hours.splice(indexHoraIni, indexHoraFin - indexHoraIni) : hours.splice(indexHoraIni, 1);
                });
                if(hours.length > 0){
                    return hours;
                }
                return 'nd'
            }
            return hours;
        }
        return 'n';
    } catch (error) {
        console.log(error)
    }
}