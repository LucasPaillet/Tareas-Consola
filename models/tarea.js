const {v4: uuid} = require('uuid')

class Tarea
{
    id = ''
    descripcion = ''
    completadaEn = ''
    estado = ''

    constructor(descripcion)
    {
        this.id = uuid()
        this.descripcion = descripcion
        this.estado = 'Pendiente'
    }
}

module.exports = Tarea