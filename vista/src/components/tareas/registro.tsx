import React, { ChangeEvent, useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { login, tareas, createUser } from './tarea';
import * as tareasService from './tareasService'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface Params {
    id: string;
}

const Registro = () => {
    
    const history = useHistory();
    const params = useParams<Params>();

    const inicialUser: createUser = {
        correo: "",
        contraseña: "",
        nombre: "",
        apellido: ""
    }
    const [register, setRegistro] = useState<createUser>(inicialUser);

    const handleInputChange = (e: InputChange) => {
        setRegistro({ ...register, [e.target.name]: e.target.value })
    }

    // crear usuario 
    const handleClick = async (e: any) => {
        console.log(register);
        if (register.nombre != "" && register.nombre != null
            && register.apellido != "" && register.apellido != null
            && register.correo != "" && register.correo != null
            && register.contraseña != "" && register.contraseña != null) {
            const total: createUser = {
                nombre: register.nombre,
                apellido: register.apellido,
                correo: register.correo,
                contraseña: register.contraseña
            }//Objetos de register
            const res = await tareasService.registerUser(total);
            console.log("por aqui esta pasando el crear un formulario")
            setRegistro(inicialUser);
            console.log(total);
            alert('felicidades se ah registado')
            history.push('/');
        } else {
            alert('Porfavor verifique los campos')
        }
    }

    return (
        <div>
            <div className="card col-md-4 offset-md-4 mt-5">
                <div className="card-body">
                    <h5 className="card-title">Crear usuario</h5>
                    <form>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="name" name="nombre" value={register.nombre} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input type="lastname" name="apellido" value={register.apellido} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Correo</label>
                            <input type="email" name="correo" value={register.correo} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="contraseña" value={register.contraseña} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div>
                            <button type ="button" className="btn btn-success mt-2 justify-content-md-center" onClick={handleClick} role="button" aria-pressed="true">CREAR CUENTA</button >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Registro