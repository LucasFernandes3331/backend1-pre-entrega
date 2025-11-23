const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');

const cartManager = new CartManager();

router.post('/', async (req, res) => {
    try { const newCart = await cartManager.createCart(); res.status(201).json(newCart); }
    catch (e) { res.status(500).json({ error: 'Error creating cart' }); }
});

router.get('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cid);
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        res.json(cart);
    } catch (e) { res.status(500).json({ error: 'Error fetching cart' }); }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const updated = await cartManager.addProductToCart(cid, pid);
        res.json(updated);
    } catch (e) { res.status(500).json({ error: 'Error adding product to cart' }); }
});

module.exports = router;