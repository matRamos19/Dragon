import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './DetallePersonaje.css';

function DetallePersonaje() {
    const { id } = useParams();
    const [personaje, setPersonaje] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://dragonball-api.com/api/characters/${id}`);
                setPersonaje(response.data);
            } catch (error) {
                setError("Hay problemas al cargar los personajes: " + error.message);
            } finally {
                setCargando(false);
            }
        };

        fetchData();
    }, [id]);

    if (cargando) return <p>CARGANDO....</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="detalle-personaje">
            <img  className ="pri" src={personaje.image} alt={personaje.name} />
            <div className="texto-personaje">
                <h2>{personaje.name}</h2>
                <p>Ki: <strong>{personaje.ki}</strong></p>
                <p>Max Ki: <strong>{personaje.maxKi}</strong></p>
                <p>Raza: <strong>{personaje.race}</strong></p>
                <p>Género: <strong>{personaje.gender}</strong></p>
                <p>Descripción: {personaje.description}</p>
            </div>
            <div className="go">
                <h3>Transformaciones</h3>
            </div>
            <div className="transformaciones">
                <ul>
                    {personaje.transformations.map(transformation => (
                        <li key={transformation.id}>
                            <Link to={`/transformacion/${transformation.id}`}>
                                <h2>{transformation.name}</h2>
                                <img src={transformation.image} alt={transformation.name} />
                                <p>Ki: {transformation.ki}</p>

                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DetallePersonaje;
