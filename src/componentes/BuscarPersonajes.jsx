import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BuscarPersonajes() {
    const [personajes, setPersonajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [termino, setTermino] = useState("");

    useEffect(() => {
        const fetchAllCharacters = async () => {
            const allCharacters = [];
            try {
                const totalPagesResponse = await axios.get("https://dragonball-api.com/api/characters");
                const totalPages = totalPagesResponse.data.meta.totalPages;

                for (let i = 1; i <= totalPages; i++) {
                    const response = await axios.get(`https://dragonball-api.com/api/characters?page=${i}`);
                    allCharacters.push(...response.data.items);
                }
                setPersonajes(allCharacters);
            } catch (error) {
                setError('Hubo un problema al cargar los personajes');
            } finally {
                setCargando(false);
            }
        };

        fetchAllCharacters();
    }, []);

    const manejarCambio = (e) => {
        setTermino(e.target.value);
    };


    const personajesFiltrados = personajes.filter((personaje) =>
        personaje.name.toLowerCase().includes(termino.toLowerCase())
    );

    if (cargando) return <p>Cargando Personajes...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Buscar Personajes de Dragon Ball</h2>
            <div className="barra-busqueda">
                <input
                    type="text"
                    placeholder="Escribe el nombre del personaje..."
                    value={termino}
                    onChange={manejarCambio}
                />
            </div>
            <div className="personajes-grid">
                {personajesFiltrados.length > 0 ? (
                    personajesFiltrados.map((personaje) => (
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
                    ))
                ) : (
                    <p>No se encontraron personajes.</p>
                )}
            </div>
        </div>
    );
}

export default BuscarPersonajes;
