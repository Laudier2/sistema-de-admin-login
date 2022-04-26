import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from './components/Cadastro/Cadastro'

const Home = () => {
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Cadastro />} />
        </Routes>
    </BrowserRouter>
}

export default Home;