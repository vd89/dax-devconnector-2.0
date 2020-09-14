/** @format */

const express = require('express');

const app = express();

const PORT = process.env.PORT || 1411;

app.get('/', (req, res) => {
  res.json({ data: { msg: 'Success', url: `http://localhost:${PORT}` } });
});

app.listen(PORT, () => {
  console.log(`Server is running on the http://localhost:${PORT}`);
});
