const inquirer = require('@inquirer/prompts')
const { validate } = require('uuid')
require('colors')


const menu = async() =>
{
    const preguntas =
    {
        message: '¿Qué desea hacer?'.bgBlack.white,
        loop: false,
        choices: [
            {
                value: 1,
                name: `${'1'.yellow}${'.'.green} ${'Crear tarea'.bgBlack.blue}`,
                description: 'Crear una nueva tarea por hacer'
            },
            {
                value: 2,
                name: `${'2'.yellow}${'.'.green} ${'Listar tareas'.bgBlack.blue}`,
                description: `Mostrar ${'TODAS'.underline} las tareas registradas`
            },
            {
                value: 3,
                name: `${'3'.yellow}${'.'.green} ${'Listar tareas pendientes'.bgBlack.blue}`,
                description: `Mostrar solo las tareas ${'pendientes'.underline}`
            },
            {
                value: 4,
                name: `${'4'.yellow}${'.'.green} ${'Listar tareas completadas'.bgBlack.blue}`,
                description: `Mostrar solo las tareas ${'completadas'.underline}`
            },
            {
                value: 5,
                name: `${'5'.yellow}${'.'.green} ${'Iniciar una tarea'.bgBlack.blue}`,
                description: `Elegir una tarea ${'pendiente'.underline} para iniciarla`
            },
            {
                value: 6,
                name: `${'6'.yellow}${'.'.green} ${'Completar una tarea'.bgBlack.blue}`,
                description: `Elegir una tarea ${'iniciada'.underline} para completarla`
            },
            {
                value: 7,
                name: `${'7'.yellow}${'.'.green} ${'Borrar una tarea'.bgBlack.blue}`,
                description: `Elegir una tarea ${'cualquiera'.underline} para cancelarla`
            },
            {
                value: 8,
                name: `${'8'.yellow}${'.'.green} ${'Seleccionar múltiples tareas'.bgBlack.blue}`,
                description: `Elegir ${'múltiples tareas'.underline} para ejecutar una acción`
            },
            {
                value: 0,
                name: `${'0'.yellow}${'.'.green} ${'Salir'.bgBlack.blue}`
            },
        ]
    }

    console.clear()
    console.log('======================='.green)
    console.log('Seleccionar una opción: '.america)
    console.log('======================='.green)

    const opcion = await inquirer.select(preguntas)
    return opcion
}


const pausa = async() =>
{
    const pregunta =
    {
        message: `\n Presione ${'ENTER'.underline.green} para continuar`.bgBlack.white
    }

    const confirmacion = await inquirer.input(pregunta)
    return confirmacion
}

const leerInput = async (mensaje) =>
{
    const pregunta =
    {
        message: mensaje,
        validate(value)
        {
            if(value.length === 0)
            {
                return 'Por favor, debe ingresar un valor'
            }
            return true
        }
    }

    const descripcion = await inquirer.input(pregunta)
    return descripcion
}

const listarTareasBorrar = async (tareas = []) =>
{
    const selecciones = tareas.map((tarea, i) =>
        {
            const indice = `${i + 1}`.green
            return{
                value: tarea.id,
                name: `${indice}. ${tarea.descripcion}`
            }
        })
    
    selecciones.unshift(
    {
        value: 0,
        name: '0. Cancelar'.bgGreen.black
    })

    const preguntas =
    {
        name: 'id',
        message: '¿Cuál tarea deseas eliminar?'.bgBlack.white,
        choices: selecciones,
        loop: false
    }
    const id = await inquirer.select(preguntas)
    return id
}

const listarTareasIniciar = async (tareas = []) =>
{
    const selecciones = tareas.map((tarea, i) =>
        {
            const indice = `${i + 1}`.green
            return{
                value: tarea.id,
                name: `${indice}. ${tarea.descripcion}`
            }
        })

    selecciones.unshift(
    {
        value: 0,
        name: '0. Cancelar'.bgGreen.black
    })

    const preguntas =
    {
        name: 'id',
        message: '¿Cuál tarea deseas iniciar?'.bgBlack.white,
        choices: selecciones,
        loop: false
    }
    const id = await inquirer.select(preguntas)
    return id
}

const listarTareasCompletar = async (tareas = []) =>
{
    const selecciones = tareas.map((tarea, i) =>
        {
            const indice = `${i + 1}`.green
            return{
                value: tarea.id,
                name: `${indice}. ${tarea.descripcion}`
            }
        })
    
    selecciones.unshift(
    {
        value: 0,
        name: '0. Cancelar'.bgGreen.black
    })

    const preguntas =
    {
        name: 'id',
        message: '¿Cuál tarea deseas completar?'.bgBlack.white,
        choices: selecciones,
        loop: false
    }
    const id = await inquirer.select(preguntas)
    return id
}

const listarDias = async (dias = []) =>
{
    const selecciones = dias.map((dia, i) =>
        {
            const indice = `${i + 1}`.green
            return{
                value: dia,
                name: `${indice}. ${dia}`
            }
        })

    selecciones.unshift(
    {
        value: 0,
        name: '0. Cancelar'.bgGreen.black
    })

    const preguntas =
    {
        name: 'dia',
        message: '¿En cuál día de la semana completaste la tarea?'.bgBlack.white,
        choices: selecciones
    }
    const dia = await inquirer.select(preguntas)
    return dia
}

const mostrarChecklist = async (tareas = []) =>
{
    const selecciones = tareas.map((tarea, i) =>
        {
            const indice = `${i + 1}`.green
            return{
                value: tarea.id,
                name: `${indice}. ${tarea.descripcion}`
            }
        })

    const preguntas =
    {
        name: 'ids',
        message: 'Seleccionar tareas'.bgBlack.white,
        choices: selecciones,
        loop: false
    }
    const ids = await inquirer.checkbox(preguntas)
    return ids
}

const confirmar = async (mensaje = '') =>
{
    const pregunta = 
        {
            name: 'ok',
            message: mensaje
        }
    
    const ok = await inquirer.confirm(pregunta)
    return ok
}

const eleccion = async () =>
{
    const selecciones =[
        {
            name: 'Iniciar',
            value: 'Iniciar'
        },
        {
            name: 'Completar',
            value: 'Completar'
        },
        {
            name: 'Eliminar',
            value: 'Eliminar'
        }
    ]

    const pregunta =
    {
        name: 'decision',
        message: '¿Cuál acción desea hacer?'.bgBlack.white,
        choices: selecciones,
    }

    const decision = await inquirer.select(pregunta)
    return decision
}

module.exports =
{
    menu,
    pausa,
    leerInput,
    listarTareasBorrar,
    listarTareasIniciar,
    listarTareasCompletar,
    listarDias,
    confirmar,
    mostrarChecklist,
    eleccion
}