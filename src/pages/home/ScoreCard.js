import React, { useEffect, useState } from 'react';

const ScoreCard = ({ title, value }) => {
    // Estado para el valor animado
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000; // Duración total de la animación en milisegundos
        const increment = value / (duration / 10); // Incremento del valor cada 10ms

        const animate = () => {
            start += increment;
            if (start >= value) {
                start = value;
            }
            setAnimatedValue(Math.floor(start));
        };

        const interval = setInterval(animate, 10);

        // Limpiar el intervalo cuando el efecto se desmonte
        return () => clearInterval(interval);
    }, [value]);

    return (
        <div className="bg-gray-800 text-white p-4 rounded shadow-md text-center">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-2xl font-bold">{animatedValue}</p> {/* Usa el valor animado */}
        </div>
    );
};

export default ScoreCard;
