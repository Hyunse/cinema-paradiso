require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const HOST = process.env.HOST || 5000;
const MONGO_URI = process.env.MONGO_URI || '';
// Rouers
const userRouter = require('./routes/route_user');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use routes
app.use(userRouter);

app.get('/', (req, res) => {
  res.send({
    success: true,
  });
});

// Use native promise
mongoose.Promise = global.Promise;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(HOST, () => {
      console.log(`Server Connected : ${HOST}`);
    });
  })
  .catch((error) => console.log(error));
