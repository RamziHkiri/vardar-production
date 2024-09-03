"use client";
import { useCallback, useState } from "react";
import Button from "@/components/forms/Button";
import { useDropzone } from "react-dropzone";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "@/lib/firebase"; // Adjust the import path as necessary
import Input from "@/components/forms/Input";

const ProspectsFilesList: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [pays, setPays] = useState("");
  const [ville, setVille] = useState("");

  const handleFileChange = useCallback((value: File) => {
    setFile(value);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0]);
      }
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "text/csv": [".csv"],
    },
  });

  const uploadFileToFirebase = async (file: File) => {
    if (!file) return;

    setUploading(true);
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `files/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);
      console.log("File uploaded successfully:", url);

      // After successfully uploading to Firebase, create metadata in MongoDB
      await createFileMetadataInDB(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const createFileMetadataInDB = async (url: string) => {
    try {
      const response = await fetch(`/api/files`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pays, ville, fileURL: url }),
      });

      if (!response.ok) {
        throw new Error('Failed to create file metadata in the database');
      }

      const createdFile = await response.json();
      console.log('File metadata created successfully in the database:', createdFile);
    } catch (error) {
      console.error('Error creating file metadata in the database:', error);
    }
  };

  const handleUpload = useCallback(() => {
    if (file) {
      uploadFileToFirebase(file);
    }
  }, [file]);

  return (
    <div className="flex flex-col py-6 w-full">
      <div className="flex flex-row gap-5 mb-6">
        <Input onChange={(e) => setPays(e.target.value)} label='Pays' placeholder="Selectionner le pays des prospects..." />
        <Input onChange={(e) => setVille(e.target.value)} label='Ville' placeholder="Selectionner la ville des prospects..." />
      </div>

      <div className="col-span-2 text-center p-4 bg-purple-200">
        <div
          {...getRootProps()}
          className="border-2 border-slate-400 border-dashed cursor-pointer text-sm bg-white font-normal text-slate-400 flex items-center justify-center"
        >
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop your file here...</p> : <p>+ Add a file</p>}
        </div>
      </div>

      {file && (
        <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
          <p>{file?.name}</p>
          <div className="mt-2 flex gap-2">
            <Button
              small
              outline
              label="Cancel"
              onClick={() => {
                setFile(null);
                setDownloadURL(null);
              }}
            />
          </div>
        </div>
      )}

      <div onClick={handleUpload} className='flex flex-row justify-center items-center gap-2 bg-pink-400 text-white text-center w-56 rounded-md text-sm cursor-pointer'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <span className='text-2xl'>+</span>
          <p>Ajouter le Fichier</p>
        </div>
      </div>

      {uploading && <p>Uploading...</p>}
      {downloadURL && <p>File uploaded successfully! URL: {downloadURL}</p>}
    </div>
  );
};

export default ProspectsFilesList;
