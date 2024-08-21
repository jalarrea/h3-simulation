const h3 = require('h3-js');

// Función para generar coordenadas aleatorias dentro de un rango
function getRandomCoordinate(min, max) {
  return Math.random() * (max - min) + min;
}

// Función para generar un color basado en la densidad, de gris a azul
function getColorBasedOnDensity(density) {
  const maxDensity = 10; // Supongamos que 10 es la máxima densidad posible
  const intensity = Math.min(density / maxDensity, 1); // Normaliza la densidad

  if (intensity < 0.5) {
    // Para densidades bajas, usar escala de grises
    const grayValue = Math.floor(255 * (1 - intensity * 2)); // Escala de gris
    return `rgb(${grayValue}, ${grayValue + 10}, ${grayValue + 10})`;
  } else {
    // Para densidades más altas, usar tonos de azul
    const blueValue = Math.floor(50 * ((intensity - 0.2) * 1)); // Escala de azul
    return `rgb(0, 0, ${blueValue})`;
  }
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
    const density = Math.floor(Math.random() * 10) + 1; // Densidad aleatoria entre 1 y 10
    const color = getColorBasedOnDensity(density); // Asigna un color basado en la densidad
    return {
      h3Index,
      color,
      density
    };
  });

  drivers.push({ id: `driver${i + 1}`, regions });
}

// Exportar la lista de conductores con sus regiones H3, colores y densidades
module.exports = drivers;