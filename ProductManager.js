const Contenedor = require('./Contenedor.js')
const log = (p) => console.log(p)

const item1 = {
   title: "Mandalas", 
   description: "hilo",
    price: 1000,
    thumbnail: "",
    code: 1,
    stock: 110 }
const item2 = { 
    title: "Chaleco", 
    description: "Lana ",
    price: 2500, 
    thumbnail: "", 
    code: 1, 
    stock: 30 }



async function main() {

    const contenedor = new Contenedor('./products.js')

    let datos1 = await contenedor.getAll()
    log(datos1)

    let id1 = await contenedor.save(item1)
    log(id1)

    let id2 = await contenedor.save(item2)
    log(id2)

    let datos2 = await contenedor.getAll()
    log(datos2)

    let busca1 = await contenedor.getById(1)
    log(busca1)

    let busca2 = await contenedor.getById(10)
    log(busca2)
  
    await contenedor.deleteById(1)
    let delete1 = await contenedor.getAll()
    log(delete1)

    await contenedor.deleteAll()
    let delete2 = await contenedor.getAll()
    log(delete2)


}

main()















/* class ProductManager {
    constructor() {
      this.products = [];
    }

    getProducts() {
      return this.products;
    }
  
    #checkProduct(product) {
      return !!product.title && !!product.description && !!product.price && !!product.thumbnail && !!product.code && !!product.stock; 
    }
  
    addProduct(product) {
      if (this.#checkProduct(product) && !this.products.find(p => p.code === product.code)) {
        this.products.push({ ...product, id: this.products.length + 1 });
        return console.log(`Product added: ${product.title}`)
      } else {
        return console.log(`The product ${product.title} already exists.`);
      }
    }
  
    getProductById(id) {
      const findById = this.products.find(p => p.id === id);
  
      if (findById) return findById;
      else return console.log(`The product with id ${id} does not exist.`);
    }
  
  }
  
  module.exports = { ProductManager }; */
