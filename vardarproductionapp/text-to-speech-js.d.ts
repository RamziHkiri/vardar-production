declare module 'text-to-speech-js' {
    const tts: {
      speak: (text: string) => void;
    };
    
    export default tts;
  }