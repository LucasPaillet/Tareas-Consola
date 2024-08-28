require('colors')
const {menu, pausa, leerInput, listarTareasBorrar,
    listarTareasIniciar, listarTareasCompletar, listarDias, confirmar,
mostrarChecklist, eleccion} = require('./helpers/inquirer')
const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')
const {guardarDB, leerDB} = require('./helpers/capaDatos')

const main = async() =>
{
    let opcion, id, dia, ok, decision, ids
    let dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
    const tareas = new Tareas()
    const tareasDB = leerDB()

    if(tareasDB)
    {
        tareas.cargarTareas(tareasDB)
    }
    
    do
    {
        opcion = await menu()
        switch (opcion)
        {
            case 1:
                const descripcion = await leerInput('\n Ingrese la descripcion de la tarea: '.bgBlack.yellow)
                tareas.crearTarea(descripcion)
                break
            case 2:
                tareas.listadoCompleto()
                break
            case 3:
                tareas.listadoIniciadas()
                break
            case 4:
                tareas.listadoCompletadas()
                break
            case 5:
                id = await listarTareasIniciar(tareas.listadoArrayPendientes)
                if(id != 0)
                {
                    ok = await confirmar('\n ¿Está seguro de querer iniciar la tarea?')
                    if(ok)
                    {
                        tareas.iniciarTarea(id)
                        console.log('\n Tarea iniciada correctamente')
                    }
                }

                break
            case 6:
                id = await listarTareasCompletar(tareas.listadoArrayIniciadas)
                if(id != 0)
                {
                    dia = await listarDias(dias)
                    ok = await confirmar('\n ¿Está seguro de querer completar la tarea?')
                    if(ok)
                    {
                        tareas.completarTarea(id, dia)
                        console.log('\n Tarea completada correctamente')
                    }
                }
                break
            case 7:
                id = await listarTareasBorrar(tareas.listadoArray)
                if(id != 0)
                {
                    ok = await confirmar('¿Está seguro de querer borrar la tarea?')
                    if(ok)
                    {
                        tareas.borrarTarea(id)
                        console.log('\n Tarea borrada correctamente')
                    }
                }
                break
            case 8:
                decision = await eleccion()
                switch (decision)
                {
                    case 'Iniciar':
                        ids = await mostrarChecklist(tareas.listadoArrayPendientes)
                        tareas.multiplesAcciones(ids, 'Iniciada')
                        break
                    case 'Completar':
                        ids = await mostrarChecklist(tareas.listadoArrayIniciadas)
                        dia = await listarDias(dias)
                        tareas.multiplesAcciones(ids, 'Completada', dia)
                        break
                    case 'Eliminar':
                        ids = await mostrarChecklist(tareas.listadoArray)
                        tareas.multiplesAcciones(ids, 'Eliminar')
                        break
                    default:
                        break
                }
            default:
                break
        }

        guardarDB(tareas.listadoArray)

        await pausa()
        //guardarDB(tareas.listadoArray)
        if(opcion == 0)
        {
            console.log()
            console.log('Saliendo del menu...'.yellow)
        }
    } while(opcion != 0)
    
    console.log()
    setTimeout(() => console.log('Adiós, muchas gracias!!'.rainbow), 1500)
    
}

main()
