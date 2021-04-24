# JS37ProyectoBuscadorCancionesFetchAPI
37. PROYECTO Buscador de Canciones con Fetch API

api.js
```javascript
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
```
app.js
```javascript
// 37. PROYECTO Buscador de Canciones con Fetch API
// usando modulos import export

// Interfaz exporta 5 elementos. Con esto importa toda la Interfaz. y todo tendrá el alias de UI
import * as UI from './interfaz.js';
console.log(UI);//Ver todo los elementos importados de Interfaz

// Pasa el constructor con artista y cancion 
import API from './api.js';

UI.formularioBuscar.addEventListener('submit', buscarCancion);

function buscarCancion(e) {
    e.preventDefault();

    // Obtener datos del formulario
    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;

    // Validar que no esten vacios
    if(artista === '' || cancion === '') {
        // algún campo vacio, mostrar error
        UI.divMensajes.textContent = 'Error... Todos los campos son obligatorios';
        UI.divMensajes.classList.add('error');

        setTimeout(() => {
            UI.divMensajes.textContent = '';
            UI.divMensajes.classList.remove('error');
        }, 3000);
        return; // para detener la función
    }

    // Si pasa la validación. Consultar nuestra API
    const busqueda = new API(artista, cancion);
    console.log(busqueda);//Se obtiene artista y canción
    busqueda.consultarAPI();
}
```
interfaz.js

```javascript
// Selectores
export const formularioBuscar = document.querySelector('#formulario-buscar');
export const divBuscar = document.querySelector('#buscar');
// Algunas alertas de error
export const divMensajes = document.querySelector('#mensajes');
// Colocar la letra de la canción
export const divResultado = document.querySelector('#resultado');
//Colocar el nombre de la canción
export const headingResultado = document.querySelector('.letra-resultado h2');
```
