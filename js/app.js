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