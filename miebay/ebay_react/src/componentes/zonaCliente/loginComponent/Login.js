import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import restCliente from "../../../servicios/restCliente.js";

import LoginForm from "./LoginForm";
import PasswordForm from "./PasswordForm";


//importarmos hook para hacer uso del state-global definido por zustand
import useGlobalStore from "../../../hooks_personalizados/hook_store_zustland/storeGlobal.js";

//hacerr esta pag -> https://signin.ebay.es/ws/eBayISAPI.dll?SignIn&UsingSSL=1&siteid=186&co_partnerId=2&pageType=2556586&ru=https://www.ebay.es/&regUrl=https%3A%2F%2Fsignup.ebay.es%2Fpa%2Fcrte%3Fru%3Dhttps%253A%252F%252Fwww.ebay.es%252F&sgfl=reg
//BOOTSPRAP .> https://getbootstrap.com/docs/5.3/forms/floating-labels/  aqui ver las clases

//declarar componente
function Login() {
    //-------variables state global zustand ---------
    //const accessToken=useGlobalStore( state => state.accessToken); 
    // const refreshToken=useGlobalStore( state => state.refreshToken);

    const stateGlobal=useGlobalStore(state => state);
    console.log('valor del state global....', stateGlobal)

    //to solo quiero estabkecer el valor del acces del refresh y de la cuenta 
    const setAccessToken=useGlobalStore( state => state.setAccessToken);
    const setRefreshToken=useGlobalStore( state => state.setRefreshToken);
    //const setCuentaCliente=useGlobalStore( state => state.setCuentaCliente);
    const setCliente=useGlobalStore( state => state.setCliente);


    //--------variables state local------------------
    const [emailUser, setEmailUser] = useState(""); //esta variable esla q pones en caja texto email la q pomga en usuario
    const [emailValido, setEmailValido] = useState(false); //esto es para  segun como este mostrar o cultarlo lo de contrasela
    const [passwordUser, setPasswordUser] = useState("");
    const [errorEmail, setErrorEmail] = useState(""); //  para el mensaje de error

    //hook useNavigate de react-router-dom q devuelve funcion "navigate" para provocar el salto a un componente desde codigo
    const navigate=useNavigate();
    async function HandlerClickBoton(ev) {
        let _nombreBoton = ev.target.name;
        //let _email = document.getElementById('txtEmail').value; // <--- en react no se puede recoger a pelo se hace usando state del componente

        console.log("Has pulsado el boton ", _nombreBoton);

        //depede lo q valga xq si vale continuar el login de una forma pidiendo la contraseña
        //si es google hacrt llamando ala de google
        //si es facebook llamando al api de facebook
        //si es apple llamando al api de apple
        switch (_nombreBoton) {
            case "Continuar":
                //recoger el valor de la caja de texto email .llamar al servicio de nodejs para comprobar si existe o no y si existe
                //mostarr el componente para introducir contraseña
                //restCliente.ComprobarEmail(emailUser) es una promesa  tengo q poner .then y.chat no queiiro ponerlo ps pongo await

                //el await solo pa fuinciones asincronas solo con promesas  await es como .then  asyw await para captura el catch lo capta trycatch
                try {
                    //esta respuesta es un obj RESPONSE de fetch con cabeceras(header) y body yo solo quiro body-> q estan las respuestas del servidor
                    let _respuestaServer = await restCliente.ComprobarEmail(
                        emailUser
                    );
                    //para extraer el body tienes metodos del obj RESPONSE -> si es json es .json() -> este metodo te da la promesa de un json inclute el body,su lectura es asincrona
                    let _bodyRespuesta = await _respuestaServer.json();
                    console.log("respuesta del server cuando comprueba si EXISTE EMAIL...",_bodyRespuesta);
                
                    //si el cod es 0 es q hay email
                    if (_bodyRespuesta.codigo === 0) {
                        //y soo eciste mostrar lo de cvontraseña q lo puedes hacer otro componente y redirigir o misma paginsd
                        // y es ocultra una cosa y mostrar una cosa o otra
                        setEmailValido(true);
                        setErrorEmail(""); // Limpiamos el error si el correo exist
                    } else {
                        setEmailValido(false);
                        //lanzo un error --> lo sutyo es qq debajo de la caja del email un error (span ) q el aemail no existe
                        //console.log('El correo electrónico no existe.');
                        setErrorEmail("El correo electrónico no está registrado.");
                        // throw new Error('Email no existe ');
                    }
                } catch (error) {
                    console.log(
                        "error en respuesta servicio de nodejs al comprobar email...",
                        error
                    );
                }
                break;
            //#region este es en vez del HandelFull Login 
            /*
            case "Identifícate": //name = Identifícate
                try {
                    let _respuestaLogin = await restCliente.ComprobarPassword(
                        emailUser,
                        passwordUser
                    );
                    let _bodyLogin = await _respuestaLogin.json();
                    console.log(
                        "Respuesta del servidor al comprobar contraseña:",
                        _bodyLogin
                    );

                    if (_bodyLogin.codigo === 0) {
                        // Aquí se podría redirigir o mostrar un mensaje de éxito
                        console.log("Inicio de sesión exitoso.");
                        // Redireccionar o guardar sesión
                        window.location.href = "https://www.ebay.es"; // Redirigir a la página de eBay
                    } else {
                        console.log(
                            "Error en el inicio de sesión:",
                            _bodyLogin.mensaje
                        );
                        throw new Error(_bodyLogin.mensaje);
                    }
                } catch (error) {
                    console.error(
                        "Error en respuesta servicio de Node.js:",
                        error
                    );
                    throw new Error("Error al iniciar sesión.");
                }
            break;*/
            //#endregion
            case "google":
                break;
            case "facebook":
                break;
            default:
                break;
        }
    }

    async function HandlerFullLogin(){
        //codigo para comprobar en servicio de nodejs si email + password estan ok...

        try {
            let _respLogin=await restCliente.LoginCliente(emailUser, passwordUser); //<---{ codigo:..., mensaje: ...,  datos: { accessToken:..., refreshToken:..., cliente: { ....}} }
            console.log('respuesta del servicio de login de nodejs...', _respLogin);
            
            if (_respLogin.codigo !==0 ) throw new Error('password o email invalidos...intentalo de nuevo');
            
            setAccessToken(_respLogin.datos.accessToken);

            setRefreshToken(_respLogin.datos.refreshToken);
            //setCuentaCliente( _respLogin.datos.cliente.cuenta );
            setCliente( _respLogin.datos.cliente );

            navigate('/');
            
        } catch (error) {
            //mostrar error en vista del componente en rojo....para q intente meter de nuevo password
            console.log('error en login...', error);
        }
    }
    
    return (
        <div className="container-fluid">
            <div className="row mt-4">
                {/* aqui va la primera fila  q seria el logo */}
                <Link to="/">
                    <img src="/images/logo_ebay.png" alt="loge Ebay" />{" "}
                </Link>
            </div>

            {
                /*si es != de true = q email es false*/
                !emailValido ? (
                    //si email es falso
                    <LoginForm
                        emailUser={emailUser}
                        setEmailUser={setEmailUser}
                        HandlerClickBoton={HandlerClickBoton}
                        errorEmail={errorEmail}
                    />
                ) : (
                    //si email es true lo meti en componente
                    <PasswordForm
                        emailUser={emailUser}
                        setPasswordUser={setPasswordUser}
                        //HandlerClickBoton={HandlerClickBoton}
                        HandlerFullLogin={HandlerFullLogin}
                        errorEmail={errorEmail}
                    />
                )
            }
        </div>
    );
}

// segun el elemtto ponerle un icono -> <i class="fa-brands fa-facebook"></i>
//si el elemento es continuar o facebook esta clsae 'btn-primary' sino 'btn-light'

export default Login;
