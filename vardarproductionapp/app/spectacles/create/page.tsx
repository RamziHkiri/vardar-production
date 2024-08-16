'use client'
import React from 'react'
import Container from '@/components/Container'
import Title from '@/components/Title'
import AddSpectacle from '../components/AddSpectacle'

export default function page() {
  return (
    <Container>
    <Title title='Créer nouveau spectacle:' />
    <AddSpectacle />
</Container>
  )
}
