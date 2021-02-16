import React, { useEffect, useState } from 'react'

const useIdUser = () => {

    const [idUsuario, SetIdUsario] = useState< number | null>(null) 

    const getIdUser = async () => {
        try {
            const id: string | null  = await localStorage.getItem('idUsuario');
            SetIdUsario( id ? JSON.parse(id): null)
        } catch (error) {
            console.log("aqui esta mal puto, dentro de useIdUser")
        }
    }
    useEffect(()=>{
        getIdUser();
    },[idUsuario])

    return {
        idUsuario
    }
}
export default useIdUser;
