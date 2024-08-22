"use client"
import Title from '@/components/Title'
import React from 'react'
import Container from '@/components/Container'
import AddActeur from '../components/AddActeur'

export default function page() {
    return (
        <Container>
            <Title title='Ajouter nouveau Acteur' />
            <AddActeur />
        </Container>

    )
}
