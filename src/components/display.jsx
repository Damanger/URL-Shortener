import React from "react";
import { useLocation } from "react-router-dom";

const DisplayData = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const dataString = queryParams.get("data");

    // Verificar si 'data' existe y está correctamente codificado
    let data = {};
    try {
        if (dataString) {
            data = JSON.parse(decodeURIComponent(dataString));
        }
    } catch (error) {
        console.error("Error al parsear los datos del QR:", error);
    }

    // Si no hay datos, muestra un mensaje
    if (!data || !data.riderName) {
        return <div style={{ padding: "20px", textAlign: "center" }}>No se encontraron datos válidos.</div>;
    }

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
