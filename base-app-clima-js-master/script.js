let api_key_openweathermap = '4775455acbac3640f659d2f9f12c8dd9';
let urlBaseOpenWeatherMap = 'https://api.openweathermap.org/data/2.5/weather';
let urlBaseTeleport = 'https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images';
const difKelvin = 273.15;

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value;
    if (ciudad) {
        fetchDatosClima(ciudad);
    }
});

function fetchDatosClima(ciudad) {
    fetch(`${urlBaseOpenWeatherMap}?q=${ciudad}&appid=${api_key_openweathermap}`)
        .then(data => data.json())
        .then(data => {
            mostrarDatosClima(data);
            obtenerFotoCiudad(ciudad);
        })
        .catch(error => {
            console.error('Error al obtener datos climáticos:', error);
        });
}

function mostrarDatosClima(data) {
    const divDatosClima = document.getElementById('datosClima');
    divDatosClima.innerHTML = '';

    const ciudadNombre = data.name;
    const paisNombre = data.sys.country;
    const temperatura = data.main.temp;
    const descripcion = data.weather[0].description;
    const humedad = data.main.humidity;
    const icono = data.weather[0].icon

    const ciudadTitulo = document.createElement('h2');
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`;

    const temperaturaInfo = document.createElement('p');
    temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura - difKelvin)}°C`;

    const humedadInfo = document.createElement('p');
    humedadInfo.textContent = `La humedad es: ${humedad}%`;

    const iconoInfo = document.createElement('img')
    iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`

    const descripcionInfo = document.createElement('p');
    descripcionInfo.textContent = `La descripción meteorológica es: ${descripcion}`;

    divDatosClima.appendChild(ciudadTitulo);
    divDatosClima.appendChild(temperaturaInfo);
    divDatosClima.appendChild(humedadInfo);
    divDatosClima.appendChild(iconoInfo)
    divDatosClima.appendChild(descripcionInfo);
    
}

function obtenerFotoCiudad(ciudad) {
    fetch(`${urlBaseTeleport}`)
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta completa de la API de Teleport:', data);

            // Verificar si se obtuvo alguna imagen
            if (data._embedded && data._embedded['ua:images'] && data._embedded['ua:images'].photos) {
                const photos = data._embedded['ua:images'].photos;

                // Verificar si hay fotos disponibles
                if (photos && photos.length > 0) {
                    let photoUrl = photos[0].image.web;
                    console.log(`URL de la foto para ${ciudad}:`, photoUrl);

                    // Mostrar la imagen en el elemento HTML
                    mostrarImagen(photoUrl);
                } else {
                    console.warn(`No se encontraron fotos para ${ciudad}.`);
                }
            } else {
                console.error(`No se encontraron fotos para ${ciudad}.`);
            }
        })
        .catch(error => {
            console.error(`Error al obtener fotos de ${ciudad}:`, error);
        });
}



function mostrarImagen(photoUrl) {
    // Mostrar la imagen en el elemento HTML
    const imagenCiudad = document.createElement('img');
    imagenCiudad.src = photoUrl;
    imagenCiudad.alt = 'Imagen de la Ciudad';
    
    // Agregar la imagen al div correspondiente en el HTML
    const divDatosClima = document.getElementById('datosClima');
    divDatosClima.appendChild(imagenCiudad);
}

