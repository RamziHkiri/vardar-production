"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { MdOutlineUpdate } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Campagne {
  id: string
  lieux: string
  nom: string
  dateDebut?: Date
  dateFin?: Date
  theatreId: string
  prix: number
  status: string
}

const CampagnesList = () => {
  const [campagnes, setCampagnes] = useState<Campagne[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampagnes = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/campagnes', {
          params: { page: currentPage }
        })
        setCampagnes(response.data || [])
        setTotalPages((response.data).length || 0)
        setLoading(false)
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
      setCampagnes(campagnes.filter(campagne => campagne.id !== id))
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
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className='bg-blue-400 text-white'>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Lieux</th>
            <th className="py-2 px-4 border-b">Nom</th>
            <th className="py-2 px-4 border-b">Date Début</th>
            <th className="py-2 px-4 border-b">Date Fin</th>
            <th className="py-2 px-4 border-b">Prix</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campagnes.length > 0 ? (
            campagnes.map(campagne => (
              <tr className=' items-center hover:bg-blue-100 hover:bg-opacity-60 border-b' key={campagne.id}>
                <td className="py-3 px-4 ">{campagne.id}</td>
                <td className="py-2 px-4 ">{campagne.lieux}</td>
                <td className="py-2 px-4 ">{campagne.nom}</td>
                <td className="py-2 px-4 ">{campagne.dateDebut ? new Date(campagne.dateDebut).toLocaleDateString() : 'N/A'}</td>
                <td className="py-2 px-4 ">{campagne.dateFin ? new Date(campagne.dateFin).toLocaleDateString() : 'N/A'}</td>
                <td className="py-2 px-4 ">{campagne.prix.toFixed(2)}</td>
                <td className="py-2 px-4 ">{campagne.status}</td>
                <td className="flex flex-row items-center  justify-center gap-3 py-4 px-4 ">
                  <Link href={`/campagnes/update/${campagne.id}`}>
                    <div className="text-blue-600 hover:underline">
                      <MdOutlineUpdate />
                    </div>
                  </Link>
                  <div
                    onClick={() => handleDelete(campagne.id)}
                    className="text-red-600 hover:underline"
                  >
                    <RiDeleteBin6Line />
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CampagnesList
