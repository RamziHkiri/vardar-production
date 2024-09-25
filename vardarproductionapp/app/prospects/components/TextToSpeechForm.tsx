// components/TextToSpeechForm.tsx
"use client";
import React, { useState, useEffect } from 'react';

type Lieux = {
  country: string;
  region: string;
};

type Prospect = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  lieux: Lieux;
};

interface TextToSpeechFormProps {
  prospect: Prospect;
  isOpen: boolean;
  onClose: () => void; // Add this prop
}

const TextToSpeechForm: React.FC<TextToSpeechFormProps> = ({ prospect, isOpen, onClose }) => {
  const [text, setText] = useState('');
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const formattedText = `Salut monsieur ${prospect.nom} ${prospect.prenom}, vous êtes du ${prospect.lieux.country}, ${prospect.lieux.region}. Merci d'être un membre de notre famille Endorphine.`;
    setText(formattedText);
  }, [prospect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          fileName: `${prospect.nom}-${prospect.prenom}.mp3`,  // Pass file name to the server
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const data = await response.json();
      setAudioFile(data.audioFile);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(); // Call the onClose function when Escape is pressed
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div>
      <h1>Text to Speech</h1>
      <form onSubmit={handleSubmit}>
        <button className='' type="submit">Generate Audio</button>
      </form>
      {audioFile && (
        <div>
          <h2>Audio Output</h2>
          <audio controls>
            <source src={audioFile} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TextToSpeechForm;
