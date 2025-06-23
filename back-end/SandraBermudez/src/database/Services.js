import ServicesModel from './models/services.js'

export const getService = async (id) => {
    try {
        const service = await ServicesModel.findOne({ _id: id });
        return service
    } catch (error) {
        console.log(error)
    }
}

export const getServices = async () => {
    try {
        const services = await ServicesModel.find()
        return services
    } catch (error) {
        console.log(error)
    }
}
export const saveService = async (req) => {
    try {
        const newService = new ServicesModel({
            title: req.title,
            presentation: req.presentation,
            description: req.description,
            content: req.content
        });
        const neww = await newService.save();
        return neww;
    } catch (error) {
        console.log(error)
    }
}

export const updateService = async (req) => {
    try {
        const service = await ServicesModel.findOneAndUpdate({ _id: req.id }, {$set:req.valores},{ new: true });
        return service;
    } catch (error) {
        console.log(error)
    }
}

export const deleteService = async (id) => {
    try {
        await ServicesModel.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error)
    }
}