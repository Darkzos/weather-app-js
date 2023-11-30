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
            mostrarImagen(ciudad);
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

function mostrarImagen(ciudad) {
    const divDatosClima = document.getElementById('datosClima');

    // Obtener la URL de la imagen de acuerdo a la ciudad
    const ciudadLower = ciudad.toLowerCase();
    let photoUrl = `images/${ciudadLower}.jpg`;

    // Verificar si la imagen existe
    const img = new Image();
    img.src = photoUrl;

    img.onload = function () {
        // Mostrar la imagen en el elemento HTML
        const imagenCiudad = document.createElement('img');
        imagenCiudad.src = photoUrl;
        imagenCiudad.alt = 'Imagen de la Ciudad';

        // Aplicar estilos CSS para controlar el tamaño de la imagen
        imagenCiudad.style.maxWidth = '100%';
        imagenCiudad.style.height = '250px';

        // Agregar la imagen al div correspondiente en el HTML
        divDatosClima.appendChild(imagenCiudad);
    };

    img.onerror = function () {
        console.log(`No se encontró una imagen para ${ciudad}`);
    };
}

