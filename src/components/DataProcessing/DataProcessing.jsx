import React, { useState } from 'react';

function DataProcessing(props) {
    const { fileData, onNormalizeData } = props;
    const [normalizationType, setNormalizationType] = useState('row'); // 归一化类型（行或列）
    const [normalizedData, setNormalizedData] = useState(null); // 归一化后的数据

    if (!fileData || fileData.length === 0) {
        return <div>暂无数据，请先上传文件。</div>;
    }

    // 归一化函数
    const normalizeData = () => {
        let data = fileData.map(row => [...row]); // 深拷贝数据

        if (normalizationType === 'row') {
            // 按行归一化
            data = data.map(row => {
                const max = Math.max(...row);
                const min = Math.min(...row);
                return row.map(cell => ((cell - min) / (max - min)).toFixed(2));
            });
        } else if (normalizationType === 'column') {
            // 按列归一化
            const columnCount = data[0].length;
            for (let col = 0; col < columnCount; col++) {
                const columnValues = data.map(row => row[col]);
                const max = Math.max(...columnValues);
                const min = Math.min(...columnValues);
                data = data.map(row => {
                    row[col] = ((row[col] - min) / (max - min)).toFixed(2);
                    return row;
                });
            }
        }
        onNormalizeData(data); // 将归一化后的数据传递给父组件
        setNormalizedData(data); // 更新归一化后的数据
    };

    // 渲染表格
    const renderTable = (data) => (
        <table style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <td key={cellIndex} style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                            {cell}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2>Original Data</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <select
                        value={normalizationType}
                        onChange={(e) => setNormalizationType(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            fontSize: '14px',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="row">Normalize by Row</option>
                        <option value="column">Normalize by Column</option>
                    </select>
                    <button
                        onClick={normalizeData}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
                    >
                        确定
                    </button>
                </div>
            </div>

            {/* 原始数据表格 */}
            {renderTable(fileData)}

            {/* 归一化后的数据表格 */}
            {normalizedData && (
                <div style={{ marginTop: '40px' }}>
                    <h2>Normalized Data</h2>
                    {renderTable(normalizedData)}
                </div>
            )}
        </div>
    );
}

export default DataProcessing;