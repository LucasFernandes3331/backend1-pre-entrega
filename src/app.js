const express = require("express");
const app = express();
app.use(express.json());

// Rutas de carro y productos y sus respectivos usos y llamados.
const productsRouter = require("./rutas/products-rutas");
const cartsRouter = require("./rutas/carts-rutas");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) => {
    res.send("Tienda de ropa online - Bienvenido al servidor");
});


module.exports = app;
