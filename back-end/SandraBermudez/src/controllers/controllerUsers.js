import { getUsser, saveUssers, updateUssers, deleteUssers} from '../services/users.js'

export const Users = async (req, res) => {
    try {
        const user = await getUsser(req);
        if(user){
            res.status(200).json({ status: true, data: user })
        }
        else{
            res.status(500).json({ status: false, data: {} })
        }
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const saveUsers = async (req, res) => {
    try {
        const Us = await saveUssers(req);
        return res.status(200).json({ status: true, user: Us})
    } catch (error) {
        return res.status(500).json({status:false, errors:[error]})
    }
}

export const updateUsers = async (req, res) => {
    try {
        const user = await updateUssers(req);
        res.status(200).json({ status: true, data: user })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}

export const deleteUsers = async (req, res) => {
    try {
        await deleteUssers(req);
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).json({status:false, errors:[error]})
    }
}