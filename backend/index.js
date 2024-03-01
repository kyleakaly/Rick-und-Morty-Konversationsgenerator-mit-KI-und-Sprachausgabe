import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import primerpromt from './routers/EnvioPromInicialRouter.js'
import MortiUndRickRouters from './routers/MortiUndRickRouters.js'
import path from 'path';
import url from 'url';


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();

app.use(express.json())
dotenv.config()


const dominiosPermitidos = ['http://127.0.0.1:5173/']

const corsOptions = {

    origin: (origin,callback)=>{

        if(dominiosPermitidos.indexOf(origin) !== -1){

            callback(null,true)

        }else{

            callback(new Error('no Permitido por cors - von cors nicht erlaubt'))

        }

    }

}

app.use(cors({
    origin: 'http://localhost:5173'
}))

// Sirve archivos estáticos del directorio 'audio'
app.use('/audio', express.static(path.join(__dirname, 'audio')));

app.use('/api/primerpromt',primerpromt)
app.use('/api/mortyundrick',MortiUndRickRouters)

const PORT = process.env.PORT || 4000 ;

app.listen(PORT,()=>{
    console.log('servidor funcionando en el puerto ' + PORT)
})

