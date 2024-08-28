const Tarea = require("./tarea")
require('colors')

class Tareas
{
    listado = {}

    constructor()
    {
        this.listado = {}
    }

    cargarTareas(tareas = [])
    {
        tareas.forEach( tarea =>
        {
            this.listado[tarea.id] = tarea
        }
        )
    }

    get listadoArray()
    {
        const listadoSalida = []
        Object.keys(this.listado).forEach(key =>
        {
            const tarea = this.listado[key]
            listadoSalida.push(tarea)
        }
        )
        return listadoSalida
    }

    get listadoArrayPendientes()
    {
        const listadoSalida = []
        Object.keys(this.listado).forEach(key =>
        {
            const tarea = this.listado[key]
            if(tarea.estado == 'Pendiente')
            {
                listadoSalida.push(tarea)
            }
        })
        return listadoSalida
    }

    get listadoArrayIniciadas()
    {
        const listadoSalida = []
        Object.keys(this.listado).forEach(key =>
        {
            const tarea = this.listado[key]
            if(tarea.estado == 'Iniciada')
            {
                listadoSalida.push(tarea)
            }
        }
        )
        return listadoSalida
    }

    get listadoArrayCompletadas()
    {
        const listadoSalida = []
        Object.keys(this.listado).forEach(key =>
        {
            const tarea = this.listado[key]
            if(tarea.estado == 'Completada')
            {
                listadoSalida.push(tarea)
            }
        }
        )
        return listadoSalida
    }

    crearTarea(descripcion = '')
    {
        const tarea = new Tarea(descripcion)
        this.listado[tarea.id] = tarea
    }

    listadoCompleto()
    {
        const lista = this.listadoArray
        let salida = 'Listado de tareas \n'
        for (let i = 0; i < lista.length; i++)
        {
            let renglon
            if(lista[i].estado == 'Completada')
            {
                renglon = `${i}.`.green + ` ${lista[i].descripcion} \n`
                renglon += `\t Finalizada el ${lista[i].completadaEn} \n`
            }
            else if (lista[i].estado == 'Pendiente')
            {
                renglon = `${i}.`.red + ` ${lista[i].descripcion} \n`
            }
            else
            {
                renglon = `${i}.`.cyan + ` ${lista[i].descripcion} \n`
            }
            renglon += `\t Estado:  ${lista[i].estado} \n`
            salida += renglon
        }
        console.log(salida)

        // Solucion del curso (No maneja el tema del estado)
        //this.listadoArray.forEach((tarea, i) =>
        //{
        //    const indice = `${i + 1}`.green
        //    const {descripcion, completadaEn} = tarea
        //    const estado = (completadaEn)
        //                        ? 'Completada'.green
        //                        : 'Pendiente'.red
        //    console.log(`${indice} ${descripcion} :: ${estado}`)
        //})
    }

    listadoPendientes()
    {
        const lista = this.listadoArrayPendientes
        let salida = 'Listado de tareas pendientes \n'
        for (let i = 0; i < lista.length; i++)
        {
            let renglon = `${i}.`.red + ` ${lista[i].descripcion} \n`
            salida += renglon
        }
        console.log(salida)
    }

    listadoIniciadas()
    {
        const lista = this.listadoArrayIniciadas
        let salida = 'Listado de tareas iniciadas \n'
        for (let i = 0; i < lista.length; i++)
        {
            let renglon = `${i}.`.cyan + ` ${lista[i].descripcion} \n`
            salida += renglon
        }
        console.log(salida)
    }

    listadoCompletadas()
    {
        const lista = this.listadoArrayCompletadas
        let salida = 'Listado de tareas completadas \n'
        for (let i = 0; i < lista.length; i++)
        {
            let renglon = `${i}.`.green + ` ${lista[i].descripcion} \n`
            renglon += `\t Finalizada el ${lista[i].completadaEn} \n`
            salida += renglon
        }
        console.log(salida)
    }

    iniciarTarea(id)
    {
        this.listado[id].estado = 'Iniciada'
    }

    completarTarea(id, completadaEn)
    {
        const tarea = this.listado[id]
        tarea.estado = 'Completada'
        tarea.completadaEn = completadaEn
    }

    borrarTarea(id)
    {
        if(this.listado[id])
        {
            delete this.listado[id]
        }
    }

    multiplesAcciones(ids= [], accion = '', dia = '')
    {
        if(accion == 'Eliminar')
        {
            ids.forEach(id =>
            {
                this.borrarTarea(id)
            })
        }
        else if(accion == 'Completada')
        {
            ids.forEach(id =>
            {
                const tarea = this.listado[id]
                tarea.estado = accion
                tarea.completadaEn = dia
            })
        }
        else
        {
            ids.forEach(id =>
            {
                const tarea = this.listado[id]
                tarea.estado = accion
            })
        }
    }
}

module.exports = Tareas