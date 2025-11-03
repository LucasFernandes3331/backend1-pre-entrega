const express = require('express');
const router = express.Router();
const cartsController = require('../managers/CartManager');

const cartManager = new cartsController();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error creating cart' });
    }
});

router.get('/:cid', async (req, res)=>{
    try{
        const CartId = parseInt (req.params.cid)
        const cart = await cartManager.getCartById (cartId);
        if(!cart){
            return res.status(404).json({error: 'Ocurrió un error con el carrito.'});
        }
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({error: 'Error al obtener el carrito.'});   
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const updatedCart = await cartManager.addProductToCart(cartId, productId);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Error adding product to cart' });
        if (error.message) {
            res.status(400).json({ error: error.message });
        }
    }
});
module.exports = router;    