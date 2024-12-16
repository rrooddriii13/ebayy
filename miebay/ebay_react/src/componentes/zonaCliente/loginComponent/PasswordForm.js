import "./Login.css"

const PasswordForm = ({emailUser, setPasswordUser,HandlerFullLogin,errorEmail}) => {
    return (
        <>
            <div className="row mt-4">
                <div className="col-4"></div>
                <div className="col-2">
                    <h3>Hola de nuevo</h3>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-4"></div>
                <div className="col-2">
                    <span>{emailUser}</span> <a href="/">Cambiar de cuenta</a>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-4"></div>
                <div className="col-2">
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="txtPassword"
                            onChange={(ev) => setPasswordUser(ev.target.value)}
                           // en la paSSWORD cuando hago clik le paso el email  y la passweord a node y node va a devolver 
                            //la respuesta si esta bn  la cuenta bla bal
                        />
                        <label htmlForfor="txtPassword">Cortraseña</label>
                        {errorEmail && <span className="text-danger">{errorEmail}</span>}

                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-4"></div>
                <div className="col-2">
                    <button 
                    type="button" 
                    name='Identifícate'
                    id='Identifícate'
                    className="btn w-100 "
                    //onClick={HandlerClickBoton}
                    onClick={HandlerFullLogin}
                    >
                        Identifícate
                    </button>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-4"></div>
                <div className="col-2">
                    <a href="/">Restablecer Contraseña</a>
                </div>
            </div>
        </>
    );
};

export default PasswordForm;