import {iniciarConversacionConIdea} from './MortiUndRickController.js'
const enviarPrimerprom = async  (req,res) => {
   

try {
    const idea = req.body.idea
    const conversacion = await iniciarConversacionConIdea(idea)
  
    res.json({conversacion})
} catch (error) {
    res.status(500).json({ error: error.message });

}

}

export {

    enviarPrimerprom

}