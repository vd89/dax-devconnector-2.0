/** @format */

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const dbController = require('./controller/dbController');
const { errorHandler, notFound, headerFunction } = require('./middleware');
const router = require('./routes');

const app = express();

const PORT = process.env.PORT || 1411;


// Middleware 
app.use(express.json())
app.use(morgan('combined'));
app.use(helmet())
app.use(cors({ origin: 'http://localhost:3000' }))

// Api Route
app.use('/api', router);

app.get('/', (req, res) => {
  res.json({ data: { msg: 'Success', url: `http://localhost:${PORT}`, API: 'Api route is running' } });
});

// Error Handler
app.use(headerFunction)
app.use(notFound);
app.use(errorHandler);

// Database connection
dbController();

app.listen(PORT, () => {
  console.log(`Server is running on the http://localhost:${PORT}`);
});
