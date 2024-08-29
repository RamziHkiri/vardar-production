"use client";
import Container from '@/components/Container'
import Title from '@/components/Title'
import Agenda from './components/Agenda'

export default function page() {

  return (
    <Container>
      <Title title='Agenda' />
      <Agenda />

    </Container>
  )
}
