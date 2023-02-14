class Contenedor {

    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
        const listado = await this.getall()

        if(listado.length > 0 && listado.some((el) => el.title === obj.title))
        {
            console.log("El producto ya se encuentra en el catalogo");
            return
        }

        let nuevoId

        if(listado.length == 0){
            nuevoId = 1
        }

        else{
            nuevoId = listado[listado.length -1].id + 1
        }

        const nuevoObjConID = {...obj, id: nuevoId}

        listado.push(nuevoObjConId)

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(listado, null, 2))
            return nuevoId 
        } catch (error) {
            throw new Error('Error al guardar el objeto: ${error}')
        }

    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }

    async getById(id) {
        try {
            const listado = await this.getAll()
            return listado.find(item => item.id === id) ?? null
        } catch (error) {
            throw new Error('No se encontro el dato: ${error}')
        }
    }
    async deleteById(id) {
        const listado = await this.getAll()

        const nuevoListado = listado.filter( item=> item.id != id)

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoListado, null, 2))
        } catch (error) {
            throw new Error('No se pudo borrar la información: ${error}')
        }

    }

    async deleteAll() { 
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error('No se pudo borrar la información: ${error}')
        }
    }


}

module.exports= Contenedor