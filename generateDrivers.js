const { geoToH3 } = require('h3-js');  // Importa la función geoToH3

// Función para generar coordenadas aleatorias dentro de un rango
function getRandomCoordinate(min, max) {
  return Math.random() * (max - min) + min;
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
  drivers.push({ id: `driver${i + 1}`, lat, lng });
}

// Definir la resolución H3 (0-15, donde 15 es la mayor resolución)
const resolution = 9;

// Mapear cada conductor a una celda H3
const driverZones = drivers.map(driver => {
  const h3Index = geoToH3(driver.lat, driver.lng, resolution);  // Utiliza la función geoToH3
  return {
    ...driver,
    h3Index
  };
});

// Exportar la lista de conductores con zonas H3
module.exports = driverZones;