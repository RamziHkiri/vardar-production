"use client"
import React, { useState } from 'react'
import GeneralInfo from './GeneralInfo'
import SpectacleInfo from './SpectacleInfo';
import FormNavigation from './FormNavigation';

interface CampagneData {
    nom: string;
    theatreId: string[];
    lieux: {
        country: string;
        region: string;
    };
    prix: number;
    dateDebut?: Date;
    dateFin?: Date;
    status: string;
}
export default function AddCampagne() {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<CampagneData>({
        nom: '',
        theatreId: [],
        lieux: {
            country: '',
            region: ''
        },
        prix: 0,
        status: ''
    });
    const handleNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updateFormData = (data: Partial<CampagneData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <GeneralInfo />
            case 2:
                return <SpectacleInfo />
            case 3:
                return <SpectacleInfo />

            default:
                return null;
        }
    };
    return (
        <div className='p-5 w-max bg-white '>
            <h2 className="text-2xl font-bold mb-4">Créé nouvelle campagne:</h2>
            <div className='flex flex-col '>

                {renderStep()}
                <FormNavigation
                    currentStep={currentStep}
                    handleNextStep={handleNextStep}
                    handlePreviousStep={handlePreviousStep}
                />
            </div>

        </div>

    )
}
