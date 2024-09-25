"use client"
import Input from '@/components/forms/Input';
import React, { useState, useEffect } from 'react';
import Button from '@/components/forms/Button';
import RetourButton from '@/components/forms/RetourButton';
import MultiSelect from '@/components/forms/MultiSelect';
import AddSpectacle from '@/app/spectacles/components/AddSpectacle';
import AddTheatre from '@/app/theatres/components/AddTheatre';

interface Lieux {
    country: string
    region: string
}

interface TheatreOption {
    value: string; // assuming the ID is a string
    label: string;
}
export default function AddCampagne() {
    const [nom, setNom] = useState<string>("");
    const [lieux, setLieux] = useState<Lieux>({ country: "", region: "" });
    const [ville, setVille] = useState("");
    const [pays, setPays] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [theatreId, setTheatreId] = useState("");
    const [acteurId, setActeurId] = useState("");
    const [prix, setPrix] = useState(0);
    const [popTheatre, setPopTheatre] = useState(false);
    const [popSpectacle, setPopSpectacle] = useState(false);
    const [spectacleList, setSpectacleList] = useState([]);
    const [theatreList, setTheatreList] = useState<TheatreOption[]>([]);


    const togglePopSpectacle = () => {
        setPopSpectacle(!popSpectacle);

    }
    const togglePopTheatre = () => {
        setPopTheatre(!popTheatre);
    };
    useEffect(() => {
        const fetchSpectacles = async () => {
            try {
                const response = await fetch('/api/spectacles');
                const data = await response.json();
                console.log(data.spectacles);
                if (data.spectacles) {
                    const options = data.spectacles.map((spectacle: any) => ({
                        value: spectacle.id,
                        label: `${spectacle.titre}`,
                    }));
                    setSpectacleList(options);
                } else {
                    console.error('Error fetching spectacles:', data);
                }
            } catch (error) {
                console.error('Error fetching spectacles:', error);
            }
        };

        fetchSpectacles();
    }, [popSpectacle]);

    useEffect(() => {
        const fetchTheatres = async () => {
            try {
                const response = await fetch('/api/theatres');
                const theatres = await response.json(); // Parse JSON response

                // Filter theatres where any item in the lieux array matches the pays and ville
                const filteredTheatres = theatres.filter((theatre: any) =>
                    theatre.lieux.some((location: any) =>
                        location.country.toLowerCase() === pays.toLowerCase() &&
                        location.region.toLowerCase() === ville.toLowerCase()
                    )
                );

                if (filteredTheatres && Array.isArray(filteredTheatres)) {
                    const options = filteredTheatres.map((theatre) => ({
                        value: theatre.id,
                        label: theatre.nom,
                    }));
                    setTheatreList(options);

                } else {
                    console.error('No matching theatres found.');
                }
            } catch (error) {
                console.error('Error fetching theatres:', error);
            }
        };

        // Only fetch theatres if both pays and ville are provided
        if (pays && ville) {
            fetchTheatres();
        }
        setLieux({ country: pays, region: ville })
    }, [pays, ville]);
    console.log(theatreList);

    useEffect(() => {


    }, [pays, ville, popTheatre])

    const handleSubmit = async () => {
        try {
            const dateD = new Date(dateDebut);
            const dateF = new Date(dateFin);


            const response = await fetch('/api/campagnes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom,
                    lieux: lieux,
                    dateDebut: dateD,
                    dateFin: dateF,
                    theatreId: theatreId,
                    prix,
                    status,
                    theatre: {
                        connect: { id: theatreId }
                    }
                }),
            });

            const result = await response.json();
            if (result) {
                console.log('campagne added:', result);
            } else {
                console.error('Error : values errors 1 1 1');
            }
        } catch (error) {
            console.error('Error saving campagne:', error);
        }
    };
    console.log(setTheatreId)



    return (
        <div className='p-5 w-max bg-white'>
            <div className='flex flex-row justify-between items-center'>
                <h2 className="text-2xl font-bold mb-4">Créer une nouvelle campagne :</h2>
                <RetourButton link='/campagnes' label='Retour' />
            </div>
            <h3 className='font-semibold p-5'>Remplir les shamps suivants</h3>
            <div className='flex flex-row justify-around gap-6'>
                <div className='flex flex-col gap-6 items-center px-6'>
                    <Input
                        label='Nom Campagne'
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Tapez le nom de la campagne"
                    />
                    <Input
                        label='Pays'
                        value={pays}
                        onChange={(e) => setPays(e.target.value)}
                        placeholder="selectionner pays"
                    />
                    <Input
                        label='Ville'
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        placeholder="selectionner ville"
                    />


                    <Input
                        type='date'
                        label='Date Debut'
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                    />
                    <Input
                        type='date'
                        label='Date Fin'
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                    />
                    <Input
                        type='number'
                        label='Prix par personne'
                        value={prix}
                        onChange={(e) => setPrix(parseInt(e.target.value, 10))}
                    />
                    <div className='flex flex-row gap-5'>
                        <div className='flex flex-row justify-between items-center gap-2'>
                            <MultiSelect options={theatreList} value={theatreId} onChange={(e) => setTheatreId(e.target.value)} placeholder='Selectionner le Théâtre' />
                            <div onClick={togglePopTheatre} className='bg-pink-400 h-max py-1 px-3 text-white rounded-md shadow-md cursor-pointer '>
                                +
                            </div>
                            {/*show add acteur popup */}
                            {popTheatre && (
                                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                                    <div className='bg-white p-6 rounded-md shadow-lg'>
                                        <AddTheatre />
                                        <button onClick={togglePopTheatre} className='bg-red-500 text-white px-4 py-2 rounded-md'>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>



                        {/*<div className='flex flex-row justify-between items-center gap-2'>
                            <MultiSelect options={[]} value={acteurId} onChange={(e) => setActeurId(e.target.value)} placeholder='Selectionner un Acteur' />
                            <div onClick={togglePopActeur} className='bg-pink-400 h-max py-1 px-3 text-white rounded-md shadow-md cursor-pointer'>
                                +
                            </div>
                            {/*show add acteur popup 
                            {popActeur && (
                                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                                    <div className='bg-white p-6 rounded-md shadow-lg'>
                                        <AddActeur />
                                        <button onClick={togglePopActeur} className='bg-red-500 text-white px-4 py-2 rounded-md'>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>*/}
                        <div className='flex flex-row justify-between items-center gap-2'>
                            <MultiSelect options={spectacleList} value={acteurId} onChange={(e) => setActeurId(e.target.value)} placeholder='Selectionner un Spectacle' />
                            <div onClick={togglePopSpectacle} className='bg-pink-400 h-max py-1 px-3 text-white rounded-md shadow-md cursor-pointer'>
                                +
                            </div>
                            {/*show add acteur popup */}
                            {popSpectacle && (
                                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                                    <div className='bg-white p-6 rounded-md shadow-lg'>
                                        <AddSpectacle />
                                        <button onClick={togglePopSpectacle} className='bg-red-500 text-white px-4 py-2 rounded-md'>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>


                    </div>




                    <Button
                        label='Créer Campagne'
                        onClick={handleSubmit}
                    />
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}
