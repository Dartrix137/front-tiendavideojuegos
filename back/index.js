const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");
const port = 3001;
const bluebird = require('bluebird');
app.use(express.json())

app.use(cors());

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'usuario_tienda1',
    password: 'DB_123456789',
    database: 'videojuegos_1',
    Promise: bluebird
});

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json("Backend reto sophos");
});

//CRUD usuarios

app.get("/usuarios", (req, res) => {
    connection.query(
        'SELECT * FROM usuario',
        function (err, results, fields) {
            res.json(results)
        }
    );
})

app.get("/usuario/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
        `SELECT * FROM usuario WHERE id = ${id} `, (err, results) => {
            if (err) {
                console.log(err)
                res.json(err)
            } else {
                console.log(results)
                res.json(results)
            }
        }
    );
})


app.post("/crear-usuario", (req, res) => {
    const usuario = req.body
    console.log(usuario)
    connection.query(`INSERT INTO usuario (nombre, apellido, telefono, email) VALUES (?,?,?,?)`, [usuario.nombre, usuario.apellido, usuario.telefono, usuario.email], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Usuario creado")
            console.log(usuario)
        }
    });
});

app.put("/actualizar-usuario/:id", (req, res) => {
    const id = req.params.id;
    const usuario = req.body;
    connection.query(`UPDATE usuario SET nombre = '${usuario.nombre}', apellido = '${usuario.apellido}', telefono = ${usuario.telefono}, email = '${usuario.email}' WHERE id = ${id} `, (err, results) => {
        if (err) {
            res.json({ "respuesta": "No es valido el id de producto" });
            console.log(err);
        } else {
            res.json(usuario);
            console.log("usuario actualizado");
            console.log(results);
        };
    }
    );
});

app.delete("/borrar-usuario/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
        `DELETE FROM usuario WHERE id = ${id} `, (err, results) => {
            if (err) {
                console.log(err)
                res.json(err)
            } else {
                console.log(results)
                res.json(results)
            }
        }
    );
})
//CRUD Juegos
app.get("/videojuegos", (req, res) => {
    connection.query(
        'SELECT * FROM usuario',
        function (err, results, fields) {
            res.json(results)
        }
    );
})

app.get("/videojuego/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
        `SELECT * FROM videojuego WHERE id = ${id} `, (err, results) => {
            if (err) {
                console.log(err)
                res.json(err)
            } else {
                console.log(results)
                res.json(results)
            }
        }
    );
})


app.post("/crear-videojuego", (req, res) => {
    const juego = req.body
    console.log(juego)
    connection.query(`INSERT INTO usuario (nombre, portada, precio, director, protagonistas, fehcalanzamiento, productor) VALUES (?,?,?,?,?,?,?)`, [juego.nombre, juego.portada, juego.precio, juego.director, juego.protagonistas, juego.fehcalanzamiento, juego.productor], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Videojuego creado")
            console.log(usuario)
        }
    });
});

app.put("/actualizar-videojuego/:id", (req, res) => {
    const id = req.params.id;
    const juego = req.body;
    connection.query(`UPDATE videojuego SET nombre = '${juego.nombre}', portada = '${juego.portada}', precio = ${juego.precio}, director = '${juego.director}', protagonistas = '${juego.protagonistas}', fechalanzamiento = '${juego.fehcalanzamiento}', productor='${juego.productor}' WHERE id = ${id} `, (err, results) => {
        if (err) {
            res.json({ "respuesta": err });
            console.log(err);
        } else {
            res.json(juego);
            console.log("usuario actualizado");
            console.log(results);
        };
    }
    );
});

app.delete("/borrar-videojuego/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
        `DELETE FROM videojuego WHERE id = ${id} `, (err, results) => {
            if (err) {
                console.log(err)
                res.json(err)
            } else {
                console.log(results)
                res.json(results)
            }
        }
    );
})

//CRUD Alquiler
app.get("/alquileres", (req, res) => {
    connection.query(
        'SELECT * FROM Alquiler',
        function (err, results, fields) {
            res.json(results)
        }
    );
})

app.get("/alquiler/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
        `SELECT * FROM Alquiler WHERE id = ${id} `, (err, results) => {
            if (err) {
                console.log(err)
                res.json(err)
            } else {
                console.log(results)
                res.json(results)
            }
        }
    );
})


app.post("/crear-alquiler", (req, res) => {
    const alquiler = req.body
    connection.query(`INSERT INTO Alquiler (idjuego, idcliente, fechaalquiler) VALUES (?,?,?)`, [alquiler.usuario, alquiler.videojuego, alquiler.fechaalquiler], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Alquiler creado")
            console.log(alquiler)
        }

    });
});

app.put("/actualizar-videojuego/:id", (req, res) => {
    const id = req.params.id;
    const alquiler = req.body;
    connection.query(`UPDATE Alquiler SET fechadevuelta = '${alquiler.fechadevuelta}' WHERE id = ${id} `, (err, results) => {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
            res.json(alquiler);
            console.log("alquiler actualizado");
            console.log(results);
        };
    }
    );
});

app.delete("/borrar-alquiler/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
        `DELETE FROM Alquiler WHERE id = ${id} `, (err, results) => {
            if (err) {
                console.log(err)
                res.json(err)
            } else {
                console.log(results)
                res.json(results)
            }
        }
    );
});

app.listen(port, () => {
    console.log('Listening server on port ' + port);
})