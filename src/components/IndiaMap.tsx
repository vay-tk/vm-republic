import React, { useState } from 'react';

// Simplified state data
const stateData = {
  maharashtra: {
    name: "Maharashtra",
    culture: "Known for Lavani dance and Warli art",
    event: "Grand parade at Shivaji Park, Mumbai"
  },
  gujarat: {
    name: "Gujarat",
    culture: "Famous for Garba dance and handicrafts",
    event: "Cultural performances at Sabarmati Riverfront"
  },
  kerala: {
    name: "Kerala",
    culture: "Rich in Kathakali and martial arts",
    event: "Boat parade in backwaters"
  },
  // Add more states as needed
};

type StateInfo = {
  name: string;
  culture: string;
  event: string;
};

export function IndiaMap() {
  const [activeState, setActiveState] = useState<StateInfo | null>(null);

  const handleStateHover = (state: string) => {
    setActiveState(stateData[state as keyof typeof stateData] || null);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-auto"
      >
        {/* Simplified map paths - just showing a few states for demonstration */}
        <path
          d="M200,200 L250,200 L250,250 L200,250 Z"
          className="fill-[#FF9933]/20 hover:fill-[#FF9933]/40 stroke-gray-400 cursor-pointer transition-colors"
          onMouseEnter={() => handleStateHover('maharashtra')}
          onMouseLeave={() => setActiveState(null)}
        />
        <path
          d="M150,150 L200,150 L200,200 L150,200 Z"
          className="fill-[#FF9933]/20 hover:fill-[#FF9933]/40 stroke-gray-400 cursor-pointer transition-colors"
          onMouseEnter={() => handleStateHover('gujarat')}
          onMouseLeave={() => setActiveState(null)}
        />
        <path
          d="M250,250 L300,250 L300,300 L250,300 Z"
          className="fill-[#FF9933]/20 hover:fill-[#FF9933]/40 stroke-gray-400 cursor-pointer transition-colors"
          onMouseEnter={() => handleStateHover('kerala')}
          onMouseLeave={() => setActiveState(null)}
        />
      </svg>
      
      {activeState && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">{activeState.name}</h3>
          <p className="text-gray-600 mb-2">{activeState.culture}</p>
          <p className="text-gray-600">Republic Day: {activeState.event}</p>
        </div>
      )}
    </div>
  );
}