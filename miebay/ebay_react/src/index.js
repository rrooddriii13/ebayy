import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import Registro from './componentes/zonaCliente/registroComponent/Registro';
//import Login from './componentes/zonaCliente/loginComponent/Login';

//Aquí es donde el componente raíz (App) se inyecta en el DOM HTML y comienza a ejecutarse.
/*
ReactDOM.createRoot: Obtiene el elemento HTML con id="root" y lo convierte en el contenedor raíz de la aplicación.
root.render: Este método inserta el componente <App /> en el DOM dentro de <div id="root">, 
usando <React.StrictMode> para ayudar en la detección de problemas potenciales durante el desarrollo.*/
//se define una especie de variable de tipo constante q lo q hace es ejecurta funcuion 
//q coge el id = root  y mete deentro el componente app es decir en el div id=root  va a meter
  
/* <Registro  /> */
 /* <App />     <Registro  username='* introduce tu login' password='* introduce tu password' />*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Login/> */}
    <App/>
  </React.StrictMode>
);

//registro va a tener un atributo username  y password
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

