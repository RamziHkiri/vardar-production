"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { MdOutlineUpdate } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Spectacle {
    id: string
    titre: string
    description: string
}

const ListSpectacles = () => {
    const [spectacles, setSpectacles] = useState<Spectacle[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCampagnes = async () => {
            try {
                setLoading(true)
                const response = await axios.get('/api/spectacles', {
                    params: { page: currentPage }
                })
                setSpectacles(response.data || [])
                if ((response.data).length > 0) {
                    setTotalPages(Math.ceil(response.data.length / 8));
                }
                else {
                    setTotalPages(0);
                }
                setLoading(false);
            } catch (error) {
                setError('Error fetching campagnes.')
                setLoading(false)
            }
        }

        fetchCampagnes()
    }, [currentPage])

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/campagnes/${id}`)
            setSpectacles(spectacles.filter(spectacle => spectacle.id !== id))
        } catch (error) {
            setError('Error deleting campagne.')
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        
        <div className="p-4 rounded-xl">
            <table className="min-w-full bg-white border border-gray-200 text-sm text-left ">
                <thead className=''>
                    <tr className=' l bg-pink-300 text-white rounded '>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Titre</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Actions</th>


                    </tr>
                </thead>
                <tbody>
                    {spectacles.length > 0 ? (
                        spectacles.map(spectacle => (
                            <tr className='hover:bg-blue-100 hover:bg-opacity-60 border-b' key={spectacle.id}>
                                <td className="py-3 px-4 ">{spectacle.id}</td>
                                <td className="py-2 px-4 ">{spectacle.titre}</td>

                                <td className="py-2 px-4 ">{spectacle.description}</td>
                                <td className="flex flex-row items-center  justify-start gap-4 py-4 px-4 ">
                                    <Link href={`/campagnes/update/${spectacle.id}`}>
                                        <div className="text-black hover:underline">
                                            <MdOutlineUpdate size={24} />
                                        </div>
                                    </Link>
                                    <div
                                        onClick={() => handleDelete(spectacle.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        <RiDeleteBin6Line size={24} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="py-2 px-4 text-center">No campagnes available</td>
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
                    précédent
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

export default ListSpectacles
