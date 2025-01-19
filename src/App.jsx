import React, { useState } from 'react';
import StepsBar from './components/StepsBar/StepsBar';
import Upfile from './components/Upfile/UpFile';
import DataProcessing from './components/DataProcessing/DataProcessing';
import ImageGen from './components/ImageGen/ImageGen';

import './styles/App.css';

function App() {
    const [currentStep, setCurrentStep] = useState(0);
    const [fileData, setFileData] = useState(null); // 用于存储解析后的文件数据
    const [normalizedData, setNormalizedData] = useState(null);
    const steps = [
        { label: 'File Upload' },
        { label: 'Data Processing' },
        { label: 'Image Generation' },
    ];

    const handleStepClick = (index) => {
        setCurrentStep(index);
    };
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // 回调函数，用于接收子组件传递的文件数据
    const handleFileData = (data) => {
        setFileData(data); // 将解析后的数据存储到状态中
        console.log('File data received in App:', data); // 打印数据到控制台
    };

    const handleNormalizeData = (data) => {
        setNormalizedData(data);
        console.log('Normalize data received in App:', data);
    };

    // 根据 currentStep 的值决定渲染哪个组件
    const renderComponent = () => {
        switch (currentStep) {
            case 0:
                return <Upfile onFileData={handleFileData} />;
            case 1:
                return <DataProcessing fileData={fileData} onNormalizeData={handleNormalizeData}/>;
            case 2:
                return <ImageGen normalizedData={normalizedData} />
            default:
                return null;
        }
    };

    return (
        <div>
            <div style={{marginTop: 200}}></div>
            <StepsBar
                steps={steps}
                currentStep={currentStep}
                onStepClick={handleStepClick}
            />
            <div style={{marginTop: 200}}></div>
            {renderComponent()}
            <div style={{marginTop: 100, textAlign: 'center'}}>
                <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="step-button previous-button"
                >
                    上一步
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1}
                    className="step-button next-button"
                >
                    下一步
                </button>
            </div>
            <div style={{marginTop: 200}}></div>
        </div>
    );
}

export default App;