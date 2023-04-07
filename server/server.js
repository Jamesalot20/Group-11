const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
// In your main server file, e.g., server.js
const userRoutes = require('./userRoutes.js');
const productRoutes = require('./productRoutes.js');

// Use the routes as middleware
app.use('/users', userRoutes);
app.use('/products', productRoutes);
// In your main server file
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');

app.use(cors());
