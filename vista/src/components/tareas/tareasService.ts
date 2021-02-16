import axios from 'axios'
import { login, tareas, createUser } from './tarea'

const api = 'http://bbab0af273bd.ngrok.io' //puerto donde se ejecuta la api

// const api = 'http://8f2cef4c9f5e.ngrok.io'

////////////////////////Login/////////////////////////

export const consult = async (user: login) => {
    return await (await axios.post<login[]>(`${api}/api/login/user`,user)).data;
}
export const todosUsuario = async () => {
    return await axios.get<login>(`${api}/api/login/user`);
}
export const getUser = async (id: string) => {
    return await axios.get<login>(`${api}/api/login/user${id}`);
}

///////////// Regtistro //////////////////////////// 

export const registerUser = async (user: createUser) => {
    return await axios.post(`${api}/api/crearuser`, user); //Crear usuario
}

////////////////// tareas ///////////////////////////////////

export const getTareas = async () => {
    return await axios.get<tareas[]>(`${api}/api/tareas`);//GET: El método GET  solicita una representación de un recurso específico. 
    //console.log(res);
}
export const createTareas = async (tarea: tareas) => {
    return await axios.post(`${api}/api/tareas`, tarea); //POST: El método POST se utiliza para enviar una entidad a un recurso en específico
    //console.log(res);
}
export const unaTarea = async (id: string) => {
    return await axios.get<tareas>(`${api}/api/tareas/${id}`);////GET: El método GET  solicita una representación de un recurso específico.(Solo busca una consulto)
    //console.log(res);
}
export const updateTareas = async (id: string, tarea: tareas) => {
    return await axios.put<tareas>(`${api}/api/tareas/${id}`, tarea);//PUT: El modo PUT reemplaza todas las representaciones actuales del recurso de destino con la carga útil de la petición.
    //console.log(res);
}
export const deleteTareas = async (id: string) => {
    return await axios.delete<tareas>(`${api}/api/tareas/${id}`);//DELETE: El método DELETE borra un recurso en específico.

}
export const getMyTareasIdUser = async (id: number | null) => {
    return await axios.get<any>(`${api}/api/tareas/idUser/${id}`);////GET: El método GET  solicita una representación de un recurso específico.(Solo busca una consulto)
    //console.log(res);
}