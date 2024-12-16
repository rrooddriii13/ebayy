//modulo js q exporta hook para usar global state creado por store de zustland

import { create} from 'zustand';


//creamos el state global mediante un store de zustand usando la funcion create()
//admite un unico parametro q es la funcion creadora de dicho store; esta funcion creadora
//del state global tiene 3 parametros a su  vez: set, get, store
//esta funcion debe devolver un objeto q va a representar el state global de la aplicacion
// -set es una funcion para cambiar el valor del objeto del state global
// -get es una funcion para recuperar el valor del objeto del state global
// -store es un objeto q representa los valores q exporta el hook y q pueden usar los componentes...


//en react los hopok se llama con use 
const useGlobalStore = create(
    (set,get,store)=>{
        console.log('parametros de funcion creadora del state global mediante store...', set.toString(), get.toString(), store);

        ///lo q devuelve esta funcion es lo q se almacena en el state gloval

        //en el obj q se devuelve se usan propiedades pata recuperar valores para q los usen los componentes para mostrr en vistas .... 
        // y si los componentes necesitan actualizar algun valor  defines funciones(metodos) dentro del objeto q usan la funcion set 

        return{
            //este obj q devuelbe  va a estar disponible para todos los componentes q lo usan con useGlobalStore
            accessToken: '',//lo meto vacia hasta q se loggeen 
            refreshToken: '',
            cliente: {},
            itemsPedido: [],//array q almacena producto,cantidad rodvuto cantidad...
            comprarYa: { },         
            //cuando te logeas bn node te da un acces y refresh ps quiero una funcion para q meta arriba el accestoken y refrestoken 
            setAccessToken: jwt => set( state => ( { accessToken: jwt } ) ), 
            setRefreshToken: jwt => set( state => ( { refreshToken: jwt} ) ),
            setPedido: pedido => set( state => ( { ...state, pedido: {...state.pedido, ...pedido } } )),
            setCliente: datoscliente => set(state => ( { ...state, cliente: { ...state.cliente, ...datoscliente } } ))
            //#region esto estaria mal, pq estas mutandoel objeto cliente y apunta a la misma referencia en ram...no estas construyendo uno nuevo!!!
            /*setCuentaCliente: (datosCuenta)=>set( 
                                            state=> {
                                                const {email,nombre,apellidos,activada,imagenAvatar,nick}=datosCuenta;                                                        
                                                return { cliente.cuenta={ email,nombre,apellidos,activada,imagenAvatar,nick} }
                                                }
                                            )*/
            //#endregion

            /*
            setCuentaCliente: datosCuenta => set( 
                                                state => {
                                                    const { email,nombre,apellidos,activada,imagenAvatar,nick }=datosCuenta;
                                                    return{
                                                        ...state,
                                                        cliente: {
                                                                ...state.cliente,
                                                                cuenta : {
                                                                        ...state.cliente.cuenta,
                                                                        email, //email:email
                                                                        nombre,//nombre:nombre
                                                                        apellidos: apellidos,
                                                                        activada:activada,//activada, 
                                                                        imagenAvatar: imagenAvatar,
                                                                        nick: nick //nick 
                                                                }
                                                        }
                                                    }
                                                }                                  
            )
            */
        }
    }
); 

export default useGlobalStore;