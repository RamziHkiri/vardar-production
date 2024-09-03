import Container from '@/components/Container'
import React from 'react'
import AddFileProspects from '../components/AddFileProspects'
import Title from '@/components/Title'

export default function page() {
  return (
   <Container>
    <Title title='Ajouter un fichier des prospects'/>
    <AddFileProspects/>
   </Container>
  )
}
