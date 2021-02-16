import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { tareas } from './tarea';
import * as tareasService from './tareasService';
import useIdUser from '../../hooks/useIdUser';
import ItemsTareas from '../tareas/Itemstareas'
import './vista.css';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface Params {
    id: string;

}

const UserContent = () => {

    const history = useHistory();
    const params = useParams<Params>();
    const { idUsuario } = useIdUser();


    const inicialComent: tareas[] = [
        {
            nombreTarea: "",
            estado: "",
            fecha: "",
            idUsuario: ""
        }
    ]

    const inicialState: tareas = {
        nombreTarea: "",
        fecha: "",
        estado: "",
        idUsuario: ""
    };


    const [myTask, setMyTask] = useState<any>([])
    const [isError, setIsError] = useState<boolean>(false)
    const [task, setTareas] = useState<tareas>(inicialState);

    const handleInputChange = (e: any) => {
        setTareas({ ...task, [e.target.name]: e.target.value })
    }

    //obtener la tarea del id
    const getMyTareas = async () => {
        try {
            const res = await tareasService.getMyTareasIdUser(idUsuario)
            setMyTask(res.data)
            const validate = res.data;
            if (validate.length === 0) {
                console.log("aqui entro")
                return setIsError(true)
            }
            setIsError(false);
        } catch (error) {
            console.log(error)
            setIsError(true);
        }
    }

    //Crear tarea
    const handleSubmit = async (e: any) => {//FormEvent<HTMLFormElement> le dara una lista de matrices con formato de html
        let idUser = localStorage.getItem('idUsuario');
        idUser = idUser ? idUser : '';
        var x = { ...task, idUsuario: idUser }
        e.preventDefault();
        if (task.idTareas) {//Se le pasa el id de la tarea, que se va actualizar 
            await updateTareas(task)
            if (idUsuario) getMyTareas();//Se lama las tareas y las remplaza 
            setTareas(inicialState)//se le pasa el inicialState que contiene los campos de texto vacios
        } else {
            const res = await tareasService.createTareas(x);// se le pasa la variable x que obtiene el id del usuario
            setTareas(task);
            if (idUsuario) getMyTareas();
            setTareas(inicialState)//aqui se limpia las cajas de textos usadas
        }
    }

    const getTareas = async (id: string) => {
        const res = await tareasService.unaTarea(id)
        const { nombreTarea, fecha, estado, idTareas } = res.data;
        setTareas({ nombreTarea, fecha, estado, idTareas })
    }

    const updateTareas = async (task: tareas) => {
        console.log(task)
        if (task.idTareas) {
            const res = await tareasService.updateTareas(task.idTareas, task)
            setTareas(task)
        }
    }

    useEffect(() => {
        if (idUsuario) getMyTareas();
    }, [idUsuario])//variable de dependecia

    return (
        <div className="container">
            <div className="row">
                {
                    isError ? (<h1 className=" text-center">No tienes juegos guardados </h1>) :
                        myTask.map((tarea: tareas) => {
                            let hideButton: boolean = false
                            if (tarea.idUsuario !== idUsuario) hideButton = true
                            return <ItemsTareas receiveTaskId={updateTareas} tareas={tarea} key={tarea.idTareas} loadTareas={getMyTareas} hideButton={hideButton} />
                        })
                }
            </div>
            <div className="thisFooter" >
                <div className="col-md-4 offset-md-4 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="text" name="nombreTarea" value={task.nombreTarea} placeholder="nombre de la tarea" className="form-control" onChange={handleInputChange} />
                                </div>
                                <select className="custom-select form-group" name="estado" value={task.estado} onChange={(event: any) => handleInputChange(event)}>
                                    <option >Seleccione un estado</option>
                                    <option value="activo">Activo </option>
                                    <option value="pendiente">Pendiente </option>
                                    <option value="realizado">Realizado </option>
                                </select>
                                <div className="form-group">
                                    <input type="date" name="fecha" value={task.fecha} placeholder="fecha" className="form-control" onChange={handleInputChange} />
                                </div>
                                {
                                    task.idTareas ?
                                        <button className="btn btn-info btn-block" >Actualizar tarea</button>
                                        :
                                        <button className="btn btn-info btn-block">create tarea</button>
                                }
                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default UserContent
