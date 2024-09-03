"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type FileType = {
  id: string;
  pays: string;
  ville: string;
  fileURL: string;
};

const FilesList: React.FC = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
          <tr className="bg-gray-100 border-b">
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
                <a href={file.fileURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Download File
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;
