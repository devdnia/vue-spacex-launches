const API_URL = 'http://localhost:3001/launches'

export const getLaunches = async () => {
    const resp = await fetch(API_URL)
    const data = await resp.json()
    return data
}

// http://localhost:3000/launches?mission_id=EE86F74
export const getLaunch = async (id) => {
    const url = `${API_URL}/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    return data
}

export const deleteLaunch = async (id) => {
    const url = `${API_URL}/${id}`
    await fetch(url, {
        method: 'DELETE',
    });
    const data = await getLaunches();
    return data;
};

export const updateLaunch = async ( id, updateLaunch ) => {
    const url = `${API_URL}/${id}`

    try {
        const resp = await fetch(url, {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify( updateLaunch ),
        })
    
        if( !resp.ok ){
            throw new Error(`No se pudo actualizar el lanzamiento. Código de estado: ${resp.status}`)
        }
        const data = await resp.json()
    
        return data
        
    } catch (error) {
        console.error('Error al actualizar el lanzamiento:', error);
        throw error;
    }
}

export const createLaunch = async (newLaunch) => {
    const resp = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLaunch)
    });
    return resp.json();
}
