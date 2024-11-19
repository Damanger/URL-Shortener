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
            <h2 style={{color:"white"}}>Datos de la persona</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Campo</th>
                        <th style={styles.th}>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([key, value]) => (
                        <tr key={key}>
                            <td style={styles.td}><strong>{formatLabel(key)}:</strong></td>
                            <td style={styles.td}>{value || "No especificado"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
    table: {
        width: "100%",
        marginTop: "1rem",
        borderCollapse: "collapse",
        textAlign: "center",
    },
    th: {
        padding: "10px",
        backgroundColor: "gold",
        borderBottom: "2px solid #ddd",
        color: "#333",
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
        color: "white",
    },
};

export default DisplayData;
