import { useState } from "react";
import { useTournamentData } from "../state/useTournamentData";

export default function BasketballTournament() {
  const { groups, loading } = useTournamentData();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { component: <div>GroupStage</div> },
    { component: <div>DrawStage</div> },
    { component: <div>EliminationPhase</div> },
  ];
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div >
    <div className="flex justify-between mt-4">
      <button
        className="text-white bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-400 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handlePreviousStep}
        hidden={currentStep === 0}
      >
        Previous Step
      </button>
      <div></div>
      <button
        className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleNextStep}
        hidden={currentStep === steps.length - 1}
      >
        Next Step
      </button>
    </div>
    <div className="step-container">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index === currentStep ? "active" : "inactive"}`}
        >
          {step.component && step.component}
        </div>
      ))}
    </div>
  </div>
  );
}
