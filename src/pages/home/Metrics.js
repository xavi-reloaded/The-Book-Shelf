import React, {useContext} from 'react';
import ScoreCard from "./ScoreCard";
import {BooksContext} from "../../contexts/BooksProvider";

const Metrics = () => {


    const {booksState:{stats}} = useContext(BooksContext);

    const metrics = [
        { title: 'Libros Disponibles', value: stats.totalBooks||0 },
        { title: 'Autores', value: stats.totalAuthors },
        { title: 'Comentarios', value: 0 },
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
