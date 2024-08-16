import React from 'react';

interface FormNavigationProps {
  currentStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  handleNextStep,
  handlePreviousStep,
}) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <button
          onClick={handlePreviousStep}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Précedente
        </button>
      )}
      {currentStep < 4 && (
        <button
          onClick={handleNextStep}
          className="bg-pink-400 text-white py-2 px-4 rounded  hover:bg-pink-200"
        >
          Suivant
        </button>
      )}
      {currentStep === 4 && (
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Sauvegarder
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
