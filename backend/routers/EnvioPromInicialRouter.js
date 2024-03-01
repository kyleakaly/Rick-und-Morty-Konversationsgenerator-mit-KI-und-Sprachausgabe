import express from 'express'
import {enviarPrimerprom} from '../controllers/EnvioPromtIniciaController.js'


const router = express.Router()

router.post('/',enviarPrimerprom);


export default router