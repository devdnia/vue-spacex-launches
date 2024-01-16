const API_URL = 'http://localhost:3000/launches'

export const getLaunches = async () => {
    const resp = await fetch( API_URL )
    const data = await resp.json()
    return data
}

// http://localhost:3000/launches?mission_id=EE86F74
export const getLaunch = async ( id ) => {
    const url = `${API_URL}/?mission_id=${id}`
    const resp = await fetch( url )
    const data = await resp.json()
    return data
}