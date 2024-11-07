import React from 'react';
import ScoreCard from "./ScoreCard";

const Metrics = () => {
    const metrics = [
        { title: 'Libros Disponibles', value: '50,000' },
        { title: 'Autores', value: '20,000' },
        { title: 'Comentarios', value: '10,000' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            {metrics.map(metric => (
                <ScoreCard key={metric.title} title={metric.title} value={metric.value} />
            ))}
        </div>
    );
};

export default Metrics;
