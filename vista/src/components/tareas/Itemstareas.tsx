import React from 'react'
import { tareas } from './tarea'
import { useHistory } from 'react-router-dom'// HISTORY una implementación específica de DOM, útil en los navegadores web que admiten la API de historial HTML5
import * as tareasService from './tareasService'

interface ItemsTareaProps {
    tareas: tareas;
    loadTareas: () => void;
    hideButton?: boolean; //Existe la propiedad pero no la estoy usando 
    receiveTaskId?: any;//Función que actualiza en el padre el id que se quiere modificar
}

const ItemsTareas = (props: ItemsTareaProps) => {

    const history = useHistory()

    const handleDelete = async (id: string) => {
        if (window.confirm("¿Seguro que desea elminar la tareas?")) {
            await tareasService.deleteTareas(id);
            props.loadTareas();
            alert("La tarea se elmino")
        } else {
        }
    }

    return (
        <div className="col-md-4 mb-4">
            <div className=" card-group w-100 h-100 mr-4">
                <div className="card mt-3">
                    <div className=" card-body " style={{ cursor: 'pointer' }} >
                        <div className=" card-title">
                            <h1>{props.tareas.nombreTarea}</h1>
                            <span className="d-flex justify-content-between " onClick={() => props.tareas.idTareas && handleDelete(props.tareas.idTareas)}>
                                ❌
                        </span>
                        </div>
                        <p>{props.tareas.estado}</p>
                        <p>{props.tareas.fecha}</p>
                        <div className="p-2 text-center" style={{ display: props.hideButton ? 'none' : 'block' }}>
                            <button  className="btn btn-primary" color="primary" onClick={() => props.receiveTaskId(props.tareas)}>Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ItemsTareas;
