require('colors')

const mostrarMenu = () =>
{
    return new Promise((resolve, reject) =>
    {
        console.log('======================='.green)
        console.log('Seleccionar una opción: '.bgBlack.white)
        console.log('======================='.green)

        console.log(`${'1'.yellow}${'.'.green} Crear tarea`)
        console.log(`${'2'.yellow}${'.'.green} Listar tareas`)
        console.log(`${'3'.yellow}${'.'.green} Listar tareas pendientes`)
        console.log(`${'4'.yellow}${'.'.green} Listar tareas completadas`)
        console.log(`${'5'.yellow}${'.'.green} Completar tareas`)
        console.log(`${'6'.yellow}${'.'.green} Borrar tareas`)
        console.log(`${'0'.yellow}${'.'.green} Salir \n`)

        const readLine = require('readline').createInterface(
            {
                input: process.stdin,
                output: process.stdout
            }
        )
        readLine.question('Selecciona una opción: '.rainbow, (opcion) =>
        {
            readLine.close()
            resolve(opcion)
        })
    })
    
}

const pausa = () =>
{
    return new Promise((resolve, reject) =>
    {
        const readLine = require('readline').createInterface(
            {
                input: process.stdin,
                output: process.stdout
            }
        )
    
        readLine.question(`\n Presione ${'ENTER'.yellow} para continuar \n`.bgBlack, (opcion) =>
        {
            readLine.close()
            resolve()
        })
    })
    
}

module.exports =
{
    mostrarMenu,
    pausa
}