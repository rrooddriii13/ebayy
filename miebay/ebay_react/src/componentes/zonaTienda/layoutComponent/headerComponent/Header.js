import './Header.css'
import { useState, useEffect,useMemo} from 'react'
import { NavLink,Link } from 'react-router-dom';

import restTienda from '../../../../servicios/restTienda';

import useGlobalStore from '../../../../hooks_personalizados/hook_store_zustland/storeGlobal';

function Header( { categorias } ) {
    
    //en variable categorias hay un array de objetos tipo categoria
    //con este formato: { _id:.., nombreCategoria:..., pathCategoria: ...}
    //ej cat: Electronica--->Portatiles .>  pathCategoria-> me dice si es categoria pincipal o sub 
    //             1       -     2

    
    //----------------- variables state global ---------------------------
    const cliente = useGlobalStore(state=> state.cliente);

    
    //----------------- variables state local ----------------------------
    const [ categoriaSelec, setCategoriaSelect ]=useState(null);
    const [ subCategoriasCache, setSubCategoriasCache ]=useState({}); //<---- en cache meto un objeto asi, con props las categorias raiz, y como valor sus subcategorias: {  '1': [ ....], '2': [....] }
    const [ timerCats, setTimerCats]=useState(null); //<--- timer delay  para cuando selecciones una categoria muestre subcats y puedas pinchar sobre ellas cuando pierde el foco la categ.del navbar seleccionada

    
    const subcategorias=useMemo(
        ()=>{
                return subCategoriasCache[categoriaSelec] || [];
        },[ categoriaSelec, subCategoriasCache ] //<---las subcategorias se recargan o recalculan cuando o cambio de foco de categoria ppal y cambia variable categoriaSelec o cuando el objeto de subCategoriasCache ha cambiado (por haber cambiado de categ.principal y meter en el mismo las nuevas subcategorias q no exisitan almacenadas por el efecto)
    )
        
    useEffect(
        ()=>{  
            //el efecto ahora solo sirve para actualizar las subcategorias q hay en la cache, no para cargar directamente las subcategorias y pintarlas, estableciendo una variable del state subcategorias como teniamos antes
            //necesito invocar servicio restTienda para recuperar subcategorias de la categoria seleccionada....siempre y cuando no esten en el objeto se subcategoriasCache

            //funcion q se ejecuta para recuperar laas subcategorias 1º nivel de una categoria prinvipal
            if (categoriaSelec && ! subCategoriasCache[categoriaSelec]) {
                restTienda.DevolverCategorias(
                                            { 
                                                request:null,
                                                subcats:{//params:{ 
                                                    pathCategoria: categoriaSelec 
                                                }
                                            } 
                                        )
                    .then( subcategorias => { 
                                            console.log('subcategorias recuperadas....', subcategorias);  
                                            setSubCategoriasCache( { ...subCategoriasCache,  [categoriaSelec]: subcategorias } );                                
                                        }
                        )
                    .catch( error => console.log('error al obtener subcategorias...', error) );
                }
        }, [categoriaSelec,subCategoriasCache]
    )

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-2">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTop" aria-controls="navbarTop" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex flex-row justify-content-between" id="navbarTop">
                        <div>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">

                                {
                                    cliente.cuenta ? 
                                    (
                                        <div className="dropdown">
                                                <a className="btn btn-light btn-sm dropdown-toggle" href="/Cliente/Panel/Inicio" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    ! Hola {cliente.cuenta.email}
                                                </a>

                                                <ul class="dropdown-menu">
                                                    <li>
                                                    <div className="card mb-3 border-light" style={{'maxWidth': '160px;'}}>
                                                    <div class="row g-0">
                                                        <div class="col-md-4">
                                                            <img src={cliente.cuenta.imagenAvatar} class="img-fluid rounded-start" alt="..."/>
                                                        </div>
                                                        <div class="col-md-8">
                                                        <div class="card-body">
                                                            <h6 className="card-title">{cliente.cuenta.nombre} {cliente.cuenta.apellidos}</h6>
                                                                <p className="card-text">
                                                                    <Link to='/Cliente/Panel/Inicio'><span className='text-small'>Configuracion de la cuenta</span></Link>
                                                                    <br/>
                                                                    {/* al desconectarse el clietne debemos limpiar global-store */}
                                                                    <Link to='/'><span className='text-small'>Desconectarse</span></Link>

                                                                </p>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    </li>
                                                    
                                                </ul>
                                        </div>                        
                                    )
                                    :(
                                        <span>
                                        ¡Hola,{" "}
                                        <a className="nav-link identi" style={{ display: "inline", padding: "0", margin: "0" }} href="/Cliente/Login">
                                            identificate
                                        </a>
                                
                                        </span>


                                    )
                                }
                                </li>
                                <li className="nav-item drop-down">
                                    <NavLink className="nav-link drop-down-toggle" href="#"  id="ofertasEbay" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ofertas de Ebay</NavLink>
                                    <ul className="dropdown-menu" aria-labelledby="ofertasEbay">
                                        {/*-- Aquí irían los productos de interés */}
                                    </ul>

                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" href="#sell">Ayuda</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" href="#dashboard">Vender</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" to="/Cliente/Panel/ListaSeguimiento" id="listaSeguimiento" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Lista de seguimiento
                                    </NavLink>
                                    <ul className="dropdown-menu" aria-labelledby="listaSeguimiento">
                                        {/*-- Aquí irían los productos de interés */}
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" to="/Cliente/Panel/MiEbay" id="miEbayDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        MiEbay
                                    </NavLink>
                                    <ul className="dropdown-menu " aria-labelledby="miEbayDropdown">
                                        <li><Link className="dropdown-item" to="#recent">Vistos recientemente</Link></li>
                                        <li><Link className="dropdown-item" to="#bids">Pujas y ofertas</Link></li>
                                        <li><Link className="dropdown-item" to="#watchlist">Lista de seguimiento</Link></li>
                                        <li><Link className="dropdown-item" to="#watchlist">Historial de compras</Link></li>
                                        <li><Link className="dropdown-item" to="#selling">En Venta</Link></li>
                                        <li><Link className="dropdown-item" to="#selling">Busquedas guardadas</Link></li>
                                        <li><Link className="dropdown-item" to="#selling">Vendedores guardados</Link></li>
                                        <li><Link className="dropdown-item" to="#selling">Mi garaje</Link></li>
                                        <li><Link className="dropdown-item" to="#selling">Mensajes</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" href="#dashboard">Notificaciones</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" href="#cart"><i className="bi bi-cart3"></i></NavLink>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>

            <div className="container mt-3">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png" alt="eBay Logo" height="40"/>
                    </div>
                    <div className="col">
                        <form className="d-flex">
                            <div className="input-group">
                                <input className="form-control form-control-borderless" type="search" placeholder="Buscar artículos"/>
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Todas las categorías</button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    {
                                       /*-- Aquí irían las categorías */                                     
                                       categorias && categorias.map(
                                                    cate=>{//pos)=>{
                                                        return (  
                                                            //cuando esyoy recooriendo bucle con map te exige read q les pongas una clave q los  identifique de forma unica xq si no aparecebn wearning clave unica podemos usar indice -> pos p el _id
                                                                <li  key={cate._id}>{/* key= pos */}
                                                                    <Link  className='dropdown-item' to={`/Tienda/Productos/${cate._id}`}>
                                                                        {cate.nombreCategoria}
                                                                    </Link>
                                                                </li>
                                                            )
                                                        }
                                                    )                                       
                                    }
                                </ul>
                            </div>
                            <div>
                                 <button className="btn btn-primary" type="submit">Buscar</button>
                            </div>
                        </form>
                    </div>
                </div>
                
                {/* navbar con categorias principales.... */}
                <div className='row mt-3'>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <ul className="navbar-nav">
                                {
                                    categorias && categorias.map(
                                      
                                        el=>{
                                            return <li className="nav-item"
                                                        key={el._id}
                                                        /*onMouseOver={ ()=> setCategoriaSelect( el.pathCategoria) }
                                                        onMouseLeave={ ()=> setCategoriaSelect(null) }     */
                                                        onMouseEnter={ ()=> { if(timerCats !== null) { console.log('valor de timerCats...', timerCats); window.clearTimeout(timerCats)} ; setCategoriaSelect( el.pathCategoria); } }
                                                         onMouseLeave={ ()=> { console.log('onmouseleave de CATS....');  const _timerId=setTimeout( ()=> setCategoriaSelect(null), 5000); setTimerCats(_timerId); } }          
                                                    >
                                                        {/* <Link className="nav-link active" to={`/Tienda/Productos/${el._id}`}>{el.nombreCategoria}</Link> */}
                                                        <Link className="nav-link active" to={`/Tienda/Productos/${el.pathCategoria}`}>{el.nombreCategoria}</Link>

                                                    </li>        
                                        }
                                    )
                                }
                            </ul>

                             {/* Contenedor Subcategorías que se muestran al hacer hover sobure una categoria*/}
                             {categoriaSelec  && (
                                <div className="position-absolute mt-2 p-3 border rounded bg-white shadow" 
                                        style={{
                                            top: '100%',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            zIndex: 1000,
                                            width: '80%', // Ajusta el ancho según sea necesario
                                        }}
                                        
                                        onMouseEnter={ ()=> setCategoriaSelect(categoriaSelec) }
                                        onMouseLeave={ ()=> setCategoriaSelect(null) }
                                >
                                <div className="row">
                                    <div className="col-md-4">
                                        <ul className="list-unstyled">
                                        {
                                            subcategorias && subcategorias.length > 0 ?
                                           (
                                                subcategorias.map( sub => (
                                                                            <li key={sub._id}>
                                                                                {/* <Link to={`/Tienda/Productos/${sub._id}`} className="text-decoration-none">{sub.nombreCategoria}</Link> */}
                                                                                <Link to={`/Tienda/Productos/${sub.pathCategoria}`} className="text-decoration-none">{sub.nombreCategoria}</Link>

                                                                            </li>
                                                                        )
                                                                )
                                            ) :
                                            (
                                                <li>No hay subcategorías disponibles</li>
                                            )
                                        }
                                        </ul>

                                    </div>
                                    <div className="col-md-8">
                                        <img src={categorias.find( cat=>cat.pathCategoria===categoriaSelec).imagen|| 'placeholder.jpg'} 
                                             alt={categorias.find( cat=>cat.pathCategoria===categoriaSelec).nombreCategoria}
                                             className='img-fluid' />
                                    </div>
                                   
                                </div>
                                </div>
                            )}                        
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
