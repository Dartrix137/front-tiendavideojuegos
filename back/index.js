const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");

app.use(cors());

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'usuario_tienda1',
    password: 'DB_123456789',
    database: 'videojuegos_1'
});

app.use(express.urlencoded({ extended: false }));


app.listen(3004, () => {
    console.log('Listening server 3004');
})