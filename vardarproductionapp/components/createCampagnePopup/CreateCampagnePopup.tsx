import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import FormNavigation from '../../app/campagnes/components/formulaireCampagne/FormNavigation';

interface CampagneData {
    nom: string;
    theatreId: string[]; // This should be an array of strings
    lieux: {
        country: string;
        region: string;
    };
    prix: number;
    dateDebut?: Date;
    dateFin?: Date;
    status: string;
}
interface CreateCampagnePopupProps {
    onClose: () => void;
}

const CreateCampagnePopup: React.FC<CreateCampagnePopupProps> = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<CampagneData>({
        nom: '',
        theatreId: [], // This should be an array of strings
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
                return <Step1 formData={formData} updateFormData={updateFormData} />;
            case 2:
                return <Step2 formData={formData} updateFormData={updateFormData} />;
            case 3:
                return <Step3 formData={formData} updateFormData={updateFormData} />;
            case 4:
                return <Step4 formData={formData} updateFormData={updateFormData} />;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className=" relative bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Create New Campagne</h2>
                {renderStep()}
                <FormNavigation
                    currentStep={currentStep}
                    handleNextStep={handleNextStep}
                    handlePreviousStep={handlePreviousStep}
                />
                <button
                    onClick={onClose}
                    className=" absolute mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


export default CreateCampagnePopup;
