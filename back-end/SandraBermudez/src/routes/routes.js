import {Router} from 'express'
import {logInController, rutaManageProtegida, verifyToken} from '../controllers/controllerLogIn.js'
import {subirImagen, manejarErroresMulter} from '../middleware/Storage.js'
import {Users, saveUsers, updateUsers, deleteUsers} from '../controllers/controllerUsers.js'
import {Comments, saveComments, updateComments, deleteComments} from '../controllers/controllerComments.js'
import {Cita, Citas, saveCitas, updateCitas, deleteCitas, AcomCitas} from '../controllers/controllerCitas.js'
import {Posts, savePosts, updatePosts, deletePosts, deleteIMGPosts} from '../controllers/controllerPosts.js'
import {Services, saveServices, updateServices, deleteServices, deleteIMGServices} from '../controllers/controllerServices.js'
import {Contact, Payments} from '../controllers/controllerContact_Payments.js'

const router = Router()

router.post('/login', logInController)
router.post('/contact', Contact)
router.post('/manage/payment', verifyToken, Payments)
router.get('/success', (req,send) => {
    send('Success')
});
router.get('/failure', (req,send) => {
    send('Failure')
});
router.get('/pending', (req,send) => {
    send('Pending')
});

router.get('/users', verifyToken, Users)
router.post('/userup', subirImagen, manejarErroresMulter, saveUsers)
router.put('/updateuser', verifyToken, subirImagen, manejarErroresMulter, updateUsers)
router.delete('/deleteuser', verifyToken, deleteUsers)

router.get('/comments', verifyToken, Comments)
router.post('/commentup', verifyToken, saveComments)
router.put('/updatecomment', verifyToken, updateComments)
router.delete('/deletecomment', verifyToken, deleteComments)

router.get('/manage', verifyToken, rutaManageProtegida)

router.get('/cita', verifyToken, Cita)
router.post('/ucita', AcomCitas)
router.get('/manage/citas', verifyToken, Citas)
router.post('/citaup', saveCitas)
router.put('/manage/updatecita', verifyToken, updateCitas)
router.delete('/deletecita', verifyToken, deleteCitas)

router.get('/posts', Posts)
router.post('/manage/postup', verifyToken, subirImagen, manejarErroresMulter, savePosts)
router.put('/manage/updatepost', verifyToken, subirImagen, manejarErroresMulter, updatePosts)
router.delete('/manage/deletepost', verifyToken, deletePosts)
router.delete('/manage/deleteimgpost', verifyToken, deleteIMGPosts)

router.get('/services', Services)
router.post('/manage/serviceup', verifyToken, subirImagen, manejarErroresMulter, saveServices)
router.put('/manage/updateservice', verifyToken, subirImagen, manejarErroresMulter, updateServices)
router.delete('/manage/deleteservice', verifyToken, deleteServices)
router.delete('/manage/deleteimgservice', verifyToken, deleteIMGServices)

export default router