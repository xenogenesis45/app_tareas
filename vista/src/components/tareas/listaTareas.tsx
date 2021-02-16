import React, { useEffect, useState } from 'react' //useState es un Hook que te permite añadir el estado de React a un componente funcional
//useState es una nueva forma de usar exactamente las mismas funciones que this.state
import { tareas } from './tarea' //importacion de la interface 
import * as  tareasService from './tareasService' //obtiene todos los datos de gamesService
import ItemsTareas from './Itemstareas'// importa gameItems
import useIdUser from '../../hooks/useIdUser'

const ListaTareas = () => {

    const [tarea, setTarea] = useState<tareas[]>([])//componente y se llamana la interface de game que es juegos

    const { idUsuario } = useIdUser()

    const loadTareas = async () => {
        const res = await tareasService.getTareas()//Se crea una constante que es aysn y ahi se le pasa getGame que viene de game service
        setTarea(res.data);// luego se muestra los datos
    }

    useEffect(() => {
        console.log(idUsuario)
        loadTareas()//esto sirve para cuando cree un formulario me mande para la pagina principal
    }, [idUsuario])

    return (
        <div className="container">
            <div className="row">
                {tarea.map((tarea) => {//mapear objetos, modificar la estructura
                    let hideButton: boolean = false
                    if (tarea.idUsuario !== idUsuario) hideButton = true
                    return(
                        <div className="col-4">
                        <ItemsTareas tareas={tarea} key={tarea.idTareas} loadTareas={loadTareas} hideButton={hideButton} />
                    </div>)
                })}
            </div>
        </div>
    )
}

export default ListaTareas