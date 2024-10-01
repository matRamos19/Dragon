import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DetallePersonaje from './componentes/DetallePersonaje';
import Personajes from './componentes/Personajes';
import DetalleTransformacion from './componentes/DetalleTransformacion';
import BuscarPersonajes from './componentes/BuscarPersonajes'; 
import './App.css';

function App() {
    return (
        <Router>
            <div className='App'>
                <h1>Dragon Ball</h1>
                <nav>
                    <Link to="/personajes">
                        <button>Ver Personajes</button>
                    </Link>
                    <Link to="/buscar">
                        <button>Buscar Personajes</button>
                    </Link>
                </nav>

                <Routes>
                    <Route path='/' element={<Personajes />} />
                    <Route path='/personajes' element={<Personajes />} />
                    <Route path='/personajes/:id' element={<DetallePersonaje />} />
                    <Route path='/transformacion/:id' element={<DetalleTransformacion />} />
                    <Route path="/buscar" element={<BuscarPersonajes />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;
