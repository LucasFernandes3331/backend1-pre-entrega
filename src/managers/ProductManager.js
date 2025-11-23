const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

class ProductManager {
    constructor() {
        this.filePath = path.resolve(__dirname, '..', '..', 'data', 'products.json');
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
        }
    }
    async getProducts() {
        const data = await fsp.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
    async getProductById(productId) {
        const products = await this.getProducts();
        return products.find(product => product.id === productId);
    }
    async addProduct(productData) {
        const products = await this.getProducts();
        const newProduct = {
            id: products.length + 1,
            ...productData
        };
        products.push(newProduct);
        await fsp.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return newProduct;
    }
    async updateProduct(productId, updateData) {
        const products = await this.getProducts();
        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex === -1) {
            return null;
        }
        products[productIndex] = { ...products[productIndex], ...updateData };
        await fsp.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return products[productIndex];
    }
    async deleteProduct(productId) {
        const products = await this.getProducts();
        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex === -1) {
            return null;
        }
        const deletedProduct = products.splice(productIndex, 1)[0];
        await fsp.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return deletedProduct;
    }
}

module.exports = ProductManager;