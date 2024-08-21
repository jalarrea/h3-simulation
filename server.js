const express = require('express');
const driverZones = require('./generateDrivers');
const stores = require('./generateStores');

const app = express();
const port = 3000;

// Servir los datos de los conductores y sus zonas H3
app.get('/drivers', (req, res) => {
  res.json(driverZones);
});

// Servir los datos de las tiendas
app.get('/stores', (req, res) => {
  res.json(stores);
});

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});