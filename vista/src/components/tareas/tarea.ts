export interface tareas {
    idTareas? : string;
    nombreTarea : string;
    fecha: string;
    estado: string;
    idUsuario?: any;
}

export interface login {
    idUsuario?: string;
    correo: string;
    contraseña: string;
}

export interface createUser {
    idUsuario?: string;
    nombre: string;
    apellido: string;
    correo: string;
    contraseña: string;
}
