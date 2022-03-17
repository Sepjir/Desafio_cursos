const {Pool} = require("pg")
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "cursos",
    port: 5432,
})

async function nuevoCurso(nombre, nivel, fecha, duracion) {
    try {
        const result = await pool.query(`INSERT INTO cursos (nombre, nivel, fecha, duracion) VALUES ('${nombre}', ${nivel}, '${fecha}', ${duracion}) RETURNING*;`)
        return result.rows
    } catch (e) {
        return e
    }
}

async function getCurso() {
    try {
        const result = await pool.query("SELECT * FROM cursos;")
        return result.rows
    } catch (e) {
        return e
    }
}

async function editCurso(id, nombre, nivel, fecha, duracion) {
    try {
        const result = await pool.query(`UPDATE cursos SET nombre = '${nombre}', nivel = ${nivel}, fecha = '${fecha}', duracion = ${duracion} WHERE id = ${id} RETURNING*`)
        return result.rows
    } catch (e) {
        return e
    }
}

async function eliminarCurso(id) {
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id = '${id}'`)
        return result.rowCount
    } catch (e) {
        return e
    }
}


module.exports = {nuevoCurso, getCurso, editCurso, eliminarCurso}