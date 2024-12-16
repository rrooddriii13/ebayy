//? HAY DOS FORMAS DE PROGRAMAR SERVICIO PARA HACER PET.AJAX AL BACKEND 
//! --- 1 forma ,mediante funciones individuales q exportas ,una funcion por cada peticion q quieras hacer (una funcion para cada cosa) funciones globales
/* FORMA 1
export function RegistrarCliente(datoscuenta){ //UNA FUNCION PARA EL REGISTRO 
    /codifo ajax para mandar los datos de la cuenta al servidor de node js
}
export function LoginCliente(email,password){ 
    /codifo ajax para hacer login del cliente al servidor de node js
}*/


//! --- 2forma ,crear un obj JS  con metodos dentro del obj para hacer cada pet.ajax(peticion ajax)  y expòrtas todo el obj
//exportar un obj js vuyas propiedades son los metodos o funciones q se van a usar para hacer la peticion ajax y segun el componente uso uno o otro

/*--------- 1º forma de hacerlo usando callbacks y eventos ------------------
let restService = {
    generaEventos: new EventTarget(), //<-- permite al objeto restService generar o disparar/escuchar eventos
    RegistrarCliente:function(datoscuenta){

        //codigo ajax para mandar al server los datos de la cuenta a registrar....
        //en datoscuenta va el objeto JSON q manda componente Registro.js:  { nombre:.., apellidos: .., email: ..., password: ...}
        let _petAjax = new XMLHttpRequest();

        _petAjax.open('POST','http://localhost:3003/api/zonaCliente/Registro');
        _petAjax.setRequestHeader('Content-Type','application/json')
        
        _petAjax.addEventListener('readystatechange', (ev) => {
            if(_petAjax.readyState === 4 ){
                //console.log(_petAjax.responseText)
                let _respuestaServer = JSON.parse(_petAjax.responseText);
                //cuando esta operacion asincrona acabe no quiero devolver la respuesta ya lo q quiero es q el 
                /obj dispare un evento como diciendo ya tengo los datos y en los datos del evento van a ir los datos del server
                //return _respuestaServer;//devuelves el jsom
                //this.generaEventos.dispatchEvent(new CustomEvent('peticionCompletadaRegistro'));//este obj puedes generar cualquier tipo evento
                //si quiero pasarle datos a este evento personalizado  le tengo q pasar un obj con prop detail : con la respuyesta del server detail-> son los datos dela respuesta del server
                this.generaEventos.dispatchEvent(new CustomEvent('peticionCompletadaRegistro',{detail: _respuestaServer}));//ya puede disparar eventos
            }
        })
        _petAjax.send(JSON.stringify(datoscuenta))
    },
    //me creo un metodo para q sea capaz de añadirle callback
    addCallBackEvent : function(nombreEvento , callback){ //<-- este metodo del obj permite añadir handler o func callback ante even personalizados
        //ANTES DE añadir  la funcion callaback para tratar el evento , habria q comprobar si esta añadida de antes de como handler... funcion manejadora
        entoneces si ya existe no la añades para hacerlo te puedes creaR UN obj Map donde identificar cada funcion q añades a cada evento
        
        this.generaEventos.addEventListener(nombreEvento,callback);//este thhis aunta al obj q define este metodo en restService
    },
    LoginCliente:function(email,password){
        //codifo ajax poara haecer login de los datos de la cuenta.
    }
}
*/
// ---------- 2º forma de hacerlo usando PROMISE -----------------------------
let restCliente={
    RegistrarCliente: function(datoscuenta){
        let _opAsincronaServer=new Promise(
        (resolve,reject)  => {
            let _petAjax = new XMLHttpRequest();// Crear una solicitud AJAX

            _petAjax.open('POST','http://localhost:3003/api/zonaCliente/Registro');
            _petAjax.setRequestHeader('Content-Type','application/json');
            _petAjax.addEventListener('readystatechange', (ev) => {
                if(_petAjax.readyState === 4 ){//verificas q la solicitud esta completa
                    let _respuestaServer = JSON.parse(_petAjax.responseText);//transformas la respuestaJson del servidor en un obj js
                                        
                    //segun la respuesta q de server json(cod x mensaje x) si el cod es=0 es q fue bn si es >0 fue mal
                    if(_respuestaServer.codigo ===0 ){
                        resolve(_respuestaServer)
                    }else{
                        reject(_respuestaServer)
                    }
                }
            });
            _petAjax.send(JSON.stringify(datoscuenta));//envias los datos en JSon 
        })
        // Retornamos la promesa para permitir el manejo del resultado con `.then` y `.catch`
        return _opAsincronaServer;
    },

    ComprobarEmail: function(email){
        //en vez de creaun un obj XMLHttpRequest para hacer la peticion ajax callback y su puta madre ps con promesas
        //como mandar datos get -> van en la url ,post->van en el body 
        /*por post q los datos van en el body  -> fetch(1 url donde quieres mandar,un obj q le dices q es metodo post y el body llos daatos) decuelve una promesç
         //fetch(1 url donde quieres mandar,un obj q le pasas method:POST , y body: los datos)
        //return fetch('http://localhost:3003/api/zonaCliente/ComprobarEmail',
            { 
                method:'POST', 
                body: JSON.stringify( {email}) //mandas u  jon con la propiedad email q hay va el emial del cliente
            });**/
        
        //get en la url tienen q ir los datos q quieres mandar formsto variable = valor ampersans -> // ?apartir de aqui empiexa la variable email-> nombre dela variale y =  ya qui el valor
        return fetch('http://localhost:3003/api/zonaCliente/ComprobarEmail?email=' +email);
        //mandar x get -> cuando  la info q q quieras mandar no es muy sensibkle(no tarjetas bancarias,ni contraseñas) y no son muchos valores -> para variables cortas es mas rapido
        //        return fetch(`http://localhost:3003/api/zonaCliente/ComprobarEmail?email=${email}`);
        
    },
    //Función para comprobar la contraseña del usuario va a ser post 
    /*ComprobarPassword: function(email, password) {
        return fetch('http://localhost:3003/api/zonaCliente/ComprobarPassword', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json', // dice el tipo de contenido que se está enviando al servidor(json)
            },
            body: JSON.stringify({ email, password }), // Envío de email y contraseña
        })
    },*/
    LoginCliente: async function(email, password){
        let _respServerLogin=await fetch('http://localhost:3003/api/zonaCliente/LoginCliente',
                                    {
                                        method: 'POST',
                                        headers: { 'Content-Type':' application/json'},
                                        body:  JSON.stringify({ email, password }) 
                                    }
                                );
        return await _respServerLogin.json();
    }

}


export default restCliente;
