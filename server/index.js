require('dotenv').config();

const http = require('http');
const express = require('express');
const app = express();
const HOST = process.env.HOST || 5000;

app.get('/', (req, res) => {
  res.send({
    success: true,
  });
});

app.listen(HOST, () => {
  console.log(`Server Connected : ${HOST}`);
});
