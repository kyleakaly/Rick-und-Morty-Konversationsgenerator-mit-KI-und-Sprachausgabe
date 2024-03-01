<script>
    import {obtenerConversacionCompleta} from './MortyundRickApi'
    import imagenrick from '../img/rick.png'
    import morty from '../img/morty.png'
    import logo from '../img/Rick-and-Morty-768x432.png'
  import { onDestroy } from 'svelte';


    let idea = '';
    let conversacion = [];
let cargando = false; // Nuevo estado para el preloader
let indiceAudioActual = 0;
let imagenRick;
let imagenMorty;

    

    let musicaDeFondo;
    let estaReproduciendo = false;

    function toggleMusica() {
        if (!musicaDeFondo) {
            musicaDeFondo = new Audio('../../public/ricksonido.mp3');
            musicaDeFondo.volume = 0.2; // Establece el volumen al 20%
        }

        if (estaReproduciendo) {
            musicaDeFondo.pause();
        } else {
            musicaDeFondo.play().catch(e => console.error("Error al reproducir la música:", e));
        }

        estaReproduciendo = !estaReproduciendo;
    }

    onDestroy(() => {
        if (musicaDeFondo) {
            musicaDeFondo.pause();
            musicaDeFondo = null;
        }
    });

    const enviarIdea = async () => {
        cargando = true; // Activa el preloader
        try {
            const response = await fetch('http://localhost:4000/api/primerpromt/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idea})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await cargarConversacion();
        } catch (error) {
            console.error(`Error al enviar la idea: ${error}`);
        }finally{

            cargando = false; // Desactiva el preloader

        }
    };

    async function reproducirSiguienteAudio() {
    if (indiceAudioActual < conversacion.length) {
        const dialogo = conversacion[indiceAudioActual];
        const audio = new Audio(dialogo.audioUrl);

        // Agrega la animación a la imagen correspondiente
        if (dialogo.personaje === 'Rick') {
            imagenRick.classList.add('hablando');
            imagenMorty.classList.remove('hablando');
        } else {
            imagenMorty.classList.add('hablando');
            imagenRick.classList.remove('hablando');
        }

        try {
            await audio.play();
            const elementoP = document.getElementById(`dialogo-${indiceAudioActual}`);
        if (elementoP) {
            // Limpia el contenido anterior
            elementoP.innerHTML = '';

            // Crea los elementos strong y span
            const elementoStrong = document.createElement('strong');
            elementoStrong.style.color = dialogo.personaje === 'Rick' ? '#b2df2a' : '#02b5cc';
            elementoStrong.textContent = dialogo.personaje + ': ';
            const elementoSpan = document.createElement('span');

            // Añade los elementos al DOM
            elementoP.appendChild(elementoStrong);
            elementoP.appendChild(elementoSpan);

            // Muestra el texto palabra por palabra
            mostrarTextoPalabraPorPalabra(dialogo.texto, elementoSpan);
        }
    } catch (e) {
        console.error("Error al reproducir el audio:", e);
    }

        audio.onended = () => {
            indiceAudioActual++;
            reproducirSiguienteAudio();
        };
    }
}

    const cargarConversacion = async () => {
        cargando = true;
        try {
            const respuesta = await obtenerConversacionCompleta();
            if (respuesta && respuesta.conversacion) {
                conversacion = respuesta.conversacion;
                indiceAudioActual = 0;
                reproducirSiguienteAudio();
            }
        } finally {
            cargando = false;
        }
    };

    function mostrarTextoPalabraPorPalabra(texto, elementoSpan) {
    const palabras = texto.split(" ");
    let i = 0;

    function anadirPalabra() {
        if (i < palabras.length) {
            elementoSpan.textContent += palabras[i] + " ";
            i++;
            setTimeout(anadirPalabra, 420); // Ajusta el tiempo según la velocidad deseada
        }
    }

    anadirPalabra();
}




</script>
<header>
   <a href="/" on:click|preventDefault={toggleMusica}><img  class="header-img" src={logo} alt="logo" /></a> 
</header>
<div class="encerrartodo">

    <form on:submit|preventDefault={enviarIdea}>
        <input type="text" bind:value={idea} placeholder="Escribe tu idea aquí" />
        <button type="submit">Enviar Idea</button>
    </form>
    
    <div class="container-conversacion">
        
        <h1>Conversación De Rick and Morty</h1>
        <div class="conversacioncontainertexto">
       
            {#if cargando}
            <div class="lds-facebook">
                <div></div><div></div><div></div>
            </div>
        {:else}
        {#each conversacion as dialogo, index (dialogo)}
        <div class="dialogo">
            <p class="conversaciontexto" id={`dialogo-${index}`}></p>
        </div>
    {/each}
        {/if}
        </div>
       
    </div>




    <div class="imagenesrickandmorty">
        <img class="imagen1" bind:this={imagenRick} src={imagenrick} alt="rick">
<img class="imagen2" bind:this={imagenMorty} src={morty} alt="morty">
    </div>

   <p style="color:black;">{estaReproduciendo ? 'Pausar Música' : 'Reproducir Música'}</p> 
</div>


