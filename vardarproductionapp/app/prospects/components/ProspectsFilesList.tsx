"use client";
import { useCallback, useState } from "react";
import Button from "@/components/forms/Button";
import { useDropzone } from "react-dropzone";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "@/lib/firebase";
import Input from "@/components/forms/Input";
import Papa from "papaparse"; // Import PapaParse for CSV parsing

interface Lieux {
  country: string
  region: string
}

const ProspectsFilesList: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [pays, setPays] = useState("");
  const [ville, setVille] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [prospects, setProspects] = useState<any[]>([]); // Store parsed prospects
  const [lieux, setLieux] = useState<Lieux>({ country: "", region: "" });


  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    setFileUploaded(false);
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
      setFileUploaded(true);
      console.log("File uploaded successfully:", url);

      await createFileMetadataInDB(url);
      parseCSVFile(file); // Parse the CSV file after uploading
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

  const parseCSVFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const parsedData = results.data;
        setProspects(parsedData);
        console.log(prospects) // Store parsed prospects
        console.log("Parsed prospects:", parsedData);
      },
      error: function (error: any) {
        console.error("Error parsing CSV file:", error);
      },
    });
  };

  const handleUpload = useCallback(() => {
    if (!pays || !ville) {
      setError("Veuillez remplir les champs Pays et Ville avant de télécharger le fichier.");
      return;
    }
    setLieux({ country: pays, region: ville })
    if (file) {
      setError(null);
      uploadFileToFirebase(file);
    }
  }, [file, pays, ville]);

  const handleAddToDatabase = async () => {
    console.log('prospects');
    if (prospects.length === 0) {
      setError("Aucun prospect à ajouter à la base de données.");
      return;
    }
  
    try {
      for (const prospect of prospects) {
        const { nom, prenom, email, telephone } = prospect;
        
  
     
  
        const response = await fetch(`/api/prospects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom,
            prenom,
            email,
            telephone,
            lieux: lieux, // Adjust according to your API's expected format
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add prospect to the database');
        }
  
        const result = await response.json();
        console.log("Prospect added to the database:", result);
      }
  
      // After processing all prospects
      console.log("All prospects added to the database.");
    } catch (error) {
      console.error("Error adding prospects to the database:", error);
    }
  };
  
  

  return (
    <div className="flex flex-col py-6 w-full">
      <div className="flex flex-row gap-5 mb-6">
        <Input
          onChange={(e) => setPays(e.target.value)}
          label='Pays'
          placeholder="Sélectionner le pays des prospects..."
        />
        <Input
          onChange={(e) => setVille(e.target.value)}
          label='Ville'
          placeholder="Sélectionner la ville des prospects..."
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="col-span-2 text-center p-4 bg-purple-200">
        <div
          {...getRootProps()}
          className="border-2 border-slate-400 border-dashed cursor-pointer text-sm bg-white font-normal text-slate-400 flex items-center justify-center"
        >
          <input {...getInputProps()} />
          {isDragActive ? <p>Déposez votre fichier ici...</p> : <p>+ Ajouter un fichier</p>}
        </div>
      </div>

      {file && (
        <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
          <p>{file?.name}</p>
          <div className="mt-2 flex gap-2">
            <Button
              small
              outline
              label="Annuler"
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

      {uploading && <p>Téléchargement en cours...</p>}
      {downloadURL && <p>Fichier téléchargé avec succès ! URL : {downloadURL}</p>}

      {fileUploaded && (
        <div onClick={handleAddToDatabase} className="mt-4 flex justify-center items-center bg-green-500 text-white text-center w-64 rounded-md text-sm cursor-pointer">
          <p>Ajouter contenu à la base de données</p>
        </div>
      )}
    </div>
  );
};

export default ProspectsFilesList;
