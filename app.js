require('colors')
const { guardarDb, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,pausa,leerInput,listadoTareaBorrar,confirmar ,mostrarlistadoChecklist} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');

const main = async()=>{
    console.clear();
    console.log('hi')

    let opt='';
    const tareas = new Tareas();

    const tareasDB= leerDB();

    if(tareasDB){
        //establecer tareas
        tareas.cargarTareasFromArray(tareasDB)
    }
   
    do{
       //opt = await mostrarMenu();
       
         
       opt = await inquirerMenu();
    //    console.log({opt})
       switch(opt){
        case '1':
            const desc = await leerInput('Descripcion: ');
            //console.log(desc);
            tareas.crearTarea(desc);
            break;
        case '2':
            console.log(tareas.listadoCompleto())
            break;

        case '3':
            console.log(tareas.listarPendientesCompletadas(true))
            break;
        case '4': 
            console.log(tareas.listarPendientesCompletadas(false))
            break;
        case '5': 
             const ids = await mostrarlistadoChecklist(tareas.listadoArr)
            tareas.toggleCompletadas(ids);
            break;
            
        case '6': 
             const id = await listadoTareaBorrar(tareas.listadoArr);
             if(id !== '0'){
                const ok = await confirmar('estas seguro?');

                console.log({ok}); 
                if(ok){
                    tareas.borrarTarea(id);
                    console.log('tarea borrada correctamente!')    
                }
            }

            break; 
       }
       guardarDb(tareas.listadoArr);
       
       await pausa();


     //  if(opt!=='0') await pausa();

    }while(opt!=='0');
    //mostrarMenu();
    //pausa();

}

main();