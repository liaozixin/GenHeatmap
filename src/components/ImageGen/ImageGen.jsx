import React, { useRef, useEffect, useState } from 'react';

function ImageGen(props) {
    const { normalizedData } = props;
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);
    const [influenceRadius, setInfluenceRadius] = useState(12);
    const [startColor, setStartColor] = useState('#eeeeee');
    const [endColor, setEndColor] = useState('#f86002');
    const heatmapRef = useRef(null); // 用于引用 heatmap 容器
    const heatmapInstanceRef = useRef(null); // 用于保存 heatmap 实例

    // 初始化或更新 heatmap.js 实例
    const initHeatmap = () => {
        if (heatmapRef.current && window.h337) {
            // 销毁旧的 heatmap 实例
            if (heatmapInstanceRef.current) {
                heatmapInstanceRef.current = null;
            }

            // 创建新的 heatmap 实例
            heatmapInstanceRef.current = window.h337.create({
                container: heatmapRef.current, // 将热力图渲染到指定的容器中
                radius: influenceRadius, // 设置热力点的半径
                maxOpacity: 0.6, // 最大不透明度
                minOpacity: 0, // 最小不透明度
                blur: 0.75, // 模糊程度
                gradient: {
                    0.25: startColor, // 起始颜色
                    0.55: '#ffa500', // 中间颜色
                    0.85: endColor, // 结束颜色
                },
            });
        }
    };

    // 当 influenceRadius、startColor 或 endColor 变化时，重新初始化 heatmap
    useEffect(() => {
        initHeatmap();
    }, [influenceRadius, startColor, endColor]);

    // 当 normalizedData 变化时，重新绘制热力图
    useEffect(() => {
        if (normalizedData && normalizedData.length > 0 && heatmapInstanceRef.current) {
            const rowCount = normalizedData.length;
            const colCount = normalizedData[0].length;
            setRows(rowCount);
            setCols(colCount);

            // 计算点的位置和值
            const padding = 50;
            const availableWidth = 500 - 2 * padding;
            const availableHeight = 500 - 2 * padding;

            const points = [];
            for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                for (let colIndex = 0; colIndex < colCount; colIndex++) {
                    const value = normalizedData[rowIndex][colIndex];
                    const x = padding + (colIndex / (colCount - 1)) * availableWidth;
                    const y = padding + (rowIndex / (rowCount - 1)) * availableHeight;
                    points.push({ x: Math.round(x), y: Math.round(y), value });
                }
            }

            // 设置热力图数据
            heatmapInstanceRef.current.setData({
                max: 1, // 最大值
                min: 0, // 最小值
                data: points, // 数据点
            });
        } else {
            setRows(0);
            setCols(0);
            if (heatmapInstanceRef.current) {
                heatmapInstanceRef.current.setData({ max: 0, data: [] }); // 清空热力图
            }
        }
    }, [normalizedData]);

    return (
        <div>
            {normalizedData ? (
                <div>
                    <div>
                        <label htmlFor="influenceRadius">Influence Radius: </label>
                        <input
                            id="influenceRadius"
                            type="number"
                            min="10"
                            max="100"
                            value={influenceRadius}
                            onChange={(e) => setInfluenceRadius(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="startColor">Start Color: </label>
                        <input
                            id="startColor"
                            type="color"
                            value={startColor}
                            onChange={(e) => setStartColor(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="endColor">End Color: </label>
                        <input
                            id="endColor"
                            type="color"
                            value={endColor}
                            onChange={(e) => setEndColor(e.target.value)}
                        />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div
                            ref={heatmapRef}
                            style={{
                                width: '500px',
                                height: '500px',
                                border: '1px solid #ccc',
                                display: 'inline-block',
                            }}
                        ></div>
                    </div>
                </div>
            ) : (
                <p>No normalized data available. Please process the data first.</p>
            )}
        </div>
    );
}

export default ImageGen;