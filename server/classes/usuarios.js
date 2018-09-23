

class Usuarios{

    constructor(){
        this.personas = [];
    }

    agregarPersona(id ,nombre,sala){
        console.log('entrar al metodo agregarPersona');
            
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id){
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPersonas(){
        this.personas;
    }

    getPersonasPorSala(){
        //
    }


    borrarPersona(id) {
        console.log('Ejecutando Metodo borrrar Persona');
        
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return  personaBorrada;
    }


}



module.exports = {
    Usuarios
}