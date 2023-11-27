import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import Spinner from 'react-bootstrap/Spinner';

const TreatmentPieChart = () => {
  const [treatmentData, setTreatmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.mentalhealthaustin.me/get_all_treatments/');
        setTreatmentData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Preprocess the data to aggregate counts for each disorder
  const aggregatedData = treatmentData.reduce((acc, entry) => {
    entry.disorders_list.forEach(disorder => {
      const existingEntry = acc.find(item => item.disorder === disorder);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ disorder, count: 1 });
      }
    });

    return acc;
  }, []);

  const sortedData = aggregatedData.sort((a, b) => b.count - a.count);

  // display only the top N disorders
  const topN = 10;
  const topNData = sortedData.slice(0, topN);
  const otherData = sortedData.slice(topN);

  // Aggregate the counts of the "Other" category
  const otherCount = otherData.reduce((acc, entry) => acc + entry.count, 0);
  const finalData = [...topNData, { disorder: 'Other', count: otherCount }];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6666'];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spinner animation="border" variant="primary" role="status" style={{ display: loading ? 'block' : 'none' }} />
    {!loading && (
      <div>
        <h3 style={{ textAlign: 'center' }}>Mental Health Treatments</h3>
        {finalData.length > 0 && (
          <PieChart width={800} height={600}>
            <Pie
              data={finalData}
              cx={300}
              cy={300}
              outerRadius={200}
              fill="#8884d8"
              dataKey="count"
              label
            >
              {finalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, props) => [value, props.payload.disorder]} />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              wrapperStyle={{ right: '-120px', top: '30%' }}
              payload={finalData.map((entry, index) => ({
                value: entry.disorder,
                type: 'square',
                color: COLORS[index % COLORS.length],
              }))}
            />
          </PieChart>
        )}
      </div>
    )}
  </div>
  );
};

export default TreatmentPieChart;
