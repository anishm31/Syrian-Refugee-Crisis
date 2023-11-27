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

  const locationCounts = {};
  const otherLocations = new Set();
  treatmentData.forEach(entry => {
    entry.locations_list.forEach(location => {
      if (locationCounts[location]) {
        locationCounts[location] += 1;
      } else {
        locationCounts[location] = 1;
      }

      if (locationCounts[location] <= 1) {
        otherLocations.add(location);
      }
    });
  });

  const sortedData = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([location, count]) => ({ location, count }));

  const topN = 10;
  const topNData = sortedData.slice(0, topN);
  const otherData = [...otherLocations].map(location => ({ location, count: 1 }));

  const otherCount = otherData.reduce((acc, entry) => acc + entry.count, 0);
  const finalData = [...topNData, { location: 'Other', count: otherCount }];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6666'];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="border" variant="primary" role="status" style={{ display: loading ? 'block' : 'none' }} />
      {!loading && (
        <div>
          <h3 style={{ textAlign: 'center' }}>Number of Mental Health Treatments per Location</h3>
          {finalData.length > 0 && (
            <PieChart width={800} height={600}>
              <Pie
                data={finalData}
                cx={200}
                cy={300}
                outerRadius={200}
                fill="#8884d8"
                dataKey="count"
                label
              >
                {finalData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, _, props) => [value, props.payload.location]} />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                wrapperStyle={{
                  right: '-300px',
                  top: '30%',
                  wordWrap: 'break-word',
                }}
                payload={finalData.map((entry, index) => ({
                  value: entry.location,
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
