// Importar todo de interfaz
import * as UI from './interfaz.js';

export default class API {
    constructor(artista, cancion) {
        this.artista = artista;
        this.cancion = cancion;
    }
    consultarAPI() {
        console.log('Desde consultar API');
        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

        fetch(url)
            .then( respuesta => respuesta.json() )
            .then( resultado => {
                console.log(resultado)// obtiene la canción de lyrics
                
                // destructuring. ver el objeto en chrome o en la API de lyrics
                const { lyrics, error} = resultado;

                if (resultado.lyrics) {
                    
                    UI.divResultado.textContent = lyrics;
                    UI.headingResultado.textContent = `Letra de la canción: ${this.cancion} de ${this.artista}`;                    
                } else {
                    UI.divMensajes.textContent = error;
                    UI.divMensajes.classList.add('error');
                    // UI.divMensajes.textContent = 'La canción no existe, prueba con otra búsqueda';
                    // UI.divMensajes.classList.add('error');

                    setTimeout(() => {
                        UI.divMensajes.textContent = '';
                    UI.divMensajes.classList.remove('error');
                    }, 3000);
                }
               
            })

    }
}