import React, { useEffect, useState } from 'react';
//import api from '../api/api';
//import { createSession } from '../api/api';
import ConsumeContextData from './SatateDate'
import { toast } from 'react-toastify';
import axios from 'axios';

const api = axios.create({
    baseURL: "http:localhost:3000"//"https://api-usr.herokuapp.com/"
})

const createSession = async (email, password) => {
    return api.post("http://localhost:3000/auth", { email, password })
}

const AppProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const req = await axios.get("http://localhost:3000/")
            setUsers(req.data)
        })()
    }, [])

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser))
            api.defaults.headers.Authorization = `Bearer ${token}`
        }

        setLoading(false)
    }, [])

    console.log(users)

    const login = async (email, password) => {

        const response = await createSession(email, password)

        //console.log('login auth', response.data)

        toast.success("Login efetuado com sucesso, aguarde mais uns segubdos...")

        const loggedUser = response.data.data.email
        const token = response.data.data.token
        const imagem = response.data.data.imagem
        const name = response.data.data.name
        //const token = response.data.data.

        //console.log(imagem)

        localStorage.setItem('user', JSON.stringify(loggedUser))
        localStorage.setItem('imagem', JSON.stringify(imagem))
        localStorage.setItem('name', JSON.stringify(name))
        localStorage.setItem('token', token)
        //localStorage.setItem('token', id)

        api.defaults.headers.Authorization = `Bearer ${token}`

        setUser(loggedUser)
    }

    const logout = () => {
        console.log('Logout')
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('imagem')
        localStorage.removeItem('name')
        api.defaults.headers.Authorization = null;
    }

    return (
        <ConsumeContextData.Provider value={{ users, auth: !!user, user, loading, login, logout }}>
            {children}
        </ConsumeContextData.Provider>
    );
}

export default AppProvider;