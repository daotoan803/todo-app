require('dotenv').config();
const express = require('express');
const app = express();
const { join } = require('path');

const database = require('./src/database/database');
const routes = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

app.use(routes);

app.use((err, req, res, next) => {
  res.sendStatus(500);
  console.error(err);
});

const port = process.env.PORT || 4000;
database.connect().then((result) => {
  console.log(result);
  app.listen(port, () =>
    console.log('Server running on http://localhost:' + port)
  );
});
