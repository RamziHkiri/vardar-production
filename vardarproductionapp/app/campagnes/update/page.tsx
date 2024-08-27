"use client";
import Container from '@/components/Container'
import Title from '@/components/Title'
import React from 'react'
import Link from 'next/link'
import AddCampagne from '../components/AddCampagne'

export default function page() {
  return (
    <Container>
      <Title title='Créer nouvelle campagne' />
      <AddCampagne />
    </Container>
  )
}
