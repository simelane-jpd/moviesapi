const express = require('express');
const app = express();
const flash = require("express-flash");
//const axios = require('axios')
const cors = require('cors');
const PgPromise = require('pg-promise');
//const jwt = require('jsonwebtoken');
require('dotenv').config()

const initOptions = {/* initialization options */};
const pgp = PgPromise(initOptions);

const DATABASE_URL= process.env.DATABASE_URL || "postgresql://hleng@localhost:5432/moviesapi";

const config = { 
    connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
    config.ssl = { 
        rejectUnauthorized : false
	}
}

const db = pgp(config);

// enable the req.body object - to allow us to use HTML forms
// and when using POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const API = require('./api');
API(app, db);
app.get('/', async function(req, res) {
    console.log(req.query)
  });
//configure the port number using and environment number
var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, async function () {
    console.log('App started on:', portNumber);
   // async function testConnection() {
       // const c = await db.connect(); // try to connect
       // c.done(); // success, release connection
       // return c.client.serverVersion; // return server version
   // }
   // await testConnection()
});