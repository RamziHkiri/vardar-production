"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { MdOutlineUpdate } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Theatre from '../page';

interface Theatre {
    id: string
    nom: string  
    adresse: string
    capacite: number
}

const ListTheatre = () => {
  const [theatres, setTheatre] = useState<Theatre[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampagnes = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/theatres', {
          params: { page: currentPage }
        })
        setTheatre(response.data || [])
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
      setTheatre(theatres.filter(Theatre => Theatre.id !== id))
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
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className='bg-pink-300 text-white rounded  text-start'>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nom</th>
            <th className="py-2 px-4 border-b">Adresse</th>
            <th className="py-2 px-4 border-b">Capacité</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {theatres.length > 0 ? (
            theatres.map(theatre => (
              <tr className=' items-center hover:bg-blue-100 hover:bg-opacity-60 border-b' key={theatre.id}>
                <td className="py-3 px-4 ">{theatre.id}</td>
                <td className="py-2 px-4 ">{theatre.nom}</td>
                <td className="py-2 px-4 ">{theatre.adresse}</td>
                <td className="py-2 px-4 ">{theatre.capacite}</td>
                <td className="flex flex-row items-center  justify-center gap-4 py-4 px-4 ">
                  <Link href={`/campagnes/update/${theatre.id}`}>
                    <div className="text-black hover:underline">
                      <MdOutlineUpdate size={24} />
                    </div>
                  </Link>
                  <div
                    onClick={() => handleDelete(theatre.id)}
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

export default ListTheatre
