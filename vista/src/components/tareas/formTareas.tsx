//import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { tareas } from './tarea';
import * as tareasService from './tareasService'
import { useHistory, useParams } from 'react-router-dom'// React Router ,nos permite construir una aplicación web de una sola página con navegación sin que la página se actualice mientras el usuario navega.

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface Params {
    id: string;
}

const TareaForm = () => {

    const history = useHistory()
    const params = useParams<Params>();//Se ve por consola los parametros que van llegando

    const inicialState: tareas = {
        nombreTarea: "",
        fecha: "",
        estado: "",
        idUsuario: ""
    };

    const [task, setTareas] = useState<tareas>(inicialState);

    const handleInputChange = (e: any) => {
        setTareas({ ...task, [e.target.name]: e.target.value })

    }
    
    //Crear tarea
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {//FormEvent<HTMLFormElement> le dara una lista de matrices con formato de html
        let idUser = localStorage.getItem('idUsuario');
        idUser = idUser ? idUser : '';
        var x = { ...task, idUsuario: idUser }
        e.preventDefault();
        if (!params.id) {
            const res = await tareasService.createTareas(x);
            setTareas(inicialState);
            history.push(`/contenido/${idUser}`);
        } else {
            await tareasService.updateTareas(params.id,x)
        }
    }

    const getTareas = async (id: string) => {
        const res = await tareasService.unaTarea(id)
        const { nombreTarea, fecha, estado } = res.data;
        setTareas({ nombreTarea, fecha, estado })
    }

    useEffect(() => {//, le estamos indicando a React que el componente tiene que hacer algo después de renderizarse. la llamará más tarde después de actualizar el DOM.
        if (params.id) getTareas(params.id)
    }, [])

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4 mt-5">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" name="nombreTarea" value={task.nombreTarea} placeholder="nombre de la tarea" className="form-control" onChange={handleInputChange} />
                            </div>
                            <select className="custom-select form-group" name="estado" value={task.estado} onChange={(event: any) => handleInputChange(event)}>
                                <option value="activo">Activo</option>
                                <option value="pendiente">Pendiente </option>
                                <option value="realizado">Realizado </option>
                            </select>
                            <div className="form-group">
                                <input type="date" name="fecha" value={task.fecha} placeholder="fecha" className="form-control" onChange={handleInputChange} />
                            </div>
                            {
                                params.id ?
                                    <button className="btn btn-info btn-block">Actualizar Tarea</button>
                                    :
                                    <button className="btn btn-primary btn-block">Guardar</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TareaForm