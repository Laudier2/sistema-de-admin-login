import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { createSession } from '../api/api';
import ConsumeContextData from './SatateDate'

const AppProvider = ({ children }) => {

    /**
     * Aqui estou usando o useState para guarda o estado, ou melhor dizendo os valores.
     * Que iremos receber da requisição via axios, para que assim eu possa usar aqui ou em outro componente via props 
   */
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    /**
     * Aqui abaixo esto usando um hook do react que o useEffect para uma função asincrona
     * e dentro desta função estou utilizando o axios para fazer uma requisição get,
     * e assim listarmos os produtos na tela.
    */

    //const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const req = await api.get('/')
            setUsers(req.data)
        })()
    }, [])

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user')

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser))
        }

        setLoading(false)
    }, [])

    const [user, setUser] = useState(null)

    const login = async (email, password, _id) => {

        const response = await createSession(email, password, _id)

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