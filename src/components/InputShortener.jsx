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
  const [personName, setPersonName] = useState("");
  const [personAge, setPersonAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergyOption, setAllergyOption] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicationOption, setMedicationOption] = useState("");
  const [medications, setMedications] = useState("");
  const [qrDataReady, setQRDataReady] = useState(false);
  const [qrUrl, setQRUrl] = useState("");
  const [error, setError] = useState("");

  const handleGenerateQR = () => {
    // Validación de todos los campos
    if (
      !emergencyContact ||
      !personName ||
      !personAge ||
      !bloodType ||
      !allergyOption ||
      !medicationOption
    ) {
      setError("Por favor, complete todos los campos requeridos.");
      return;
    }

    // Validación de número de contacto (10 a 12 dígitos)
    if (!/^\d{10,12}$/.test(emergencyContact)) {
      setError("El número de contacto debe tener entre 10 y 12 dígitos.");
      return;
    }

    // Validación de edad (0 a 99 años)
    if (personAge < 0 || personAge > 99) {
      setError("La edad debe estar entre 0 y 99.");
      return;
    }

    setError(""); // Limpia el error si todos los campos son válidos

    // Genera el objeto con los datos
    const data = {
      emergencyContact,
      personName,
      personAge,
      bloodType,
      allergies: allergyOption === "Sí" ? allergies : "No",
      medications: medicationOption === "Sí" ? medications : "No",
    };

    // Genera la URL del QR con los datos
    const dataString = encodeURIComponent(JSON.stringify(data));
    setQRUrl(`https://qr-generator-and-url-shortener.vercel.app/display?data=${dataString}`);
    setQRDataReady(true);
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
            width: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <select
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              border: "2px solid #FFD700",
              borderRadius: "5px",
              backgroundColor: "#333",
              color: "#FFD700",
              fontWeight: "bold",
              appearance: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "200px",
            }}
            onChange={(e) => setIsSelected(e.target.value)}
          >
            <option value="contenido">URL Shortener</option>
            <option value="password">Password Generator</option>
            <option value="qrData">Emergency Contact QR</option>
          </select>

          {/* Flecha personalizada */}
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #FFD700",
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
          <div
            className="card"
            style={{
              position: "absolute",
              top: "50vh",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "1rem",
              maxWidth: "fit-content",
              maxHeight: "35rem",
              overflow: "auto",
              boxSizing: "border-box",
            }}
          >
            <h1>
              Contacto<span style={{ color: "gold" }}> de Emergencia</span>
            </h1>

            {error && (
              <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1rem",
              }}
            >
              {/* Input fields */}
              <div>
                <label>Contacto de emergencia:</label>
                <input
                  type="number"
                  placeholder="Número de contacto"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value.slice(0, 12))}
                  style={{ width: "80%", padding: "0.5rem", marginTop: "0.5rem" }}
                />
              </div>
              <div>
                <label>Nombre de la persona:</label>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  style={{ width: "80%", padding: "0.5rem", marginTop: "0.5rem" }}
                />
              </div>
              <div>
                <label>Edad de la persona:</label>
                <input
                  type="number"
                  placeholder="Edad"
                  value={personAge}
                  onChange={(e) => setPersonAge(e.target.value)}
                  style={{ width: "80%", padding: "0.5rem", marginTop: "0.5rem" }}
                />
              </div>
              <div>
                <label>Tipo de sangre:</label>
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  style={{ width: "85%", padding: "0.5rem", marginTop: "0.5rem" }}
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
              <div>
                <label>¿Alergias?</label>
                <select
                  value={allergyOption}
                  onChange={(e) => setAllergyOption(e.target.value)}
                  style={{ width: "85%", padding: "0.5rem", marginTop: "0.5rem" }}
                >
                  <option value="" disabled>
                    ¿Tiene alergias?
                  </option>
                  <option value="No">No</option>
                  <option value="Sí">Sí</option>
                </select>
              </div>
              {allergyOption === "Sí" && (
                <div>
                  <label>Especifica las alergias:</label>
                  <textarea
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    style={{
                      width: "85%",
                      padding: "0.5rem",
                      marginTop: "0.5rem",
                      resize: "vertical",
                    }}
                  ></textarea>
                </div>
              )}
              <div>
                <label>¿Toma algún medicamento?</label>
                <select
                  value={medicationOption}
                  onChange={(e) => setMedicationOption(e.target.value)}
                  style={{ width: "85%", padding: "0.5rem", marginTop: "0.5rem" }}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="No">No</option>
                  <option value="Sí">Sí</option>
                </select>
              </div>
              {medicationOption === "Sí" && (
                <div>
                  <label>Especifica los medicamentos:</label>
                  <textarea
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    style={{
                      width: "85%",
                      padding: "0.5rem",
                      marginTop: "0.5rem",
                      resize: "vertical",
                    }}
                  ></textarea>
                </div>
              )}
            </div>
            <button
              onClick={handleGenerateQR}
              style={{
                marginTop: "1rem",
                backgroundColor: "gold",
                padding: "0.5rem",
                color: "black",
                width: "100%",
              }}
            >
              Generar QR
            </button>
            {qrDataReady && (
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <QRCode value={qrUrl} fgColor={qrColor} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InputShortener;
