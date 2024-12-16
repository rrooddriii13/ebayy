import "./Registro.css";
import { useState } from "react"; //hook es algo para manejar el estado del componente
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Usaremos react-icons para los íconos
import { Link } from "react-router-dom";

import restCliente from "../../../servicios/restCliente.js";

//nunca usar landa para definir componentes siemopre function xq el this dentro del function
// y en un landa el this  no es el mismo obj

//function Registro({username,password}){
function Registro() {
    //* 1º seccion donde estas las propiedades(PROPS) del componente
    //cuanfo quieres pasar valores aun componente usando atributos esos atributos se recogen en el obj props
    //console.log('atributos del componente almacenado en objeto PROPS...', props);
    /*let { username, password }=props; o envez de pasarke arriba props le pasas {username,password} */

    //*2 seccion state componente
    // para forma 3 esto fuera let cuenta={nombre:'', apellidos:'',email:'',password:''};//aqui recoger datos (estado inical vacias)

    //las formas 2 y 3  son para reducir codigo

    //FORMA 3 mas reducida ->
    //todo... voy a crear en el state del componente un unico objeto para recoger y validar todos los campos del formulario
    //! -este objeto tiene como propiedades los campos del formulario :nombre,apellidos,email , password
    //! -dentro de cada propiedad voy a meter un objeto q represente valores del campo del input del formulario (es como un obj anidado)
    //!     -valor caja de texto,validaciones,mensaje de error a mostrar ,estaaado de validacion

    //lo tienes todo en una variable del satte no te creas 4 (1 para cada campo)  y envez de hacer 4 metodos unblur hagio un unico metodo un blue donde valido todo
    const [formData, setFormData] = useState({
        nombre: {
            //?  <-----------propiedad q se mapea contra campo input-nombre
            valor: "", // <-----propiedad de "nombre" a modificar en evento onChange del input
            valido: false, //<----propiedad de "nombre" q define estado de validacion del contenido del input-nombre(campo nombre)
            validaciones: {
                //<-------propiedad de "nombre" con las validaciones a hacer sobre el input-nombre es un obj con todo el conjunto  de validaciones a hacer sobre el input nombre
                obligatorio: [true, "* Nombre obligatorio"], //valor q tienen q tener uy mensaje de errror si no lo cumple
                maximaLongitud: [
                    150,
                    "* Nombre no debe exceder de 150 caracteres",
                ], //num max caracteres y mensaje si no lo cumple
                patron: [
                    /^([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)?$/,
                    "* Formato invalido de nombre, letras y espacios y la 1 en mayuscula ej : Nuria Roca",
                ],
                // patron: [!/^([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)?$/, -> quito la !
            },
            mensajeValidacion: "", //<---propiedad de "nombre " con el mensaje de error procedente de las validaciones a hacer sobre input-nombre
        },
        apellidos: {
            //?  <-----------propiedad q se mapea contra campo input-apellidos
            valor: "", // <-----propiedad de "apellidos" a modificar en evento onChange del input
            valido: false, //<----propiedad de "apellidos" q define estado de validacion del contenido del input-nombre(campo nombre)
            validaciones: {
                //<-------propiedad de "apellidos" con las validaciones a hacer sobre el inputapellido es un obj con todo el conjunto  de validaciones a hacer sobre el input apellido y si nio se cumplen el mensaje de rroes
                obligatorio: [true, "* Apellidos obligatorio"], //valor q tienen q tener uy mensaje de errror si no lo cumple
                maximaLongitud: [
                    250,
                    "* Los Apellidos no debe exceder de 250 caracteres",
                ], //num max caracteres y mensaje si no lo cumple
                patron: [
                    /^([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)?$/,
                    "* Formato invalido de Apellidos, letras y espacios y la 1 en mayuscula ej : Perez Roca",
                ],
                //quito la !-> patron: [!/^([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)?$/,
            },
            mensajeValidacion: "", //<---propiedad de "nombre " con el mensaje de error procedente de las validaciones a hacer sobre input-nombre
        },
        email: {
            //?  <-----------propiedad q se mapea contra campo input-email
            valor: "", // <-----propiedad de "email" a modificar en evento onChange del input
            valido: false, //<----propiedad de "email" q define estado de validacion del contenido del input-nombre(campo nombre)
            validaciones: {
                //<-------propiedad de "email" con las validaciones sobre el email q si no se cumple muestra el error
                obligatorio: [true, "* email obligatorio"],
                patron: [
                    /^.+@(hotmail|gmail|yahoo|msn)\.[a-z]{2,3}$/,
                    "* Formato invalido de email (cualquier caracter(num o ltras ),hotmail/gmail/yahoo/msn .min2 y max4 ) -> mio@hotmail.es",
                ],
            },
            mensajeValidacion: "", //<---propiedad de "nombre " con el mensaje de error procedente de las validaciones a hacer sobre input-nombre
        },
        password: {
            //?  <-----------propiedad q se mapea contra campo input-password
            valor: "", // <-----propiedad de "nombre" a modificar en evento onChange del input
            valido: false, //<----propiedad de "password" q define estado de validacion del contenido del input-nombre(campo nombre)
            validaciones: {
                //<-------propiedad de "password" con las validaciones sobre la cotraseña q si no se cumple muestra el error
                obligatorio: [true, "* Password obligatoria"],
                minimaLongitud: [
                    8,
                    " * La contraseña debe tener al menos 8 caracteres ",
                ],
                patron: [
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!?¿¡/#$%&])[\S]{8,}$/,
                    "*La contraseña debe tener al menos una mayúscula, una minúscula, un dígito y un símbolo raro(! ? ¿ ¡ / # $ % & ) y sin espacios",
                ],
                //  patron: [!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!?¿¡/#$%&])[\S]{8,}$/ -> quito la !
            },
            mensajeValidacion: "", //<---propiedad de "password " con el mensaje de error procedente de las validaciones a hacer rn rl input password
        },
    });

    //* 3codigo funcional javascript
    //TODO validaciones: esto en la forma 3 lo hago agi en validacionmes
    //! ----- nombre: rellenado, max.longitud de 150 caracteres, solo admite mays o mins y espacios
    //! ----- apellidos: rellenado, max.longitud de 250 caracteres, solo adminte mays o mins y espacios
    //! ----- email: formato email, dominios admitidos: gmail,hotmail,msn,yahoo
    //! ----- password: min 8 caracteres, una MAYS, una MINS, un digito y un simbolo raro

    /*  forma  1 cada prop del campo tiene su state individual (uno para el valor, otro para la validación, y otro para el mensaje de error.)
     creando 6 variables states x cada campo (nombre , password , email y apellido) 

    let [nombre, setNombre]=useState(cuenta.nombre);
    let [estadoValidacionNombre, setEstadoValidacionNombre]=useState(false)
    let [mensajeErrorNombre, setMensajeErrorNombre] = useState('');

    let [ apellidos, setApellidos ]=useState(cuenta.apellidos);
    let [estadoValidacionApellido,setEstadoValidacionApellido] = useState(false);
    let [mensajeErrorApellido, setMensajeErrorApellido] = useState('');

    let [ email, setEmail ]=useState(cuenta.email);
    let [estadoValidacionEmail,setEstadoValidacionEmail] = useState(false);
    let [mensajeErrorEmail, setMensajeErrorEmail] = useState('');

    let [ password, setPassword ]=useState(cuenta.password)
    let [estadoValidacionPassword,setEstadoValidacionPassword] = useState(false);
    let [mensajeErrorPassword, setMensajeErrorPassword] = useState('');
    
    
    / 3codigo funcional javascript
    estos son metodos q van en el  onBlur={} ej ->  onBlur={ValidaApellido}

    /! ----- nombre: rellenado, max.longitud de 150 caracteres, solo admite mays o mins y espacios
    function ValidaNombre(ev){
        /*nombre.trim() === '' ? setEstadoValidacionNombre(false) : setEstadoValidacionNombre(true) ;
        nombre.length > 150 ?   setEstadoValidacionNombre(false) : setEstadoValidacionNombre(true) ;
        /^([A-Z][a-z]+\s*)+/.test(nombre) ? setEstadoValidacionNombre(true) : setEstadoValidacionNombre(false) ; 

       
        let nom= ev.target.value;
        if (nom.length > 150){
            setEstadoValidacionNombre(false);
            setMensajeErrorNombre('Te has pasado del límite de 150 caracteres.');
        } else if (nom.trim() === '') {
            setEstadoValidacionNombre(false);
            setMensajeErrorNombre('El nombre no puede estar vacío.');
        } else if (!/^([A-Z][a-z]+\s*)+$/.test(nom)) {
            setEstadoValidacionNombre(false);
            setMensajeErrorNombre('El nombre solo puede contener letras y espacios y 1 en amyuscula');
        } else {
            setEstadoValidacionNombre(true);
           setMensajeErrorNombre('');
        }        
        
    }
   
    /! ----- apellidos: rellenado, max.longitud de 250 caracteres, solo adminte mays o mins y espacios
   
    function validoApellido(ev){
        let ape = ev.target.value;
        if (ape.length > 250){
            setEstadoValidacionNombre(false);
            setMensajeErrorNombre('Te has pasado del límite de 250 caracteres.');
        } else if (ape.trim() === '') {
            setEstadoValidacionNombre(false);
            setMensajeErrorNombre('El apellido no puede estar vacío.');
        } else if (!/^([A-Z][a-z]+\s*)+$/.test(ape)) {
            setEstadoValidacionNombre(false);
            setMensajeErrorNombre('El apellido solo puede contener letras y espacios y 1 en ma yuscula');
        } else {
            setEstadoValidacionNombre(true);
            setMensajeErrorNombre('');
        }       
            
        /! ---- email: formato email, dominios admitidos :gmail,hotmail,msn,yahoo Permite letras mayúsculas y minúsculas, números y algunos caracteres especiales antes de la arroba (@).
        function validoEmail(ev) {
            let _email = ev.target.value;
            if (_email.trim() === '') {
                setEstadoValidacionEmail(false);
                setMensajeErrorEmail('El email no puede estar vacío.');
            }else if (!/^[a-zA-Z0-9._%+-]+@(gmail|hotmail|msn|yahoo)\.[a-z]{2,4}$/.test(_email)) {
                setEstadoValidacionEmail(false);
                setMensajeErrorEmail('Formato de email no válido. Solo se permiten @ gmail, hotmail, msn, y yahoo. y . de 2 -4 letras ej .com .es');
            } else {
                setEstadoValidacionEmail(true);
                setMensajeErrorEmail('');
            }
        }

        /!----password : min 8 caracteres ,una mayuscula,una minuscula,un digito y un simbolo raro( . ,* ! ? ¿ ¡ / # $ % &)
        function validoPassword(ev) {
            let _password = ev.target.value;
            if (_password.trim() === '') {
                setEstadoValidacionPassword(false);
                setMensajeErrorPassword('La contraseña no puede estar vacía.');
            }else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,*!?¿¡/#$%&])[\S]{8,64}$/.test(_password)) {
                setEstadoValidacionPassword(false);
                setMensajeErrorPassword('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un dígito y un símbolo raro( . ,* ! ? ¿ ¡ / # $ % &)).');
            } else {
                setEstadoValidacionPassword(true);
                setMensajeErrorPassword('');
            }
        }

        }*/

    /*FORMA 2  en vez de tener tantas variables por cada campo del formulario es mejor tener solo un estado(useState) x cada campo del
    formulario en vez de varios estasdos x cada propiedad del campo (como el valor, el estado de validación y el mensaje de error), 
    se encapsulan dentro de un obj  -> es decir 1 por cada campo en vez de 3 q son (6 variables y asi 2 )
     
    let [campoNombre,setCampoNombre] = useState({valor:cuenta.nombre,estadoValidacion:false,mensajeError:''});
    let [campoApellido,setCampoApellido] = useState({valor:cuenta.apellidos,estadoValidacion:false,mensajeError:''});
    /asi con email y password q es lo mismo 

    //! ----- nombre: rellenado, max.longitud de 150 caracteres, solo admite mays o mins y espacios
    function ValidaNombre(ev){

        let _estadoValidacionNombre = false;
        let _mensajeError = '';

        // Validaciones
        if (campoNombre.valor.trim() === '') {
            _estadoValidacionNombre = false; // El nombre no puede estar vacío
            _mensajeError = '* Nombre obligatorio';
        } else if (campoNombre.valor.length > 150) {
            _estadoValidacionNombre = false; // El nombre no debe exceder los 150 caracteres
            _mensajeError = '* Nombre no debe exceder de 150 caracteres.';
        } else if (!/^([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)?$/.test(campoNombre.valor)) {
            _estadoValidacionNombre = false; // El nombre debe seguir el patrón especificado
            _mensajeError = '* El apellido solo puede contener letras(mayusculas y minuscilas) y espacios, y debe comenzar con mayúscula.';
        }

        // Actualizamos el estado con la validación final 
        if (_estadoValidacionNombre){
            setCampoNombre({
                ...campoNombre,//tomas los valores acruales campoNombre y los amntiene en el nuevo obj
                estadoValidacion:true,
                _mensajeError:''
            })
        }else{
            setCampoNombre( {...campoNombre, estadoValidacion: false, mensajeError: _mensajeError} );
        }
    }
    //! ----- apellidos: rellenado, max.longitud de 250 caracteres, solo adminte mays o mins y espacios
    function ValidaApellido(ev){

        let _estadoValidacionApellido = false;
        let _mensajeError = '';

        / Validaciones
        if (campoApellido.valor.trim() === '') {
            _estadoValidacionApellido = false; // El nombre no puede estar vacío
            _mensajeError = '* Apellido obligatorio';
        } else if (campoApellido.valor.length > 150) {
            _estadoValidacionApellido = false; // El nombre no debe exceder los 150 caracteres
            _mensajeError = '* Nombre no debe exceder de 150 caracteres.';
        } else if (!/^([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)?$/.test(campoApellido.valor)) {
            _estadoValidacionApellido = false; // El nombre debe seguir el patrón especificado
            _mensajeError = '* El nombre solo puede tener letras y espacios, y debe comenzar con mayúscula.';
        }

        / Actualizamos el estado con la validación final 
        if (_estadoValidacionApellido){
            setCampoApellido({
                ...campoApellido,//tomas los valores acruales de apellido y los mantiene en el nuevo obj
                estadoValidacion:true,
                _mensajeError:''
            })
        }else{
            setCampoApellido( {...campoApellido, estadoValidacion: false, mensajeError: _mensajeError} );
        }

    }
        ASI CON EMAIL Y CONTRASEÑA 
    */

    const [mostrarPassword, setMostrarPassword] = useState(false); // Estado para mostrar/ocultar contraseña

    const [mostarMensaje, setMostarMensaje] = useState("");

    function ManejarSubmitForm(ev) {
        ev.preventDefault(); //anula el comportamiento por defecto del submitform, envio de datos...
        /*antes del STATE esto no me interesa x se guarda en el objeto al dar al  submit al boton
        yo quiero q segun escribas se guarden eso se hace con state

        -----------------antes de definir el state---------------
        //vamos acceder alos datos q ponga el usuario atraves de cuents
        cuenta.nombre = document.getElementById('txtNombre').value;
        cuenta.apellidos = document.getElementById('txtApellidos').value;
        cuenta.email = document.getElementById('txtEmail').value;
        cuenta.password = document.getElementById('txtPassword').value;
        console.log('dato usuario ... ',cuenta);
        */

        /*let cuenta ={nombre,apellidos,email,password};
        //console.log('dato usuario ... ',cuenta);//devuelve obj actualizado  
        pero para verlo mejor  te vas a f12 flechita  y componrntes  */

        //como es asincrono este console log se lanza antes de recibir la respuests x eso sale UNDEFINED
        /* este cod genera por consola UNDEFINED pq la op.asincrona no se completa y no tengo resultados inmedeatos 
        //*en el submit  tengo q usra el RegistrarCliente y pasarle el obj con los valores validados (al habilitarse el boton)
        let _respuesta = restCliente.RegistrarCliente({
            nombre: formData.nombre.valor,
            apellidos: formData.apellidos.valor,
            email: formData.email.valor,
            password: formData.password.valor
        });
        /como es asincrono este console log se lanza antes de recibir la respuests
        /arreglar pa q no salga undefinde q salgan l,os datos el servidor
        console.log('datos recibidos del server NODEJS ante el registro :',_respuesta);
        */

        //lo q tengo q hacer si o asi es llamar al metodo q hace la peticion ajax con estos datos
        //ya no almacenar en ninguna variabkle xq lo q hace es lanzar peticion y cuando la completa lanza el evento no hay ningun return no lo guardo en ninuna variable xq no se le pasa

        //#region  codigo usando eventos y callback
        /*restCliente.RegistrarCliente(
            {
                nombre: formData.nombre.valor,
                apellidos: formData.apellidos.valor,
                email: formData.email.valor,
                password: formData.password.valor,
            }
        );
        //LE AÑADO un listener para este evento para trabajar con la respuesta del servidor una vez recibida , 2 para fun calla q se ejecute cuando se dispare el evento x el obj restCliente
        restCliente.addCallBackEvent('peticionCompletadaRegistro',(ev)=>{
            console.log('Datos recibidos del server de nodejs ante el registro....', ev.detail);
        })*/
        //#endregion

        //con PROMESAS
        restCliente
            .RegistrarCliente({
                nombre: formData.nombre.valor,
                apellidos: formData.apellidos.valor,
                email: formData.email.valor,
                password: formData.password.valor,
            })
            .then((respuestaServer) =>
                //console.log( "respuesta de nodejs OK en registro...",respuestaServer.mensaje )
                setMostarMensaje(respuestaServer.mensaje)
                //limpiart el formmuilario

                // Limpiar los campos del formulario
                ,setFormData({
                    nombre: { valor: "", valido: false, mensajeValidacion: "" },
                    apellidos: { valor: "", valido: false, mensajeValidacion: "" },
                    email: { valor: "", valido: false, mensajeValidacion: "" },
                    password: { valor: "", valido: false, mensajeValidacion: "" },
                })

            ) //esto se ejecuta si la promesa acaba bn
            .catch((errorServer) =>
                console.log("error en nodejs en registro....", errorServer)
            );
    }

    //un solo metodo(funcion) unBlur para todos los input  entonces cada vez qpierda el foco de cualquiera de las cajas va air
    //al mismo metodo , diferenciar unas y otras -> pongo atibuto name con el nombre de la propiedad
    function ValidarCajasHandler(ev) {
        //console.log('se ha perdido el foco de la caja(nombre campo (prop ) ', ev.target.name,'con valor... ', ev.target.value);

        //tengo q ejecutar las validaciones:{} ir cambiando si se cumplen o no la propo valido y el mensaje de validacion
        //formData{}-> siquieres acceder a la prop de un obj y esa prop estan almacenadas en una variable metela entre {}
        //ej _> formData['nombre']
        let _validacionesAHacer = formData[ev.target.name].validaciones;
        let _mensajeError = "";
        let _valido = true;
        let _valorCampo = ev.target.value;

        // Validación obligatoria -> if ( si el valor es true es obligstorio y bvalidado )
        if (_validacionesAHacer.obligatorio[0] && !_valorCampo) {
            //&& !_valorCampo.trim() !== '' o !_valorCampo si esta vacio
            _valido = false;
            _mensajeError = _validacionesAHacer.obligatorio[1];
        }

        //validacion longitud maxima
        if (
            _validacionesAHacer.maximaLongitud &&
            _valorCampo.length > _validacionesAHacer.maximaLongitud[0]
        ) {
            _valido = false;
            _mensajeError = _validacionesAHacer.maximaLongitud[1];
        }

        //patron
        if (
            _validacionesAHacer.patron &&
            !_validacionesAHacer.patron[0].test(_valorCampo)
        ) {
            _valido = false;
            _mensajeError = _validacionesAHacer.patron[1];
        }

        //validacion minima para contsraseña
        if (
            _validacionesAHacer.minimaLongitud &&
            _valorCampo.length < _validacionesAHacer.minimaLongitud[0]
        ) {
            _valido = false;
            _mensajeError = _validacionesAHacer.minimaLongitud[1];
        }

        // Actualizar el estado del formulario con el resultado de la validación
        setFormData({
            ...formData,
            [ev.target.name]: {
                ...formData[ev.target.name],
                valido: _valido,
                mensajeValidacion: _mensajeError,
            },
        });
    }

    //*4º codigo JSX
    return (
        <>
            {/* <h1>HOLA MUNDO tu username es : {props.username} y tu contraseña es {props.password}  </h1> 
            <h1>HOLA MUNDO tu username es : {username} y tu contraseña es {password}  </h1> */}
            {/*  cada fila se divide en columnas .> max 12 ej si quiero usar tres la 1 4 la 2-4 y la 3 cuatro*/}
            {/* hay tres filas 1 la del logo 2la del cuerpo y 3 el footer                    */}
            <div className="container">
                {/* fila donde va logo de ebay y link para el Login*/}
                <div className="row mt-4">
                    <div className="col-2">
                    <Link href="/Tienda/Productos">
                        <img src="/images/logo_ebay.png" alt="loge Ebay" />{" "}
                    </Link>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-2">
                        <span>¿Ya tienes una cuenta?</span>
                    </div>
                    <div className="col-2">
                       <Link to="/Cliente/Login">Identificate</Link>
                    </div>
                </div>

                {/* fila donde va imagen de registro y formulario, depdende tipo de cuenta, si es PERSONAL o EMPRESA*/}
                <div className="row mt-4">
                    <div className="col-8">
                        <img
                            src="/images/imagen_registro_personal.jpg"
                            alt="Registro Personal"
                            className="img-fluid"
                        ></img>
                    </div>
                    <div className="col-4">
                        <form onSubmit={ManejarSubmitForm}>
                            <div className="row">
                                <h1 className="title">Crear una cuenta</h1>
                            </div>
                            <div className="row">
                                {" "}
                                {/* fila   q va el nombre y el apellido*/}
                                <div className="col form-floating">
                                    <input
                                        type="text"
                                        id="txtNombre"
                                        name="nombre"
                                        className="form-control form-element"
                                        placeholder="Nombre"
                                        /* forma 1 onChange={ (ev) => {setNombre(ev.target.value);console.log('actualizando state nombre a ',ev.target.value)}} */
                                        //forma 2 onChange={ (ev) => setCampoNombre( {...campoNombre, valor:ev.target.value}) }
                                        //forma 1 y 2 onBlur= {ValidaNombre}
                                        //f3 cambiar propiedas valor dentro del formData
                                        onChange={(ev) =>
                                            setFormData({
                                                ...formData,
                                                nombre: {
                                                    ...formData.nombre,
                                                    valor: ev.target.value,
                                                },
                                            })
                                        }
                                        onBlur={ValidarCajasHandler}
                                    />
                                    {/* Mostrar mensaje de error para el campo nombre */}
                                    {/*estadoValidacionNombre === false && <span className='text-danger'>{mensajeErrorNombre} </span>**/}
                                    <label
                                        htmlFor="txtNombre"
                                        className="floating-label"
                                    >
                                        Nombre
                                    </label>

                                    {/* FORMA 2 !campoNombre.estadoValidacion &&  <span  className="text-danger">{campoNombre.mensajeError}</span>*/}
                                    {formData.nombre.mensajeValidacion && (
                                        <span className="text-danger">
                                            {formData.nombre.mensajeValidacion}
                                        </span>
                                    )}
                                </div>
                                <div className="col mb-3 form-floating">
                                    <input
                                        type="text"
                                        id="txtApellidos"
                                        name="apellidos"
                                        className="form-control form-element"
                                        placeholder="Apellidos"
                                        //forma 1 onChange={ (ev) => {setApellidos(ev.target.value);console.log('actualizando state apellido a ',ev.target.value)}}
                                        //forma 2 onChange={(ev) => setCampoApellido ({...campoApellido, valor: ev.target.value })}
                                        //forma 1 y 2 onBlur={ValidaApellido}
                                        onChange={(ev) =>
                                            setFormData({
                                                ...formData,
                                                apellidos: {
                                                    ...formData.apellidos,
                                                    valor: ev.target.value,
                                                },
                                            })
                                        }
                                        onBlur={ValidarCajasHandler}
                                    />
                                    <label
                                        htmlFor="txtApellidos"
                                        className="floating-label"
                                    >
                                        Apellidos
                                    </label>

                                    {/* forma 2 !campoApellido.estadoValidacion &&  <span  className="text-danger">{campoApellido.mensajeError}</span> */}
                                    {/*formData.apellidos.valido === false  && <span  className="text-danger">{formData.apellidos.mensajeValidacion}</span> */}
                                    {formData.apellidos.mensajeValidacion && (
                                        <span className="text-danger">
                                            {
                                                formData.apellidos
                                                    .mensajeValidacion
                                            }
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3 form-floating">
                                <input
                                    type="email"
                                    id="txtEmail"
                                    name="email"
                                    className="form-control form-element"
                                    placeholder="Correo electrónico"
                                    //forma 1 onChange={ (ev) => {setEmail(ev.target.value);console.log('actualizando state apellido a ',ev.target.value)}}
                                    //onBlur={validoEmail}
                                    onChange={(ev) =>
                                        setFormData({
                                            ...formData,
                                            email: {
                                                ...formData.email,
                                                valor: ev.target.value,
                                            },
                                        })
                                    }
                                    onBlur={ValidarCajasHandler}
                                />
                                {/*forma 1 {estadoValidacionEmail === false && <span className='text-danger'>{mensajeErrorEmail} </span>}**/}
                                <label
                                    htmlFor="txtEmail"
                                    className="floating-label"
                                >
                                    Correo Electronico
                                </label>

                                {formData.email.mensajeValidacion && (
                                    <span className="text-danger">
                                        {formData.email.mensajeValidacion}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 form-floating ">
                                <input //type="password"
                                    type={mostrarPassword ? "text" : "password"} // Cambia el tipo según el estado osea si le das akl bton es true y lo muestra
                                    id="txtPassword"
                                    name="password"
                                    className="form-control form-element"
                                    placeholder="Contraseña"
                                    //forma 1 onChange={ (ev) => {setPassword(ev.target.value);console.log('actualizando state paswword a ',ev.target.value)}}
                                    //onBlur={validoPassword}
                                    onChange={(ev) =>
                                        setFormData({
                                            ...formData,
                                            password: {
                                                ...formData.password,
                                                valor: ev.target.value,
                                            },
                                        })
                                    }
                                    onBlur={ValidarCajasHandler}
                                />

                                <label htmlFor="txtPassword" className="floating-label">Contraseña</label>

                                {/* Ícono de mostrar/ocultar contraseña */}
                                <span 
                                    onClick={() => setMostrarPassword(!mostrarPassword) }
                                    className="position-absolute end-0 top-50 translate-middle-y me-3"
                                    style={{
                                        cursor: "pointer",
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    {mostrarPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </span>

                                {/* Forma 1 estadoValidacionPassword === false && <span className='text-danger'>{mensajeErrorPassword} </span> */}
                                {formData.password.mensajeValidacion && (
                                    <span className="text-danger">
                                        {formData.password.mensajeValidacion}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3" style={{ maxWidth: "430px" }}>
                                {/*** minicomponente para desuscribirse */}
                                <p className="text-small">
                                    Te enviaremos correos electrónicos sobre
                                    ofertas relacionadas con nuestros servicios
                                    periódicamente. Puedes{" "}
                                    <a
                                        href="/"
                                        style={{
                                            color: "#007bff",
                                            textDecoration: "underline",
                                        }}
                                    >
                                        cancelar la suscripción
                                    </a>{" "}
                                    en cualquier momento.
                                </p>
                                <p className="text-small">
                                    Al seleccionar Crear cuenta personal,aceptas
                                    nuestras Condiciones de uso y reconoces
                                    haber leído nuestro Aviso de privacidad.
                                </p>
                            </div>
                            {/* digo q si valido nombre es true esta habilitado */}
                            <button
                                type="submit"
                                className="btn w-100 mb-3"
                                disabled={
                                    !formData.nombre.valido ||
                                    !formData.apellidos.valido ||
                                    !formData.email.valido ||
                                    !formData.password.valido
                                }
                            >
                                Crear cuenta personal
                            </button>
                            {mostarMensaje && <span className="text-success">{mostarMensaje}</span>}
                            <div className="row mt-3 d-flex flex-row">
                                <span className="separator-before"></span>
                                <span className="text-small inseparator">
                                    o continua con
                                </span>
                                <span className="separator-after"></span>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button
                                        className="btn redes"
                                        style={{ width: "100%" }}
                                    >
                                        <i className="fa-brands fa-google"></i>{" "}
                                        Google
                                    </button>
                                </div>
                                <div className="col">
                                    <button
                                        className="btn redes"
                                        style={{ width: "100%" }}
                                    >
                                        <i className="fa-brands fa-facebook"></i>{" "}
                                        Facebook
                                    </button>
                                </div>
                                <div className="col">
                                    <button
                                        className="btn redes"
                                        style={{ width: "100%" }}
                                    >
                                        <i className="fa-brands fa-apple"></i>{" "}
                                        Apple
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* fila para el footer*/}
                <div className="row">
                    <p>footer</p>
                </div>
            </div>
        </>
    );
}

export default Registro;
