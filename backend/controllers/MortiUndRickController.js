import OpenAI from 'openai';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.API_KEY_OPEN_AI ,
    // organization: "org-V8EpZwH0J3wNFYhXi1qxua1w",
});

let ultimaConversacion = [];

const MAX_PROMPT_LENGTH = 10000; // Ajusta este valor según tus necesidades

const cache = new Map();

const obtenerRespuestaDeCache = (prompt) => {
    return cache.get(prompt);
};

const guardarRespuestaEnCache = (prompt, respuesta) => {
    cache.set(prompt, respuesta);
};

const truncarPrompt = (prompt) => {
    return prompt.length > MAX_PROMPT_LENGTH ? prompt.substring(0, MAX_PROMPT_LENGTH) : prompt;
};

const obtenerUltimaConversacion = async (req, res) => {
    res.json({ conversacion: ultimaConversacion });
}

  const iniciarConversacionConIdea = async (idea) => {
     let conversacion = [];
     const vozRick = 'NPXcS7Rsv3OM5a15fvZA';
      const vozMorty = '1MlxHq0rJsl66nBRwBgq';

      // Generar y añadir la respuesta de Rick
     let promptRick = truncarPrompt(`Rick dice: 'Morty, necesitamos ${idea} ahora mismo porque...' instrucciones  = todo el texto en menos 100 tokens de la api de chatgpt, y terminar con una conclusion clara y en un tono muy sarcastico chistoso y seguro tambien quiero que en la respuesta
     de chatgpt empieze con morty necesitamos ${idea} ahora mismo porque y continuar con lo que cree chatgpt ' personalidad de rick:Genio Científico,Nihilista,Cínico y Sarcastico,Emocionalmente Distantes,Problemas con el Alcohol. nivel de comedia 100% y sarcasmo un 80% y grosero con morty y en el idioma mas chistoso del mundo`);
     let respuestaRick =  await escucharRespuesta(promptRick);
     let audioRick = await convertirTextoAVoz(respuestaRick, vozRick);
      conversacion.push({ personaje: 'Rick', texto: respuestaRick,audioUrl: audioRick });

      // Generar y añadir la respuesta de Morty
      let promptMorty = truncarPrompt(`Morty analiza la propuesta de Rick: "${respuestaRick}" y luego Morty responde: 'Oh, hombre, Rick, ¿por qué siempre tenemos que... contianuar respuesta pero aceptandola de todos modos pero de mala manera' instrucciones = todo el texto en  menos 100 tokens de la api de chatgpt y terminar con una conclusion clara y con un tono muy inseguro   personalidad de morty: Inseguro y Nervioso,Moralmente Consciente,Crecimiento y Desarrollo,Leal y Cuidadoso,Curioso y Aventurero`);
      let respuestaMorty = await escucharRespuesta(promptMorty);
      let audioMorty = await convertirTextoAVoz(respuestaMorty, vozMorty);
      conversacion.push({ personaje: 'Morty', texto: respuestaMorty , audioUrl: audioMorty });

       // Generar y añadir una segunda respuesta de Rick
     let segundoPromptRick = truncarPrompt(`Rick después de escuchar la respuesta de morty='${respuestaMorty}' le dice a morty respuesta....' instrucciones = quiero que esta interaccion sea una respuesta de rick  que anterior mente dijo morty y todo el texto sea en menos de 100 tokens de la api de chatgpt y terminar con una conclusion clara en un tono agresivo comico insultando a morty por no querer seguir su idea personalidad de rick:Genio Científico,Nihilista,Cínico y Sarcastico,Emocionalmente Distantes,Problemas con el Alcohol. nivel de comedia 60%`);
     let segundaRespuestaRick = await escucharRespuesta(segundoPromptRick);
      let audioRick2 = await convertirTextoAVoz(segundaRespuestaRick, vozRick);

     conversacion.push({ personaje: 'Rick', texto: segundaRespuestaRick,audioUrl: audioRick2 });
      ultimaConversacion = conversacion

      return conversacion;
  };

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Crea un Map para almacenar las relaciones entre prompts y URLs de audio
const audioCache = new Map();

 async function convertirTextoAVoz(texto, vozId) {

    // Clave única para la caché
    const cacheKey = texto + '-' + vozId;
    if (audioCache.has(cacheKey)) {
        return audioCache.get(cacheKey);
    }
    const apiKey = process.env.KEY_ELEVENLABS  // Tu clave API
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${vozId}`; // URL con el model_id

    const options = {
        method: 'POST',
        headers: {
            'xi-api-key': apiKey,
            'Content-Type': 'application/json',
           
        },
        body: JSON.stringify({
            model_id: 'eleven_multilingual_v1',
            text: texto,
            voice_settings: {
                // Configura estos valores según tus necesidades
                similarity_boost: 0.5,
                stability: 0.75,
                style: 0.5,
                use_speaker_boost: true
            }
        })
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

        // Genera un nombre de archivo único para el archivo de audio
        
        const audioFileName = `audio-${Date.now()}.mp3`;
        const audioFilePath = path.join(__dirname, '..', 'audio', audioFileName);

        // Escribe el buffer en un archivo
        fs.writeFileSync(audioFilePath, buffer);

        const audioUrl = `http://localhost:4000/audio/${audioFileName}`;

        // Devuelve la ruta del archivo guardado
        audioCache.set(cacheKey, audioUrl);
        return audioUrl;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


const escucharRespuesta = async (promptInicial) => {


    try {
        let respuesta = obtenerRespuestaDeCache(promptInicial);
        if (respuesta) {
            return respuesta;
        }

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: promptInicial }],
            model: 'gpt-3.5-turbo',
            temperature: 0,
      max_tokens: 100
        });

        respuesta = chatCompletion.choices[0].message.content;
        guardarRespuestaEnCache(promptInicial, respuesta);
        return respuesta;
    } catch (error) {
        console.error("Error al obtener respuesta de OpenAI:", error);
        throw error;
    }
};


export {
    iniciarConversacionConIdea,
    obtenerUltimaConversacion
}
