import express from 'express'
import {obtenerUltimaConversacion} from '../controllers/MortiUndRickController.js'


const router = express.Router();

router.get('/backend',obtenerUltimaConversacion);




export default router