"use client"
import Title from '@/components/Title'
import React from 'react'
import AddTheatre from '../components/AddTheatre'
import Container from '@/components/Container'

export default function page() {
    return (
        <Container>
            <Title title='Créer nouveau théâtre' />
            <AddTheatre />
        </Container>

    )
}
