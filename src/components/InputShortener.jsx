import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const InputShortener = ({ setInputValue }) => {
    const [value, setValue] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        const url = 'https://tinyurl.com/api-create.php';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `url=${encodeURIComponent(value)}`
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Failed to shorten URL');
        })
        .then(data => {
            setShortenedUrl(data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <div className="InputContainer">
            <h1>URL <span>Shortener</span></h1>
            <div>
                <input type="text" placeholder="Type a link to shorten it!" value={value} onChange={e => setValue(e.target.value)} />
                <button onClick={handleClick}>Shorten</button>
            </div>
            {shortenedUrl && (
                <div className='result'>
                    <p>{shortenedUrl}</p>
                    <CopyToClipboard text={shortenedUrl} onCopy={handleCopy}>
                        <button className={copied ? "copied" : ""}>{copied ? "Copied!" : "Copy to clipboard"}</button>
                    </CopyToClipboard>
                </div>
            )}
        </div>
    );
}

export default InputShortener;
