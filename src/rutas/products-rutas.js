const express = require('express');
const router = express.Router();
const productsController = require('../managers/ProductManager');

const productManager = new productsController();

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});

router.post('/', async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productManager.addProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error adding product' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updateData = req.body;
        const productUpdate = await productManager.updateProduct(productId, updateData);
        if (!productUpdate) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const updateProduct = await productManager.updateProduct(productId, updateData);
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const deletedProduct = await productManager.deleteProduct(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(deletedProduct);
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});

module.exports = router;