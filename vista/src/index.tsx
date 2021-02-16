import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginUser from './components/tareas/login '
import Registro from './components/tareas/registro'
import UserContent from './components/tareas/userContent'
import TareaForm from './components/tareas/formTareas'

 
import { Navbar } from './components/navbar/navbar'
// import 'bootswatch/dist/yeti/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
      <div className="container">
        <Switch>
          <Route exact path="/" component={LoginUser} /> //Exact: exactparámetro deshabilita la coincidencia parcial de una ruta y se asegura de que solo devuelva la ruta si la ruta es una coincidencia EXACTA con la URL actual.
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/contenido/:id" component={UserContent} />
          <Route exact path="/crearTarea" component={TareaForm} />
          <Route exact path="/update/:id" component={TareaForm} />
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
