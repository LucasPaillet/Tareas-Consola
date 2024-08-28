const fs = require('fs')


const nombreArchivo = './db/datos.json'

const guardarDB = (datos) =>
{
    fs.writeFileSync(nombreArchivo, JSON.stringify(datos))
}

const leerDB = () =>
{
    if(!fs.existsSync(nombreArchivo))
    {
        return null
    }
    const info = fs.readFileSync(nombreArchivo, {encoding: 'utf-8'})
    const datos = JSON.parse(info)
    
    return datos
}

module.exports =
{
    guardarDB,
    leerDB
}