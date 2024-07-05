import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import QRCode from "qrcode.react";

const InputShortener = ({ setInputValue }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [value, setValue] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrColor, setQrColor] = useState("#000000"); // Color por defecto: negro
  const [selectedOption, setSelectedOption] = useState("8");
  const [generatedPassword, setGeneratedPassword] = useState("");

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

  const generatePassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%*><./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleGenerate = () => {
    const length = parseInt(selectedOption, 10);
    const password = generatePassword(length);
    setGeneratedPassword(password);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas"); // Obtener el elemento canvas del QR
    const qrImageUrl = canvas.toDataURL("image/png"); // Obtener la URL de la imagen del QR
    const downloadLink = document.createElement("a"); // Crear un elemento <a> para descargar
    downloadLink.href = qrImageUrl;
    downloadLink.download = "qr_code.png"; // Nombre del archivo a descargar
    document.body.appendChild(downloadLink); // Agregar el elemento al DOM
    downloadLink.click(); // Simular el clic en el enlace para iniciar la descarga
    document.body.removeChild(downloadLink); // Eliminar el elemento del DOM después de la descarga
  };

  return (
    <>
      <div>
        <select onChange={(e) => setIsSelected(e.target.value === "password")}>
          <option value="contenido">URL Shortener</option>
          <option value="password">Password Generetor</option>
        </select>
        {isSelected ? (
          <div>
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

            <button onClick={handleGenerate} style={{ marginTop: "1rem" }}>
              Generate
            </button>
          </div>
        ) : (
          <div className="card">
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
              <button onClick={handleClick} style={{ marginBottom: "1rem" }}>
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
                      <button className={copied ? "copied" : ""}>
                        {copied ? (
                          <i className="material-icons">done</i>
                        ) : (
                          <i className="material-icons">content_copy</i>
                        )}
                      </button>
                    </CopyToClipboard>
                    <button className="Btn" onClick={handleDownload}>
                      <i className="material-icons">cloud_download</i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InputShortener;
