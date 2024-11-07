import React from 'react';

const ScoreCard = ({ title, value }) => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded shadow-md text-center">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
};

export default ScoreCard;
