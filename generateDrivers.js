const h3 = require('h3-js');

// Función para generar coordenadas aleatorias dentro de un rango
function getRandomCoordinate(min, max) {
  return Math.random() * (max - min) + min;
}

// Función para generar un color en escala de grises basado en la frecuencia
function getColorBasedOnFrequency(frequency) {
  const maxFrequency = 10; // Supongamos que 10 es la máxima frecuencia posible
  const intensity = Math.min(frequency / maxFrequency, 1); // Normaliza la frecuencia
  
  // Calcular el valor del gris
  const grayValue = Math.floor(255 * (1 - intensity)); // Menos intensidad, más claro el gris

  return `rgb(${grayValue}, ${grayValue}, ${grayValue})`; // Genera un color RGB en escala de grises
}

// Coordenadas aproximadas de los límites de São Paulo
const saoPauloBounds = {
  latMin: -24.008911, // Límite sur
  latMax: -23.357647, // Límite norte
  lngMin: -46.826759, // Límite oeste
  lngMax: -46.365052  // Límite este
};

// Generar 1000 conductores con ubicaciones aleatorias en São Paulo
const drivers = [];
for (let i = 0; i < 1000; i++) {
  const lat = getRandomCoordinate(saoPauloBounds.latMin, saoPauloBounds.latMax);
  const lng = getRandomCoordinate(saoPauloBounds.lngMin, saoPauloBounds.lngMax);
  
  // Generar la celda H3 central
  const centralH3Index = h3.geoToH3(lat, lng, 9);
  
  // Generar celdas adyacentes usando kRing, que da celdas cercanas o contiguas
  const numberOfRegions = Math.floor(Math.random() * 3) + 1; // 1 a 3 zonas
  const nearbyH3Indexes = h3.kRing(centralH3Index, numberOfRegions);

  const regions = nearbyH3Indexes.map(h3Index => {
    const frequency = Math.floor(Math.random() * 10) + 1; // Frecuencia aleatoria entre 1 y 10
    const color = getColorBasedOnFrequency(frequency); // Asigna un color basado en la frecuencia
    return {
      h3Index,
      color,
      frequency
    };
  });

  drivers.push({ id: `driver${i + 1}`, regions });
}

// Exportar la lista de conductores con sus regiones H3, colores y frecuencias
module.exports = drivers;