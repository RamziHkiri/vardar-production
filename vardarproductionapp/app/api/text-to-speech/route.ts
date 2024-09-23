import { NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import fs from 'fs';
import path from 'path';
import { protos } from '@google-cloud/text-to-speech';

const client = new TextToSpeechClient();

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
      input: { text },
      voice: { languageCode: 'fr-FR', name: 'fr-FR-Wavenet-D' },
      audioConfig: { audioEncoding: 'MP3' }, // Using string directly
    };

    const [response] = await client.synthesizeSpeech(request) as unknown as [protos.google.cloud.texttospeech.v1.ISynthesizeSpeechResponse];

    if (!response.audioContent) {
      return NextResponse.json({ error: 'Audio content is empty' }, { status: 500 });
    }

    const audioFilePath = path.join(process.cwd(), 'public/audio/output.mp3');

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(audioFilePath), { recursive: true });

    // Write the audio content
    await fs.promises.writeFile(audioFilePath, response.audioContent as Uint8Array, 'binary');

    return NextResponse.json({ audioFile: '/audio/output.mp3' }, { status: 200 });
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
