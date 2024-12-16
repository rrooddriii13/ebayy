import "./Login.css"
import {  NavLink } from 'react-router-dom';

const LoginForm = ({emailUser,setEmailUser, HandlerClickBoton, errorEmail}) =>{

    return(
        <>
        <div className='row mt-4'>
            <div className='col-4'></div>
            <div className='col-2'><h3>Identificate en tu cuenta</h3></div>
        </div>
        <div className='row mt-4'>
            <div className='col-4'></div>
            <div className='col-2'>
                <span>¿Primera vez en eBay?</span>{' '}<NavLink to='/Cliente/Registro'>Crear una cuenta</NavLink> 
                {/* cambiamos el a por el NavLink */}
            </div>
        </div>
        {/* AQUI LA CAJA DE TEXTO */}
        <div className='row mt-4'>
            <div className='col-4'></div>
            <div className='col-2'>
                <div className="form-floating mb-3">
                    <input type="email"
                        className="form-control"
                        id="txtEmail"
                        placeholder="name@example.com"
                        value={emailUser}
                        onChange={(ev)=> setEmailUser(ev.target.value)}
                    />
                    <label htmlFor="txtEmail">Correo electronico o pseudonimo</label>
                    {errorEmail && <span className="text-danger">{errorEmail}</span>}

                </div>
            </div>
        </div>
        {
            /* para crear botones de Continuar ... un bucle, pero en JSX no puedo pone for ni for each ni nada, necesito funcion .map() de array
            me creo un array  y le recooro con map y va ejecutar la  funcion de transodrmacion q ponga aquique admite 3 parametros 1-> elemtnto del array q se reccore 2->posicion 3-> y todo el array    */
            ["Continuar","facebook","google","apple"].map(
                (elemento,posicion,array)=>{
                    //x cada elemento del array devuelve una nueva fila
                    return <div className='row mt-4'  key= {posicion}>
                        <div className='col-4'></div>
                        <div className='col-2'>
                            <button  
                            name={elemento}//esto es porq name va a valer Continuar ,facebook ,gggole,apppel,,,
                            type='button' 
                            //si el elemento es continuar o facebook esta clsae 'btn-primary' sino 'btn-light'
                            className={`btn w-100 ${elemento === 'Continuar' || elemento==='facebook' ? 'btn-primary' :'btn-light'}`}
                            onClick={HandlerClickBoton}
                            >
                                {/*para meter iconos ps si el elemento es continuar q ponga continuar si np  */}
                                <i className={`fa-brands fa-${elemento} fa-xl `}></i>{'   '}
                                {/* como sale Continuar con Continuar q no slaga eso poner condicion elem distintinto continua  muestra con el elemento q sea*/}
                                Continuar {elemento !== 'Continuar' && `con ${elemento}`}
                            </button>
                                
                        </div>
                    </div>
                }
            )
        }
        </>
    )

}

export default LoginForm;