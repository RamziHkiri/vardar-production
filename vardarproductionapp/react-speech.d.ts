declare module 'react-speech' {
    import * as React from 'react';
  
    interface SpeechProps {
      text: string;
      lang?: string;
      rate?: number;
      volume?: number;
      pitch?: number;
      onEnd?: () => void;
      onError?: (error: any) => void;
    }
  
    const Speech: React.FC<SpeechProps>;
    export default Speech;
  }
  