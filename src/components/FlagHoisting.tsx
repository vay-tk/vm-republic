import React, { useState, useRef } from 'react';
import { Flag } from 'lucide-react';

export function FlagHoisting() {
  const [flagPosition, setFlagPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHoisted, setIsHoisted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [birds, setBirds] = useState<Array<{id: number, left: number, delay: number}>>([]);

  const handleRopeDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isHoisted) return;
    
    const container = e.currentTarget.getBoundingClientRect();
    const y = Math.max(0, Math.min(1, (e.clientY - container.top) / container.height));
    const newPosition = 100 - (y * 100);
    
    setFlagPosition(newPosition);
    
    if (newPosition >= 95 && !isHoisted) {
      setIsHoisted(true);
      setFlagPosition(100);
      playAnthem();
    }
  };

  const playAnthem = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
      setIsPlaying(true);
      setConfetti(true);
      const newBirds = Array.from({length: 6}).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setBirds(newBirds);
    }
  };

  return (
    <div className="relative h-[400px] w-full max-w-md mx-auto bg-gradient-to-b from-sky-300 to-sky-100 rounded-lg overflow-hidden shadow-lg">
      {/* Improved Sky Animation */}
      <div className="absolute inset-0">
        {/* Clouds */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-16 bg-white rounded-full blur-md animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 40}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Flying Birds when flag is hoisted */}
        {isHoisted && birds.map(bird => (
          <div
            key={bird.id}
            className="absolute w-3 h-3 animate-fly"
            style={{
              left: `${bird.left}%`,
              top: '20%',
              animationDelay: `${bird.delay}s`
            }}
          >
          </div>
        ))}

        {/* Confetti Effect */}
        {confetti && (
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#FF9933', '#FFFFFF', '#138808'][Math.floor(Math.random() * 3)],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pole */}
      <div className="absolute left-1/2 top-0 w-4 h-full bg-gradient-to-b from-gray-400 to-gray-500 transform -translate-x-1/2 shadow-lg">
        {/* Rope */}
        <div
          className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-gray-600 to-gray-700 cursor-pointer transform -translate-x-1/2 hover:bg-gray-500 transition-colors"
          style={{ height: `${100 - flagPosition}%` }}
          onMouseDown={handleRopeDrag}
          onMouseMove={(e) => e.buttons === 1 && handleRopeDrag(e)}
        />
      </div>

      {/* Flag with Shadow and Wave Animation */}
      <div
        className="absolute left-1/2 w-32 transition-all duration-300 ease-out"
        style={{ 
          top: `${100 - flagPosition}%`,
          transform: `translateX(0%) ${isHoisted ? 'rotate(-2deg)' : 'rotate(0deg)'}`,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }}
      >
        <div className="relative h-20">
          <div className="h-6 bg-[#FF9933] animate-wave" />
          <div className="h-6 bg-white relative animate-wave" style={{ animationDelay: '0.1s' }}>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Flag className="w-6 h-6 text-blue-900" />
            </div>
          </div>
          <div className="h-6 bg-[#138808] animate-wave" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>

      {/* Audio with multiple sources */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)}>
        <source src="https://ac.cf.saavncdn.com/751/e8a2aded5ff7504a985c9e73bcf2b427_160.mp4?Expires=1737862569&Signature=fzBiAxuFB-Ayu7C3xOyTt-Y4x7XGZt3w-qQOeIocDbd3c0Ag2JJwoscsUjsAn0qMAu29Snvxdn2q~oH9NrkggkQJB4k6Ikud-44X7rG3zLFZ2flgZzi6mMDkpzRh5cjS-pBSUxQ~mi5~chXLWIhOnaLDhkeuk3fZgF-3PoOzYNvjOZ5GEbCGchGnTQMxZ4cpL9skq358O7rILeQQd5jpp89tPJ6VZ-ZAzTXdWiQ25rp-XciqGVmD6fFLIYHqMMxaR3eTuKQqVBkL9oOn-1wVCAGsjo7g6G2VbPtWkxkCuA0TTUgwVzza9Ohyu5LOfxDYJtihCgATV5Sumag2QKJ5XA__&Key-Pair-Id=APKAJB334VX63D3WJ5ZQ" type="audio/mpeg" />
        <source src="https://ac.cf.saavncdn.com/751/e8a2aded5ff7504a985c9e73bcf2b427_160.mp4?Expires=1737862569&Signature=fzBiAxuFB-Ayu7C3xOyTt-Y4x7XGZt3w-qQOeIocDbd3c0Ag2JJwoscsUjsAn0qMAu29Snvxdn2q~oH9NrkggkQJB4k6Ikud-44X7rG3zLFZ2flgZzi6mMDkpzRh5cjS-pBSUxQ~mi5~chXLWIhOnaLDhkeuk3fZgF-3PoOzYNvjOZ5GEbCGchGnTQMxZ4cpL9skq358O7rILeQQd5jpp89tPJ6VZ-ZAzTXdWiQ25rp-XciqGVmD6fFLIYHqMMxaR3eTuKQqVBkL9oOn-1wVCAGsjo7g6G2VbPtWkxkCuA0TTUgwVzza9Ohyu5LOfxDYJtihCgATV5Sumag2QKJ5XA__&Key-Pair-Id=APKAJB334VX63D3WJ5ZQ" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Enhanced Instructions */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        {!isHoisted ? (
          <div className="bg-white/90 backdrop-blur-sm py-3 px-6 rounded-full mx-auto max-w-max shadow-lg transform hover:scale-105 transition-transform">
            <p className="text-gray-700 font-medium">
              ↕️ Drag the rope upwards to hoist the flag
            </p>
          </div>
        ) : (
          <div className="bg-green-600/90 backdrop-blur-sm py-3 px-8 rounded-full mx-auto max-w-max shadow-lg animate-pulse">
            <p className="text-white font-bold text-lg">
              {isPlaying ? "जन गण मन... 🎵" : "वन्दे मातरम् 🇮🇳"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}