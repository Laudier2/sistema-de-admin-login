import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FormularioCadastro from '../components/formulario/FormularioCadastro';
import AppProvider from '../Context/Provaider';
import UserLogin from '../components/User/Login/Login'
import Cadastro from '../components/Cadastro/Cadastro'
import { useContext } from 'react';
import AppContext from '../Context/SatateDate'

const AdminRotas = () => {

    const Private = ({ children }) => {
        const { auth, loading } = useContext(AppContext)

        if (loading) {
            return <div>Carregando...</div>
        }

        if (!auth) {
            return <Navigate to="/login" />
        } else {
            return children
        }
    }

    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Cadastro />} />
                    <Route exact path="/login" element={<UserLogin />} />
                    <Route exact path="/form" element={<FormularioCadastro />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default AdminRotas;