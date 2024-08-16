import Container from '@/components/Container'
import Title from '@/components/Title'
import React from 'react'
import AddCampagne from '../components/formulaireCampagne/AddCampagne'

export default function page() {
  return (
    <Container>
        <Title title='Créer nouvelle campagne' />
        <AddCampagne />
    </Container>
  )
}
