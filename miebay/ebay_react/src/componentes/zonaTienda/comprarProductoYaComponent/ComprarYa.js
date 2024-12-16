import './ComprarYa.css'
//import { Link, useLoaderData } from 'react-router-dom'
import { Link } from 'react-router-dom'
//import { useState } from 'react'

import MetodosPago from './metodosPagoComponent/MetodosPago';
import DireccionEnvio from './direccionComponent/Direccion';
import RevisarPedido from './revisarPedidoComponent/RevisarPedido';

import ItemsPedido from '../itemsPedidoComponent/ItemsPedido';
import useGlobaStore from '../../../hooks_personalizados/hook_store_zustland/storeGlobal';

function ComprarProductoYa(){
    //2 formas de hacerlo:
    // -1º forma: volver a pet.detalles del producto usando loader de comp. MOstrarProducto y manejar en state local el pedido con itempadido de un unico producto y su cantidad 
    // -2º forma: para no volver a hacer pet.rest a servicio nodejs y reuperar de nuevo oooootra vez el producto, meterlo en objeto dentro de objeto pedido en global store en propiedad "comprarya"
    //con formato: { producto: ...., cantidad: 1 }
    /*
	const producto=useLoaderData();

    const [pedidoComprarYa, setPedidoComprarYa ]=useState(
                                                             {
                                                                itemsPedido: [ { producto, cantidad: 1}],
                                                                metodoPago: {},
                                                                subtotal: 0,
                                                                gastosEnvio: 0,
                                                                total: 0
                                                            } 
                                                        );
	*/

	//2 forma
    const cliente=useGlobaStore(state => state.cliente);
    const pedido=useGlobaStore(state => state.pedido);
    const setPedido=useGlobaStore(state => state.setPedido);
  
  
    return (
      <div className="container mt-5">
        {/* imgaen logo y cabecera */}
        <div className=" d-flex flex-row justify-content-between">
            <div className='d-flex flex-row align-items-center'> 
              <Link to="/"><img src='/images/logo_ebay.png' alt='loge Ebay'/> </Link> 
              <h4><strong>Pago y envio</strong></h4>
            </div>
            <div>
              <p>¿Te gusta el servicio Pago y envio? <a href='/'>Danos tu opinion</a></p>
            </div>
        </div>

        <div className="row mt-4">    
          {/* columna para metodos pago, envio, etc*/}        
          <div className="col-8">
                <h4 >Pagar con</h4>          
                {/* Métodos de Pago */}
                <div className="mb-4">
                  {/* <MetodosPago ></MetodosPago> */}
				  <MetodosPago modificarPedido={setPedido}></MetodosPago>
                </div>

                { /* Detalles de Direccion Envío Cliente */}
                {/* <DireccionEnvio direc={ {calle:'c/ mayor 3', municipio:'Alcala de Henaeres', provincia:'Madrid', cp:'28803', pais:'España'} } cuenta={ { telefono:'677112233',email:'prueba@prueba.es', nombre:'pepe', apellidos:'guiterrez'} }></DireccionEnvio> */}
                <DireccionEnvio direc={ cliente.direcciones.filter(dir=>dir.esPrincipal)[0] } cuenta={ cliente.cuenta }></DireccionEnvio>

                {/* Revisar Pedido */}
                <div className="mb-4">
                  <h4>Revisar pedido</h4>
                  {/* <RevisarPedido itemPedido={ pedidoComprarYa.itemsPedido[0]  } modificarItem={ setPedidoComprarYa } ></RevisarPedido>               */}
				  <RevisarPedido itemPedido={ pedido.comprarYa  } modificarPedido={ setPedido } ></RevisarPedido>              

                </div>
          </div>

          {/*columna para resumen y confirmar pago */}
          <div className="col-4">
              <h4 className="mb-4">Resumen del pedido</h4>  
              {/* <ItemsPedido pedidoComprar={ pedidoComprarYa }></ItemsPedido> */}
			  <ItemsPedido pedido={ pedido } cliente={cliente}></ItemsPedido>

          </div>
        </div>
  
  
  
      </div>
    );
}

export default ComprarProductoYa