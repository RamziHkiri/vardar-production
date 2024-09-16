"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";

type FileType = {
  id: string;
  pays: string;
  ville: string;
  fileURL: string;
};

type Prospect = {
  id: string;
  name: string;
  adresse: string;
  phoneNumber: string;
  operator: string;
};

const FilesList: React.FC = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProspects([]);
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

  const fetchCSV = async (file: FileType) => {
    try {
      const response = await fetch("/test.csv");
      const csvText = await response.text();
      console.log(csvText);

      Papa.parse<Prospect>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setProspects(result.data);
          console.log(result.data);
          setSelectedFile(file);
          openModal();
        },
      });
    } catch (error) {
      console.error("Error fetching and parsing CSV:", error);
    }
  };




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
                  onClick={() => fetchCSV(file)}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Afficher le contenu
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full h-3/4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4 z-60">
              <h3 className="text-xl font-bold">
                CSV Content for {selectedFile?.pays.toUpperCase()},{" "}
                {selectedFile?.ville.toUpperCase()}
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
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Adresse</th>
                  <th className="py-2 px-4 text-left">Phone Number</th>
                  <th className="py-2 px-4 text-left">Operator</th>
                </tr>
              </thead>
              <tbody>
                {prospects.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b cursor-pointer"
                    onClick={() => {}}
                  >
                    <td className="py-2 px-4">{row.id}</td>
                    <td className="py-2 px-4">{row.name}</td>
                    <td className="py-2 px-4">{row.adresse}</td>
                    <td className="py-2 px-4">{row.phoneNumber}</td>
                    <td className="py-2 px-4">{row.operator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesList;
