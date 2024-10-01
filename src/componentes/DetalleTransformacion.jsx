import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetallePersonaje.css'; 

function DetalleTransformacion() {
    const { id } = useParams();
    const [transformacion, setTransformacion] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://dragonball-api.com/api/transformations/${id}`)
            .then(response => {
                setTransformacion(response.data);
            })
            .catch(error => {
                console.error(error);
                setError("Hay problemas al cargar la transformación.");
            })
            .finally(() => {
                setCargando(false);
            });
    }, [id]);

    if (cargando) return <p>CARGANDO....</p>;
    if (error) return <p>{error}</p>;
    if (!transformacion) return <p>No se encontró la transformación.</p>;

    return (
        <div className="detalle-transformacion">
            <h2 className="texto-transformacion">{transformacion.name}</h2>
            <img src={transformacion.image} alt={transformacion.name} />
            <p className="ki-text">Ki: {transformacion.ki}</p>
           
        </div>
    );
}

export default DetalleTransformacion;
