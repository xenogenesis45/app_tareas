import React, { ChangeEvent, FormEvent, useState, useEffect, Component } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from './tarea';
import * as tareasService from './tareasService'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

const LoginUser = () => {

    const history = useHistory();

    interface Params {
        id: string;
    }
    const loginUser: login = {
        correo: "",
        contraseña: ""
    }
    const [login, setLogin] = useState<login>(loginUser);

    const handleInputChange = async (e: InputChange) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    // Consulta de usuario Validacion de inicio de sesion
    const loginClick = async (e: any) => {
        if (login.correo != "" && login.correo != null && login.contraseña != "" && login.contraseña != null) {
            const res: login[] = await tareasService.consult(login)
            console.log(res)
            if (res.length == 1) {
                localStorage.setItem('idUsuario', `${res[0].idUsuario}`);
                setLogin(login);
                history.push(`/contenido/${res[0].idUsuario}`);
                alert("ingreso al formulario")
            } else {
                alert("usuario o contraseña inválido")
            }
        } else {
            alert("rellene los campos de texto")
        }
    }
    return (
        <div>
            <div className="card col-md-4 offset-md-4 mt-5">
                <div className="card-body">
                    <h5 className="card-title">Inicio de sesion</h5>
                    <form>
                        <div className="form-group">
                            <label>Correo</label>
                            <input type="user" name="correo" value={login.correo} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input type="password" name="contraseña" value={login.contraseña} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="justify-content-center">
                            <a href="#" className="btn btn-success btn-lg active" onClick={loginClick} role="button" aria-pressed="true">Iniciar sesión</a>
                        </div>
                        <div className="mt-4 text-center" >
                            <Link to="/registro" type="button">CREAR CUENTA</Link>
                        </div>
                        <div className="mt-4 text-center" >
                            <Link to="/recuperar_contraseña" type="button" >¿Olvidaste tu contraseña?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginUser
