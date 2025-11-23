const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
    try { const products = await productManager.getProducts(); res.status(200).json(products); }
    catch (e) { res.status(500).json({ error: 'Error fetching products' }); }
});

router.get('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = await productManager.getProductById(pid);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (e) { res.status(500).json({ error: 'Error fetching product' }); }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body);
        const io = req.app.get('io');
        if (io) io.emit('products', await productManager.getProducts());
        res.status(201).json(newProduct);
    } catch (e) { res.status(500).json({ error: 'Error adding product' }); }
});

router.put('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const updated = await productManager.updateProduct(pid, req.body);
        if (!updated) return res.status(404).json({ error: 'Product not found' });
        const io = req.app.get('io'); if (io) io.emit('products', await productManager.getProducts());
        res.json(updated);
    } catch (e) { res.status(500).json({ error: 'Error updating product' }); }
});

router.delete('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const deleted = await productManager.deleteProduct(pid);
        if (!deleted) return res.status(404).json({ error: 'Product not found' });
        const io = req.app.get('io'); if (io) io.emit('products', await productManager.getProducts());
        res.json(deleted);
    } catch (e) { res.status(500).json({ error: 'Error deleting product' }); }
});

module.exports = router;