const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

class CartManager {
    constructor() {
        this.filePath = path.resolve(__dirname, '..', '..', 'data', 'carts.json');
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
        }
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = {
            id: carts.length + 1,
            products: []
        };
        carts.push(newCart);
        await fsp.writeFile(this.filePath, JSON.stringify(carts, null, 2));
        return newCart;
    }
    async getCarts() {
        const data = await fsp.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
    async getCartById(cartId) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === cartId);
    }
    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        const productInCart = cart.products.find(p => p.productId === productId);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ productId, quantity: 1 });
        }
        await fsp.writeFile(this.filePath, JSON.stringify(carts, null, 2));
        return cart;
    }
}

module.exports = CartManager;