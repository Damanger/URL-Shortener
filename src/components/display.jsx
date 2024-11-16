import React from "react";
import { useLocation } from "react-router-dom";

const DisplayData = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const data = JSON.parse(decodeURIComponent(queryParams.get("data")));

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Datos del Motociclista</h2>
            <p><strong>Nombre:</strong> {data.riderName}</p>
            <p><strong>Edad:</strong> {data.riderAge}</p>
            <p><strong>Tipo de Sangre:</strong> {data.bloodType}</p>
            <p><strong>Contacto de Emergencia:</strong> {data.emergencyContact}</p>
            <button onClick={() => window.print()}>Descargar como Imagen</button>
        </div>
    );
};

export default DisplayData;
