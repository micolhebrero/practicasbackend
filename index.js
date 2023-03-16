const { deco, indumentaria } = require("./products.js");
const { ProductManager } = require(".ProductManager.js");

const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct(deco);

console.log(productManager.getProducts());

productManager.addProduct(indumentaria);

productManager.getProductById(11);