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

    // Si no hay datos válidos, muestra un mensaje
    if (!data || Object.keys(data).length === 0) {
        return (
            <div style={styles.container}>
                <p>No se encontraron datos válidos.</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2>Datos de la persona</h2>
            <div style={styles.dataContainer}>
                {Object.entries(data).map(([key, value]) => (
                    <p key={key}>
                        <strong>{formatLabel(key)}:</strong> {value || "No especificado"}
                    </p>
                ))}
            </div>
            <button onClick={() => window.print()} style={styles.downloadButton}>
                Descargar como Imagen
            </button>
        </div>
    );
};

// Función para formatear claves en etiquetas legibles
const formatLabel = (label) => {
    return label
        .replace(/([A-Z])/g, " $1") // Agrega un espacio antes de cada mayúscula
        .replace(/^./, (str) => str.toUpperCase()); // Capitaliza la primera letra
};

// Estilos en objeto
const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
    },
    dataContainer: {
        textAlign: "left",
        display: "inline-block",
        marginTop: "1rem",
    },
    downloadButton: {
        backgroundColor: "gold",
        padding: "0.5rem 1rem",
        border: "none",
        cursor: "pointer",
        color: "black",
        marginTop: "1rem",
    },
};

export default DisplayData;
