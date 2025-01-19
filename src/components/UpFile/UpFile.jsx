import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './Upfile.css'; // 外部 CSS 文件

const Upfile = ({ onFileData }) => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');
    const [isDragover, setIsDragover] = useState(false);

    // 处理文件选择
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);
            setFileName(`Selected file: ${file.name}`);
        } else {
            resetUploadContainer();
        }
    };

    // 处理拖拽悬停
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragover(true);
    };

    // 处理拖拽离开
    const handleDragLeave = () => {
        setIsDragover(false);
    };

    // 处理文件拖放
    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragover(false);

        const file = event.dataTransfer.files[0];
        if (file) {
            setUploadedFile(file);
            setFileName(`Selected file: ${file.name}`);
        } else {
            resetUploadContainer();
        }
    };

    // 确认上传
    const handleConfirmUpload = () => {
        if (uploadedFile) {
            parseFile(uploadedFile);
            resetUploadContainer();
        } else {
            alert('Please select a file first.');
        }
    };

    // 解析文件
    const parseFile = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            console.log('Parsed data:', data);
            alert('File parsed successfully! Check the console for details.');
            onFileData(data);
        };

        reader.readAsArrayBuffer(file);
    };

    // 重置上传状态
    const resetUploadContainer = () => {
        setUploadedFile(null);
        setFileName('No file chosen');
        setIsDragover(false);
    };

    return (
        <div className="upfile-container">
            <div className="upload-container">
                {/* 文件上传按钮 */}
                <label htmlFor="fileInput" className="upload-label">
                    <div className="upload-icon">📁</div>
                    Choose File
                </label>
                <input
                    type="file"
                    id="fileInput"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                />

                {/* 文件格式提示 */}
                <div className="file-format-hint">Only .xlsx or .xls files are supported.</div>

                {/* 显示文件名 */}
                <div className="file-name">{fileName}</div>

                {/* 拖放区域 */}
                <div
                    className={`drag-drop-area ${isDragover ? 'dragover' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    Drag and drop a file here
                </div>

                {/* 确认上传按钮 */}
                <button
                    className="confirm-button"
                    onClick={handleConfirmUpload}
                    disabled={!uploadedFile}
                >
                    Confirm Upload
                </button>
            </div>
        </div>
    );
};

export default Upfile;