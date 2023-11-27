import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import Spinner from 'react-bootstrap/Spinner';

function ProviderVisualizationsPage() {
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  // const legendPayload = aggregatedData.map((entry, index) => ({
  //   value: entry.treatment_type,
  //   color: COLORS[index % COLORS.length],
  // }));

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="border" variant="primary" role="status" style={{ display: loading ? 'block' : 'none' }} />
      {!loading && (
        <div>
          <h1 style={{ textAlign: 'center' }}>Mental Health Treatments</h1>
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
      )}
    </div>
  );
}

export default ProviderVisualizationsPage;