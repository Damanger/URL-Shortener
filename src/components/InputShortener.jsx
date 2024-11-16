import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import QRCode from "qrcode.react";
import "../App.css";

const InputShortener = ({ setInputValue }) => {
  const [isSelected, setIsSelected] = useState("contenido");
  const [value, setValue] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrColor, setQrColor] = useState("#000000");
  const [selectedOption, setSelectedOption] = useState("8");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [riderName, setRiderName] = useState("");
  const [riderAge, setRiderAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [qrDataReady, setQrDataReady] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  const handleGenerateQR = () => {
    if (emergencyContact && riderName && riderAge && bloodType) {
      const data = {
        emergencyContact,
        riderName,
        riderAge,
        bloodType
      };
      // Generar una URL dinámica para los datos
      const url = `https://qr-generator-and-url-shortener.vercel.app/display?data=${encodeURIComponent(JSON.stringify(data))}`;
      setQrDataReady(true);
      setQrUrl(url); // Guardamos la URL generada
    } else {
      setQrDataReady(false);
      alert("Por favor, completa todos los campos.");
    }
  };

  const handleClick = () => {
    const url = "https://tinyurl.com/api-create.php";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${encodeURIComponent(value)}`,
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error("Failed to shorten URL");
      })
      .then((data) => {
        setShortenedUrl(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleGenerate = () => {
    const length = parseInt(selectedOption, 10);
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%*><./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setGeneratedPassword(password);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    const qrImageUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = qrImageUrl;
    downloadLink.download = "qr_code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <div>
        <div
          style={{
            position: "absolute",
            top: "5rem",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto", // Asegura que el contenedor tenga el tamaño adecuado
            display: "flex",
            alignItems: "center",
          }}
        >
          <select
            style={{
              padding: "0.5rem 1rem", // Espaciado interno
              fontSize: "1rem", // Tamaño de fuente
              border: "2px solid #FFD700", // Borde dorado
              borderRadius: "5px", // Bordes redondeados
              backgroundColor: "#333", // Fondo oscuro
              color: "#FFD700", // Color de texto dorado
              fontWeight: "bold", // Fuente en negrita
              appearance: "none", // Elimina el estilo predeterminado del select
              cursor: "pointer", // Cambia el cursor al pasar por encima
              transition: "all 0.3s ease", // Transición suave para cambios
              width: "200px", // Establecer un ancho fijo para el select
            }}
            onChange={(e) => setIsSelected(e.target.value)}
          >
            <option value="contenido">URL Shortener</option>
            <option value="password">Password Generator</option>
            <option value="qrData">QR Data</option>
          </select>

          {/* Flecha personalizada */}
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none", // Asegura que no interfiera con la selección
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #FFD700", // Color dorado para la flecha
            }}
          />
        </div>

        {/* URL Shortener Section */}
        {isSelected === "contenido" && (
          <div className="card"
            style={{
              position: "absolute",
              top: "50vh",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
            <div className="InputContainer">
              <h1>
                URL <span style={{ color: "gold" }}>Shortener</span>
              </h1>
              <input
                type="text"
                placeholder="Type a link to shorten it!"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{
                  marginRight: "1rem",
                  fontSize: "1rem",
                  width: "15rem",
                }}
              />
              <button onClick={handleClick}
                style={{
                  marginTop: "1rem",
                  backgroundColor: "gold",
                  padding: "0.5rem",
                  color: "black",
                }}>
                Shorten
              </button>
              <div className="color-picker">
                <label htmlFor="color">Choose QR Color: </label>
                <input
                  type="color"
                  id="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                />
              </div>
              {shortenedUrl && (
                <div
                  className="result"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p style={{ color: "gold", fontWeight: "bold" }}>
                    {shortenedUrl}
                  </p>
                  <QRCode
                    value={shortenedUrl}
                    fgColor={qrColor}
                    style={{ marginBottom: "1rem" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CopyToClipboard
                      text={shortenedUrl}
                      onCopy={handleCopy}
                      style={{ marginRight: "1rem" }}
                    >
                      <button
                        className={copied ? "copied" : ""}
                        style={{
                          marginTop: "1rem",
                          backgroundColor: "gold",
                          padding: "0.5rem",
                        }}>
                        {copied ? (
                          <i className="material-icons">done</i>
                        ) : (
                          <i className="material-icons">content_copy</i>
                        )}
                      </button>
                    </CopyToClipboard>
                    <button className="Btn"
                      onClick={handleDownload}
                      style={{
                        marginTop: "1rem",
                        backgroundColor: "gold",
                        padding: "0.5rem",
                        color: "black",
                      }}
                    >
                      <i className="material-icons">cloud_download</i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Password Generator Section */}
        {isSelected === "password" && (
          <div className="card"
            style={{
              position: "absolute",
              top: "50vh",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
            <h1>
              Password <span style={{ color: "gold" }}>Generator</span>
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="Generated password"
                value={generatedPassword}
                readOnly
                style={{
                  textAlign: "center",
                  height: "2rem",
                  width: "100%",
                  fontSize: "1rem",
                }}
              />
              <CopyToClipboard
                text={generatedPassword}
                onCopy={handleCopy}
                style={{ marginRight: "1rem" }}
              >
                <button
                  className={copied ? "copied" : ""}
                  disabled={!generatedPassword}
                  style={{
                    marginTop: "1rem",
                    backgroundColor: "gold",
                    padding: "0.5rem",
                    color: "black",
                  }}
                >
                  {copied ? (
                    <i className="material-icons">done</i>
                  ) : (
                    <i className="material-icons">content_copy</i>
                  )}
                </button>
              </CopyToClipboard>
            </div>
            <div>
              <input
                type="radio"
                id="8digits"
                name="digits"
                value="8"
                checked={selectedOption === "8"}
                onChange={handleChange}
              />
              <label htmlFor="8digits">8 digits</label>
            </div>
            <div>
              <input
                type="radio"
                id="16digits"
                name="digits"
                value="16"
                checked={selectedOption === "16"}
                onChange={handleChange}
              />
              <label htmlFor="16digits">16 digits</label>
            </div>
            <div>
              <input
                type="radio"
                id="32digits"
                name="digits"
                value="32"
                checked={selectedOption === "32"}
                onChange={handleChange}
              />
              <label htmlFor="32digits">32 digits</label>
            </div>
            <button onClick={handleGenerate}
              style={{
                marginTop: "1rem",
                backgroundColor: "gold",
                padding: "0.5rem",
                color: "black",
              }}>
              Generate
            </button>
          </div>
        )}

        {/* QR Data Section */}
        {isSelected === "qrData" && (
          <div className="card"
            style={{
              position: "absolute",
              marginTop: "10vh",
              top: "50vh",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
            <h1>
              Generar QR con <span style={{ color: "gold" }}>datos del Motociclista</span>
            </h1>
            <div style={{ marginBottom: "1rem" }}>
              <label>Contacto de emergencia:</label>
              <input
                type="number"
                placeholder="Número de contacto"
                value={emergencyContact}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 10);
                  setEmergencyContact(value);
                }}
                style={{ width: "80%", padding: "0.5rem", marginTop: "0.5rem" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Nombre del motociclista:</label>
              <input
                type="text"
                placeholder="Nombre completo"
                value={riderName}
                onChange={(e) => setRiderName(e.target.value)}
                style={{ width: "80%", padding: "0.5rem", marginTop: "0.5rem" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Edad del motociclista:</label>
              <input
                type="number"
                placeholder="Edad"
                value={riderAge}
                onChange={(e) => setRiderAge(e.target.value)}
                style={{ width: "80%", padding: "0.5rem", marginTop: "0.5rem" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Tipo de sangre:</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                style={{ width: "90%", padding: "0.5rem", marginTop: "0.5rem" }}
              >
                <option value="" disabled>
                  Selecciona un tipo de sangre
                </option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <button
              onClick={handleGenerateQR}
              style={{
                marginTop: "1rem",
                backgroundColor: "gold",
                padding: "0.5rem",
                color: "black",
              }}
            >
              Generar QR
            </button>
            {qrDataReady && (
              <QRCode
                value={qrUrl}
                fgColor={qrColor}
                style={{ marginTop: "1rem" }}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InputShortener;
