import { useState } from "react";
import { useTournamentData } from "../state/useTournamentData";

export default function BasketballTournament() {
  const { groups, loading } = useTournamentData();
  const [currentStep, setCurrentStep] = useState(0);

  console.log(loading, groups);

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
    <div>
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousStep} hidden={currentStep === 0}>
          Previous Step
        </button>
        <div></div>
        <button
          onClick={handleNextStep}
          hidden={currentStep === steps.length - 1}
        >
          Next Step
        </button>
      </div>
      <div className="step-container">
        {steps.map((step, index) => (
          <div key={index}>{step.component && step.component}</div>
        ))}
      </div>
    </div>
  );
}
