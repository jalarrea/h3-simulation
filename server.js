const express = require('express');
const driverZones = require('./generateDrivers');

const app = express();
const port = 3000;

// Servir los datos de los conductores y sus zonas H3
app.get('/drivers', (req, res) => {
  res.json(driverZones);
});

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
