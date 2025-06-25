import React, { useEffect, useState } from 'react';

const App = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log("Fetching API...");
        fetch('/api/example')
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);
                setMessage(data.message);
            })
            .catch(error => console.error("Erreur API:", error));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Hello, React with Laravel 12!</h1>
            <p>{message ? `Message de l'API : ${message}` : 'Chargement du message...'}</p>
        </div>
    );
};

export default App;
