//Instanciando modulos de Express, Body-Parser y consultas del modulo PG
const express = require("express")
const app = express()
const {nuevoCurso, getCurso, editCurso, eliminarCurso} = require("./consultas")

//Configuracion de para tomar los elementos del body como JSON
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Disponibilizando ruta raíz para consumo del archivo index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//ruta POST para agregar cursos a la base de datos en Postgres
app.post("/curso", async (req, res) => {
    const {nombre, nivelTecnico, fechaInicio, duracion} = req.body
    const respuesta = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion)
    res.send(respuesta)
})

//Ruta GET para mostrar los cursos de la base de datos
app.get("/cursos", async (req, res) => {
    const respuesta = await getCurso()
    res.send(respuesta)
})

//Ruta PUT para modificar los datos de la base de datos
app.put("/curso", async (req, res) => {
    const {id, nombre, nivelTecnico, fechaInicio, duracion} = req.body
    const respuesta = await editCurso(id, nombre, nivelTecnico, fechaInicio, duracion)
})

//Ruta DELETE para eliminar los cursos según su ID
app.delete("/curso/:id", async (req, res) => {
    const {id} = req.params
    const respuesta = eliminarCurso(id)

    respuesta > 0
        ?res.send(`El canal con id '${id}' fue borrado con éxito`)
        :res.send(`El canal con id '${id}' no está registrado`)
})

//Escuchando el puerto 3000
app.listen(3000, () => console.log("Servidor levantado en puerto 3000"))