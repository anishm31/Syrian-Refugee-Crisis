import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const CharityPieChart = ({ charitiesData }) => {
    const [chartInstance, setChartInstance] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!charitiesData) return;

        // destroy existing chart instance before creating a new one
        if (chartInstance) {
            chartInstance.destroy();
        }
        const newChartInstance = new Chart("dummyCanvasId", {
            type: "doughnut",
            data: generateReliefChartData(charitiesData),
            options: {},
        });
        setChartInstance(newChartInstance);
        // destroy the chart instance when the component is unmounted
        return () => {
            newChartInstance.destroy();
        };
    }, [charitiesData]);

    const generateReliefChartData = (charitiesData) => {
        if (!charitiesData) return null;

        const reliefCount = {};
        charitiesData.data.forEach((charity) => {
            charity.relief_provided.forEach((relief) => {
                reliefCount[relief] = (reliefCount[relief] || 0) + 1;
            });
        });

        const labels = Object.keys(reliefCount);
        const data = Object.values(reliefCount);

        const customColors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#9C27B0',
            '#2196F3', '#FF5722', '#607D8B', '#E91E63', '#795548', '#00BCD4',
            '#8BC34A', '#673AB7', '#CDDC39', '#FF5252', '#FFC107', '#3F51B5',
            '#009688', '#FFD600', '#FF4081', '#8D6E63', '#FF5722', '#536DFE'
        ];

        return {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: customColors.slice(0, data.length),
                    hoverBackgroundColor: customColors.slice(0, data.length),
                },
            ],
        };
    };

    const generateLegend = () => {
        const data = generateReliefChartData(charitiesData);
        if (!data) return null;

        return (
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {data.labels.map((label, index) => (
                    <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <span
                        style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            backgroundColor: data.datasets[0].backgroundColor[index],
                            marginRight: '5px',
                        }}
                    />
                    <span style={{ fontSize: '12px' }}>{`${label}: ${data.datasets[0].data[index]}`}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
                <Doughnut
                    data={generateReliefChartData(charitiesData)}
                    options={{
                        tooltips: {
                            callbacks: {
                                label: (tooltipItem, data) => {
                                    const dataset = data.datasets[tooltipItem.datasetIndex];
                                    const total = dataset.data.reduce((accumulator, currentValue) => accumulator + currentValue);
                                    const currentValue = dataset.data[tooltipItem.index];
                                    const percentage = ((currentValue / total) * 100).toFixed(2) + "%";
                                    return `${data.labels[tooltipItem.index]}: ${percentage}`;
                                },
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Number of Charities Supporting Each Relief',
                                position: 'top',
                                font: { size: 16, weight: 'bold' },
                            },
                            afterDraw: (chart) => {
                                const ctx = chart.ctx;
                                const { config } = chart;
                                const { data } = config;
                                const { datasets } = data;
                                const radius = chart.innerRadius + (chart.outerRadius - chart.innerRadius) / 2;
                                const offset = Math.PI / 180;

                                ctx.fillStyle = 'black';
                                ctx.font = Chart.helpers.fontString(12, 'normal', Chart.defaults.font.family);

                                datasets.forEach((dataset, i) => {
                                    const meta = chart.getDatasetMeta(i);
                                    meta.data.forEach((element, index) => {
                                        const currentValue = dataset.data[index];
                                        if (currentValue !== 0) {
                                            const angle = meta.data[index].angle;
                                            const x = element.tooltipPosition().x;
                                            const y = element.tooltipPosition().y;

                                            const xOffset = Math.cos(angle - offset) * radius;
                                            const yOffset = Math.sin(angle - offset) * radius;

                                            ctx.fillText(`${data.labels[index]}: ${currentValue}`, x + xOffset, y + yOffset);
                                        }
                                    });
                                });
                            },
                        },
                    }}
                />
            </div>
            <div style={{ width: '30%', padding: '30px' }}>
                {generateLegend()}
            </div>
        </div>
    );
};

export default CharityPieChart;

