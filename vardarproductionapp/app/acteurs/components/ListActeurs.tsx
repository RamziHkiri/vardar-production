"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { MdOutlineUpdate } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Acteur {
    id: string
    nom: string
    prenom: string
    dateNaissance: string
    nationalite: string
    bio: string
    spectacleIds: string[]
}

const ListActeurs = () => {
    const [acteurs, setActeurs] = useState<Acteur[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchActeurs = async () => {
            try {
                setLoading(true)
                const response = await axios.get('/api/acteurs', {
                    params: { page: currentPage, limit: 8 } // Fetch 8 elements per page
                })

                // Assuming response.data.acteurs contains the acteurs array and response.data.total contains the total number of acteurs
                setActeurs(response.data.acteurs || [])
                setTotalPages(Math.ceil(response.data.total / 8))

                setLoading(false)
            } catch (error) {
                setError('Error fetching acteurs.')
                setLoading(false)
            }
        }

        fetchActeurs()
    }, [currentPage])

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/acteurs/${id}`)
            setActeurs(acteurs.filter(acteur => acteur.id !== id))
        } catch (error) {
            setError('Error deleting acteur.')
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="p-4 rounded-xl">
            <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
                <thead>
                    <tr className="bg-pink-300 text-white">
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Nom</th>
                        <th className="py-2 px-4 border-b">Prénom</th>
                        <th className="py-2 px-4 border-b">Date de Naissance</th>
                        <th className="py-2 px-4 border-b">Nationalité</th>
                        <th className="py-2 px-4 border-b">Bio</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {acteurs.length > 0 ? (
                        acteurs.map(acteur => (
                            <tr className="hover:bg-blue-100 hover:bg-opacity-60 border-b" key={acteur.id}>
                                <td className="py-3 px-4">{acteur.id}</td>
                                <td className="py-2 px-4">{acteur.nom}</td>
                                <td className="py-2 px-4">{acteur.prenom}</td>
                                <td className="py-2 px-4">{acteur.dateNaissance}</td>
                                <td className="py-2 px-4">{acteur.nationalite}</td>
                                <td className="py-2 px-4">{acteur.bio}</td>
                                <td className="flex flex-row items-center justify-start gap-4 py-4 px-4">
                                    <Link href={`/acteurs/update/${acteur.id}`}>
                                        <div className="text-black hover:underline">
                                            <MdOutlineUpdate size={24} />
                                        </div>
                                    </Link>
                                    <div
                                        onClick={() => handleDelete(acteur.id)}
                                        className="text-red-600 hover:underline cursor-pointer"
                                    >
                                        <RiDeleteBin6Line size={24} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="py-2 px-4 text-center">No acteurs available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-pink-400 w-20 text-white text-sm px-2 py-2 rounded"
                >
                    Précédent
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-pink-400 w-20 text-white text-sm px-2 py-3 rounded"
                >
                    Suivant
                </button>
            </div>
        </div>
    )
}

export default ListActeurs
