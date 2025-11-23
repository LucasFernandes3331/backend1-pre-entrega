const express = require("express");
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// rutas de api
const productsRouter = require("./rutas/products-rutas");
const cartsRouter = require("./rutas/carts-rutas");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
// Acá irian las rutas para la vista de products
app.get("/", async (req, res) => {
    const ProductManager = require('./managers/ProductManager');
    const pm = new ProductManager();
    const products = await pm.getProducts();
    res.render('home', { products });
});

app.get("/realtimeproducts", (req, res) => {
    res.render('realTimeProducts');
});

module.exports = app;