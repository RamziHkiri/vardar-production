"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TextToSpeechForm from "./TextToSpeechForm";

type FileType = {
  id: string;
  pays: string;
  ville: string;
  fileURL: string;
};

type Lieux = {
  country: string;
  region: string;
};

type Prospect = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  lieux: Lieux;
};

const FilesList: React.FC = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [filtredProspects, setFiltredProspects] = useState<Prospect[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProspect(null); // Clear selected prospect when closing
  };

  const openAudioModal = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setIsAudioModalOpen(true);
  };

  const closeAudioModal = () => {
    setIsAudioModalOpen(false);
    setSelectedProspect(null); // Clear selected prospect when closing
  };

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const response = await axios.get("/api/prospects");
        setProspects(response.data.prospects);
      } catch (error) {
        console.error("Error fetching prospects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProspects();
  }, []);

  const handleFileClick = (file: FileType) => {
    const filtered = prospects.filter(
      (prospect) =>
        prospect.lieux.country === file.pays && prospect.lieux.region === file.ville
    );
    setFiltredProspects(filtered);
    setSelectedFile(file);
    openModal();
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/api/files");
        setFiles(response.data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) {
    return <p>Loading files...</p>;
  }

  if (files.length === 0) {
    return <p>No files found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-pink-400 border-b text-white">
            <th className="py-2 px-4 text-left">Pays</th>
            <th className="py-2 px-4 text-left">Ville</th>
            <th className="py-2 px-4 text-left">File URL</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className="border-b">
              <td className="py-2 px-4">{file.pays}</td>
              <td className="py-2 px-4">{file.ville}</td>
              <td className="py-2 px-4">
                <div
                  onClick={() => handleFileClick(file)}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Afficher le contenu
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for CSV Content */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full h-3/4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4 z-60">
              <h3 className="text-xl font-bold">
                CSV Content for {selectedFile?.pays.toUpperCase()}, {selectedFile?.ville.toUpperCase()}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900 text-xl"
              >
                &times;
              </button>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Nom</th>
                  <th className="py-2 px-4 text-left">Prenom</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {filtredProspects.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b cursor-pointer"
                    onClick={() => openAudioModal(row)} // Open audio modal on prospect click
                  >
                    <td className="py-2 px-4">{row.id}</td>
                    <td className="py-2 px-4">{row.nom}</td>
                    <td className="py-2 px-4">{row.prenom}</td>
                    <td className="py-2 px-4">{row.email}</td>
                    <td className="py-2 px-4">{row.telephone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Text to Speech */}
      {isAudioModalOpen && selectedProspect && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-40">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
      <div className="flex justify-between items-center mb-4 z-60">
        <h3 className="text-xl font-bold">
          Generate Audio for {selectedProspect.nom} {selectedProspect.prenom}
        </h3>
        <button
          onClick={closeAudioModal}
          className="text-gray-600 hover:text-gray-900 text-xl"
        >
          &times;
        </button>
      </div>
      <TextToSpeechForm 
        prospect={selectedProspect} 
        isOpen={isAudioModalOpen} 
        onClose={closeAudioModal}
      />
      <div className="mt-4">
        <button
          onClick={closeAudioModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div >
  );
};

export default FilesList;
