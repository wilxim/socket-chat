const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');


const usuarios = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', ( data , callback ) => {

        if ( !data.nombre || !data.sala){
            return callback({
                error: true,
                mensaje: 'El nombre es requerido'

            });
        }

        client.join(data.sala);
        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);
        


        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonas());

        callback(personas);
    });
  
    client.on('disconnect',() =>{
        
       let personaBorrada = usuarios.borrarPersona( client.id );
       client.broadcast.emit('crearMensaje',crearMensaje('Admin', `${ personaBorrada.nombre } salio del chat`));
       client.broadcast.emit('listaPersonas', usuarios.getPersonas());



    });


    client.on('crearMensaje',(data) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje ( persona.nombre, data.mensaje);
        client.broadcast.emit('crearMensaje', mensaje);
    })



    //mensajes privados

    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre,data.mensaje));

    })


   

});