import React, { useState, useRef } from 'react';
import { Download, Share2, Flag } from 'lucide-react';

export function ECardCreator() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState('1');
  const cardRef = useRef<HTMLDivElement>(null);

  const templates = {
    '1': 'bg-gradient-to-r from-[#FF9933] via-white to-[#138808]',
    '2': 'bg-gradient-to-b from-[#FF9933] via-white to-[#138808]',
    '3': 'bg-gradient-to-tr from-[#FF9933] to-[#138808]'
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current);
      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'republic-day-card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating card:', error);
      alert('Failed to download card. Please try again.');
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current);
      const blob = await new Promise<Blob>((resolve) => 
        canvas.toBlob((blob) => resolve(blob!), 'image/png')
      );

      if (navigator.share) {
        const file = new File([blob], 'republic-day-card.png', { type: 'image/png' });
        await navigator.share({
          title: 'Republic Day Greetings',
          text: 'Check out my Republic Day e-card!',
          files: [file]
        });
      } else {
        const clipboardItem = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([clipboardItem]);
        alert('Card copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing card:', error);
      alert('Failed to share card. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h3 className="text-3xl font-bold mb-6 text-center text-[#138808]">Create Your Republic Day E-Card</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#138808] focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#138808] focus:border-transparent"
              rows={4}
              placeholder="Write your Republic Day message"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Template
            </label>
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(templates).map((key) => (
                <button
                  key={key}
                  onClick={() => setTemplate(key)}
                  className={`h-24 rounded-lg border-2 transition-all ${
                    template === key
                      ? 'border-[#138808] shadow-lg scale-105'
                      : 'border-gray-200 hover:border-[#138808]/50'
                  } ${templates[key as keyof typeof templates]}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={cardRef}
        className={`mb-8 p-8 rounded-lg shadow-lg ${templates[template as keyof typeof templates]}`}
      >
        <div className="bg-white/90 p-6 rounded-lg backdrop-blur-sm">
          <div className="flex justify-center mb-4">
            <Flag className="w-12 h-12 text-[#FF9933] animate-wave" />
          </div>
          <h4 className="text-xl font-bold text-center mb-2">
            {name || 'Your Name'}
          </h4>
          <p className="text-center text-gray-700 mb-4">
            {message || 'Your Republic Day message will appear here'}
          </p>
          <p className="text-center text-sm text-gray-500">
            Happy Republic Day 2024 🇮🇳
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-2 bg-[#FF9933] text-white rounded-md hover:bg-[#FF8833] transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-2 bg-[#138808] text-white rounded-md hover:bg-[#127807] transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
}