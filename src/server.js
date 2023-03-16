import express, {json, urlenconded} from "express";
import productosRouter from ",/routes/productos.route.js";
import baseRouter from "/routes/base.route.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(json());
app.use(urlenconded({ extended: true }));
app.use("/fotos", express.static(path.join(__dirname + "/uploads")));
app.use((req, res, next) => {
    console.log(`X ${req.method} - ${req.path}`);
    next();
});
app.use("/api/productos", productosRouter);
app.use("/", baseRouter);
app.listen(8080, (error) => {
    if(error) {
        console.log("Error al iniciar la app", error);
    } else {
        console.log("Servidor escuchando al puerto 8080");
    }

});

let PORT = 8080;
const server = app.listen(PORT, () => console.log("escuchando en" + PORT))
