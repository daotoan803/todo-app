const express = require('express');
const app = express();
const session = require('express-session');
const { join } = require('path');

const database = require('./src/database/database');
const routes = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'mike tyson',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

app.use(express.static(join(__dirname, 'client')));

app.use(routes);

const port = 3000;
database.connect().then((result) => {
  console.log(result);
  app.listen(port, () =>
    console.log('Server running on http://localhost:3000')
  );
});
