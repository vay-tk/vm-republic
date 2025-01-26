import React, { useState, useEffect } from 'react';
import { Flag, MapPin, Book, Play, Download, Brain } from 'lucide-react';
import { IndiaMap } from './components/IndiaMap';
import { FlagHoisting } from './components/FlagHoisting';
import { ECardCreator } from './components/ECardCreator';

function App() {
  const [yearsCount, setYearsCount] = useState(0);
  const [statesCount, setStatesCount] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Animate counters
    const yearInterval = setInterval(() => {
      setYearsCount(prev => prev < 74 ? prev + 1 : prev);
    }, 50);

    const stateInterval = setInterval(() => {
      setStatesCount(prev => prev < 28 ? prev + 1 : prev);
    }, 100);

    return () => {
      clearInterval(yearInterval);
      clearInterval(stateInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF9933] via-white to-[#138808]">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            Celebrating the Spirit of the Indian Republic
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in commemorating 74 years of democracy, unity, and progress
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {/* <button
              onClick={() => setActiveSection('map')}
              className="bg-[#FF9933] hover:bg-[#FF8833] text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
            >
              Explore States
            </button> */}
            <button
              onClick={() => setActiveSection('flag')}
              className="bg-white hover:bg-gray-100 text-[#FF9933] font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
            >
              Hoist the Flag
            </button>
            <button
              onClick={() => setActiveSection('card')}
              className="bg-[#138808] hover:bg-[#127807] text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
            >
              Create E-Card
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      {activeSection && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              {activeSection === 'map' && 'Explore India'}
              {activeSection === 'flag' && 'Virtual Flag Hoisting'}
              {activeSection === 'card' && 'Create Your E-Card'}
            </h2>
            {activeSection === 'map' && <IndiaMap />}
            {activeSection === 'flag' && <FlagHoisting />}
            {activeSection === 'card' && <ECardCreator />}
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <Flag className="w-12 h-12 mx-auto mb-4 text-[#FF9933]" />
              <h3 className="text-4xl font-bold mb-2">{yearsCount}</h3>
              <p className="text-gray-600">Years of Democracy</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-[#138808]" />
              <h3 className="text-4xl font-bold mb-2">{statesCount}</h3>
              <p className="text-gray-600">States United</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <Book className="w-12 h-12 mx-auto mb-4 text-[#000080]" />
              <h3 className="text-4xl font-bold mb-2">395</h3>
              <p className="text-gray-600">Constitutional Articles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Constitution Highlights */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Constitutional Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Right to Equality",
                description: "Articles 14-18 ensure equality before law",
                icon: <Brain className="w-8 h-8" />
              },
              {
                title: "Right to Freedom",
                description: "Articles 19-22 protect individual rights",
                icon: <Flag className="w-8 h-8" />
              },
              {
                title: "Right to Education",
                description: "Article 21A guarantees education for all",
                icon: <Book className="w-8 h-8" />
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-[#FF9933] mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Moments of Pride</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800",
              "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800",
              "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800"
            ].map((url, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg aspect-video">
                <img
                  src={url}
                  alt={`Republic Day Moment ${index + 1}`}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">Jai Hind 🇮🇳</p>
          <p className="text-gray-400">© 2024 Republic Day Digital Tribute</p>
        </div>
      </footer>
    </div>
  );
}

export default App;