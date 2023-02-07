const { deco, indumentaria } = require("/products");
const { ProductManager } = require("/ProductManager");

const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct(deco);

console.log(productManager.getProducts());

productManager.addProduct(indumentaria);

productManager.getProductById(11);