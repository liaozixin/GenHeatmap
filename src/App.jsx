import React, { useState } from 'react';
import StepsBar from './components/StepsBar/StepsBar';

function App() {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { label: 'File Upload'},
        { label: 'Data Processing' },
        { label: 'Image Generation' },
    ];

    const handleStepClick = (index) => {
        setCurrentStep(index);
    };

    return (
        <div>
            <div style={{marginTop: 50}}></div>
            <StepsBar
                steps={steps}
                currentStep={currentStep}
                onStepClick={handleStepClick}
            />

        </div>
    );
}

export default App;