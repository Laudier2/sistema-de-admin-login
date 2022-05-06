import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppProvider from '../Context/Provaider';
import UserLogin from '../components/User/Login/Login'
import Cadastro from '../components/Cadastro/Cadastro'
import FormularioCadastro from '../components/formulario/FormularioCadastroC';
import { useContext } from 'react';
import AppContext from '../Context/SatateDate'
import './router.css'

const AdminRotas = () => {

    const Private = ({ children }) => {
        const { auth, loading } = useContext(AppContext)

        if (loading) {
            return (
                <div className="container">
                    <img src="lod.gif" alt="img" className="marg" />
                </div>
            )
        }

        if (!auth) {
            return (<Navigate to="/login" />)
        }

        return children

    }

    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Private><Cadastro /></Private>} />
                    <Route exact path="/login" element={<UserLogin />} />
                    <Route exact path="/form" element={<FormularioCadastro />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default AdminRotas;