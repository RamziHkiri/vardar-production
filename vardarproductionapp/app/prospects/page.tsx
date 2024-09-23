import Container from '@/components/Container';
import Title from '@/components/Title';
import React from 'react';
import ListingFiles from './components/ListingFiles';
import ProspectsFilesList from './components/ProspectsFilesList';
import dynamic from 'next/dynamic';

const DynamicTextToSpeechComponent = dynamic(() => import( './components/TextToSpeechForm'), {
  ssr: false, // This ensures the component only renders on the client side
});

export default function page() {
  return (
    <Container>
      <Title title='Prospects' />
      <div className=' bg-white'>
        <div className='flex flex-col items-start m-4 pb-1 '>
          <p>Ajouter un fichier Prospects:</p>
          <ProspectsFilesList />
         
        </div>
        <div>
          <ListingFiles/>
        </div>
        <div>
       </div>
      </div>
    </Container>
  )
}
