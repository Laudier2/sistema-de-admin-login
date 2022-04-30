import axios from 'axios'

const api = axios.create({
    baseURL: "http:15.228.82.63" //"https://api-usr.herokuapp.com/"
})

export default api;

export const createSession = async (email, password) => {
    return api.post("/auth", { email, password })
}
