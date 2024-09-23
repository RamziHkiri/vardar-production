declare module 'react-tts' {
    import React from 'react';
  
    interface TextToSpeechProps {
      text: string;
      lang?: string;
      rate?: number;
      volume?: number;
      pitch?: number;
    }
  
    export const TextToSpeech: React.FC<TextToSpeechProps>;
    export default TextToSpeech;
  }
  