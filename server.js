const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require('morgan');

//Para usar Json y obtener datos de URL
app.use( express.json(), express.urlencoded({ extended: true }) );

//Para usar cookies
app.use(cookieParser());
app.use(morgan('tiny'));

//Permitir accesar desde un origen distinto
app.use (
    cors( {
        origin: "http://localhost:3000",
        //Credenciales
        credentials: true
    })
)

//Inicilizamos BD
require("./backend/config/mongoose.config");

//Importamos rutas
const misRutas = require("./backend/routes/user.routes");
misRutas(app);

//Ejecutamos server
app.listen(8000, () => console.log("Sevidor listo!"));