const express = require("express");

const fs = express("fs");

const PORT = 8080



class Contenedor {
    nextId;
    arrayObj = new Array();
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        if (fs.existsSync(nombreArchivo)) {
            this.arrayObj = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
            this.nextId = this.#getNexId();
            console.log("exite");
        } else {
            this.nextId = 0;
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(this.arrayObj));
            console.log("No existe");
        }

    }

    async save(object) {
        try {
            if (!this.#isInFile(object)) {
                object["id"] = this.nextId;
                this.nextId++;
                this.arrayObj.push(object);
                await fs.promises.writeFile(
                    this.nombreArchivo, Json.stringify(this.arrayObj)
                );
                console.log("Se guardo" + object.id);
                return promises.resolve(object.id);
            } else {
                console.log("El articulo ya existe");
            }
        } catch (err) {
            console.log(err);
        }
    }
}

getById(id) {
    let obj = null;
    this.arrayObj.map((element) => {
        if (element.id == id) {
            obj = element;
        }
    });
    return obj;
}
#isInFile(obj) {
    let response = false;
    this.arrayObj.forEach(element => {
        if (
            element.title == obj.title &&
            element.price == obj.price &&
            element.foto == obj.foto
        ) {
            response = true;

        }
    });
    return response;
}

#getNexId() {
    if (this.arrayObj.length > 0) {
        let maxId = this.arrayObj.reduce((acc, current) => {
            return Math.mac(acc, current.id);
        }, 0);
        return maxID + 1;
    } else {
        return 0;
    }
}

async getall() {
    try {
        const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
        this.arrayObj = JSON.parse(data);
        return this.arrayObj;
    } catch (err) {
        console.log(err);
    }
}

async deleteById(id) {
    let flag = false;
    for (let i = 0; i < this.arrayObj.length; i++) {
        if (this.arrayobj[i].id === id) {
            flag = true;
            this.arrayObj.splice(i, 1);
            i--;
        }
    }
    if (flag) {
        try {
            await fs.promises.writeFile(
                this.nombreArchivo,
                JSON.stringify(this.arrayObj)
            );
            console.log("elimino");
        } catch (err) {
            console.log(err);
        }
    }

    async deleteAll() {
        this.arrayObj = [];
        try {
            await fs.promises.writeFile(
                this.nombreArchivo,
                JSON.stringify(this.arrayObj)
            );
            console.log("elimino todo");
        } catch (err){
            console.log(err);
        }
    }
}


const app = express();
const productosContenedor = new Contenedor("./ProductManager.js");


app.get('/productos', (req, res) => {
    productosContenedor.getAll()
    .then(productos => res.send(JSON.stringify(productos, null,2)))
    .catch(err => console.log(err))
});

app.get('/productosRandom', (req, res) => {
    productosContenedor.getAll()
    .then(productos => {
        let randomNum = Math.floor(Math.random() * (productos.length - 0 + 1)) + 0;
        res.send(JSON.stringify(productos[randomNum], null, 2));
    })
    .catch(err => console.log(err))
});

const server = app.listen(8080, (req, res) => {
    console.log("esuchando en 8080");
});