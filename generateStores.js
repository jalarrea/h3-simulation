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

// Generar 20 tiendas con ubicaciones aleatorias en São Paulo
const stores = [];
for (let i = 0; i < 500; i++) {
  const lat = getRandomCoordinate(saoPauloBounds.latMin, saoPauloBounds.latMax);
  const lng = getRandomCoordinate(saoPauloBounds.lngMin, saoPauloBounds.lngMax);
  stores.push({ id: `store${i + 1}`, lat, lng });
}

// Exportar la lista de tiendas
module.exports = stores;
