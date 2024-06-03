import React from 'react';
const CandidateCard = ({ candidate, isSelected, onSelect }) => {
    return (
        <div
            className={`bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform transition-transform ${
                isSelected ? 'border-4 border-blue-500 scale-105' : 'border'
            } w-64`}
            onClick={onSelect}
        >
            <img src={candidate.photo} alt={`${candidate.firstName} ${candidate.lastName}`} className="w-full h-40 object-contain" />
            <div className="p-4">
                <h3 className="text-xl font-bold">{candidate.firstName} {candidate.lastName}</h3>
                <p>Email: {candidate.email}</p>
                <p>Phone: {candidate.phone}</p>
                <p>Status: {candidate.status}</p>
            </div>
        </div>
    );
};

export default CandidateCard;