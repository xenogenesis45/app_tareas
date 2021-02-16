import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'// para hacer rutas desde el navegador 
//Link crea un hipervínculo que nos permite navegar por nuestra aplicación.
import { login } from '../tareas/tarea'
import * as tareasService from '../tareas/tareasService'

export const Navbar = () => {

    const history = useHistory();

    interface Paramas {
        id: string;
    }

    const incialState: login = {
        contraseña: "",
        correo: ""
    }

    const valores: any = {
        "": [
            { url: "/" }
        ], 
        "registro": [
            { url: "/registro" }
        ],
        "contenido": [
            { url: "/contenido" }
        ],
        "crearTarea": [
            { url: "/crearTarea", nombre: "crear tarea" }
        ],
        "update": [
            { url: "/update", nombre: "actualizar formulario" },
        ]
    }
    const paramas = useParams<Paramas>();

    const [array, setArray] = useState<Paramas[]>([]);
    const [user, setUser] = useState<login>(incialState);

    const getUser = async (id: string) => {
        const res = await tareasService.getUser(id)
        const { correo, contraseña } = res.data;
        setUser ({ correo, contraseña })
      }

    useEffect(() => {
        return history.listen((location) => {
            const arrPath: any = location.pathname.split("/");
            const arrItems = valores[arrPath[1]]
            setArray(arrItems);
        });
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container">
                <Link className="navbar-brand text-light" to="/">Salir</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {
                            array.map((obj: any) => {
                                return (
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to={obj.url} ><h5>{obj.nombre}</h5></Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
