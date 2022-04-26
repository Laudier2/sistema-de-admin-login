import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3001" //"https://api-usr.herokuapp.com/"
})

export default api;

export const createSession = async (email, password) => {
    return api.post("/auth", { email, password })
}
