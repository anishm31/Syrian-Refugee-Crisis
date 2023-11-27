import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

function ProviderVisualizationsPage() {
  const [treatmentData, setTreatmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.mentalhealthaustin.me/get_all_treatments/');
        setTreatmentData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Preprocess the data to aggregate counts for each treatment_type
  const aggregatedData = treatmentData.reduce((acc, entry) => {
    const existingEntry = acc.find((item) => item.treatment_type === entry.treatment_type);

    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      acc.push({ treatment_type: entry.treatment_type, count: 1 });
    }

    return acc;
  }, []);

  // useEffect(() => {
  //   console.log(treatmentData);
  // }, [treatmentData]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const legendPayload = aggregatedData.map((entry, index) => ({
    value: entry.treatment_type,
    color: COLORS[index % COLORS.length],
  }));

  // useEffect(() => {
  //   if (chartRef.current && treatmentData.length > 0) {
  //     const width = 500;
  //     const height = 500;
  //     const radius = Math.min(width, height) / 2;
  //     const color = d3.scaleOrdinal(d3.schemeCategory10);

  //     const arc = d3
  //       .arc()
  //       .outerRadius(radius - 10)
  //       .innerRadius(radius - 70);

  //     const pie = d3
  //       .pie()
  //       .sort(null)
  //       .value((d) => 1); // Each treatment type is considered as 1 unit for simplicity

  //     const chart = d3
  //       .select(chartRef.current)
  //       .append('svg')
  //       .attr('width', width)
  //       .attr('height', height)
  //       .append('g')
  //       .attr('transform', `translate(${width / 2},${height / 2})`);

  //     const g = chart
  //       .selectAll('.arc')
  //       .data(pie(treatmentData))
  //       .enter()
  //       .append('g')
  //       .attr('class', 'arc');

  //     g.append('path')
  //       .attr('d', arc)
  //       .style('fill', (d) => color(d.data.treatment_type));

  //     // Add labels if needed
  //     g.append('text')
  //       .attr('transform', (d) => `translate(${arc.centroid(d)})`)
  //       .attr('dy', '.35em')
  //       .style('text-anchor', 'middle')
  //       .text((d) => d.data.treatment_type);
  //   }
  // }, [treatmentData]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2 style={{ textAlign: 'center' }}>Types and Distribution of Mental Health Treatments</h2>
        {aggregatedData.length > 0 && (
          <PieChart width={800} height={600}>
            <Pie
              data={aggregatedData}
              cx={400}
              cy={300}
              outerRadius={200}
              fill="#8884d8"
              dataKey="count"
              label
            >
              {aggregatedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, props) => [value, props.payload.treatment_type]} />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              payload={aggregatedData.map((entry, index) => ({
                value: entry.treatment_type,
                type: 'square',
                color: COLORS[index % COLORS.length],
              }))}
            />
          </PieChart>
        )}
      </div>
    </div>
  );
}

export default ProviderVisualizationsPage;