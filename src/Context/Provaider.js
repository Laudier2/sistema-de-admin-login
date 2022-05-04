import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { createSession } from '../api/api';
import ConsumeContextData from './SatateDate'
import { toast } from 'react-toastify';
//import { useNavigate } from 'react-router-dom'

const AppProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const req = await api.get('/')
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


    const login = async (email, password) => {

        const response = await createSession(email, password)
        toast.success("Login realizado com sucesso")

        console.log('login auth', response.data)

        const loggedUser = response.data.data.email
        const token = response.data.data.token
        //const token = response.data.data.

        localStorage.setItem('user', JSON.stringify(loggedUser))
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
        api.defaults.headers.Authorization = null;
    }

    return (
        <ConsumeContextData.Provider value={{ users, auth: !!user, user, loading, login, logout }}>
            {children}
        </ConsumeContextData.Provider>
    );
}

export default AppProvider;