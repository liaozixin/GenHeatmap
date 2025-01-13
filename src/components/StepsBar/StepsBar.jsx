import React from 'react';
import './StepsBar.css';

function StepsBar({ steps, currentStep, onStepClick }) {
    return (
        <div className="steps-bar">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`step ${index === currentStep ? 'active' : ''} ${
                        index < currentStep ? 'completed' : ''
                    }`}
                    onClick={() => onStepClick(index)}
                >
                    <div className="step-number">{index + 1}</div>
                    <div className="step-label">{step.label}</div>
                </div>
            ))}
        </div>
    );
}

export default StepsBar;