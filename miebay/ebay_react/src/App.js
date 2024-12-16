//componente raiz de react 
import './App.css';
import { createBrowserRouter , RouterProvider } from 'react-router-dom'//import { createBrowserRouter,  Navigate, RouterProvider } from 'react-router-dom'

import Login from './componentes/zonaCliente/loginComponent/Login'
import Registro from './componentes/zonaCliente/registroComponent/Registro'
import Layout from './componentes/zonaTienda/layoutComponent/Layout';
import MostrarProducto from './componentes/zonaTienda/mostrarProductoComponent/MostrarProducto';
import Productos from './componentes/zonaTienda/productosComponent/Productos';
import Principal from './componentes/zonaTienda/principalComponent/Principal';
import ComprarProductoYa from './componentes/zonaTienda/comprarProductoYaComponent/ComprarYa'; 

import restTienda from './servicios/restTienda';


//array de objetos Route a pasar al metodo createBrowserRouter(...); 
//cada obj Route representa la carga de un componente ante una URL del navegador
const _routerObject=createBrowserRouter(
	[
		
		//ruta para el layout
		{
			element: <Layout></Layout>,
			loader:restTienda.DevolverCategorias,// ojo no la ejecuto es el puntero ala definicion xq aqui va la definicion de una funcion no la ejecucion de la funcion
			children:[
				{ path:'/', element: <Principal></Principal>},//,element:<Navigate to='/Tienda/Productos' />    },
				{ path:'/Tienda/Productos/:catId', element: <Productos></Productos>,loader: restTienda.RecuperarProductosFromCat },
				{ path: '/Tienda/MostrarProducto/:idProd',element: <MostrarProducto></MostrarProducto>, loader: restTienda.RecuperarProducto}
				  /*loader: async function({req,params}) { //desestructuras 
					let _idproducto = params.idProd;
					return null;					
				  }*/
					
				
			]
		},
		//COMPONNETE que quieres cargar ante esa ruta (url)
		{ path: '/Tienda/ComprarYa', element: <ComprarProductoYa></ComprarProductoYa> },
		//{ path: '/Tienda/ComprarYa/:idProd', element: <ComprarProductoYa></ComprarProductoYa>, loader: restTienda.RecuperarProducto },
		{path:'/Cliente/Login',element: <Login></Login>}, //si la rita es /Cliente/Login  me cargas el elemento Login 
		{ path:'/Cliente/Registro', element: <Registro></Registro>},

	]
);


//define componente App  el codigo jsx es lo q pinta 
function App() {
	return (
		<>
			<RouterProvider router={_routerObject}/>
		</>
	);
}

export default App;
