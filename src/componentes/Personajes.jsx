import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Personajes() {
    const [personajes, setPersonajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const limit = 5; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://dragonball-api.com/api/characters?page=${paginaActual}&limit=${limit}`);
                setPersonajes(response.data.items);
                setTotalPaginas(response.data.meta.totalPages);
            } catch (error) {
                setError('Hubo un problema al cargar los personajes');
            } finally {
                setCargando(false);
            }
        };

        fetchData();
    }, [paginaActual]);

    const adelante = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const atras = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    if (cargando) return <p>Cargando Personajes...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            
            
            <div className="personajes-grid">
                {personajes.map((personaje) => (
                    <Link
                        to={`/personajes/${personaje.id}`} 
                        key={personaje.id}
                        className="personaje-card"
                    >
                        <img src={personaje.image} alt={personaje.name} />
                        <h3>{personaje.name}</h3>
                        <p>{personaje.ki ? `Ki: ${personaje.ki}` : `Ki no disponible`}</p>
                        <p>{personaje.race ? `Raza: ${personaje.race}` : `Raza no disponible`}</p>
                        <p>{personaje.gender ? `Género: ${personaje.gender}` : `Género no disponible`}</p>
                    </Link>
                ))}
            </div>

            <div className="pagination">
                <button onClick={atras} disabled={paginaActual === 1}>
                    Anterior
                </button>
                <span>Página {paginaActual} de {totalPaginas}</span>
                <button onClick={adelante} disabled={paginaActual === totalPaginas}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default Personajes;
