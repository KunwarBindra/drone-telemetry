import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './index.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function App() {
  const [droneId, setDroneId] = useState('drone1');
  const [minutes, setMinutes] = useState(30);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const end = new Date();
      const start = new Date(end.getTime() - minutes * 60000);
      const params = new URLSearchParams({
        droneId,
        start: start.toISOString(),
        end: end.toISOString()
      });

      fetch(`http://localhost:3000/api/battery?${params}`)
        .then(res => res.json())
        .then(rows => setData(rows))
        .catch(console.error);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [droneId, minutes]);

  const chartData = {
    labels: data.map(d => new Date(d.time).toLocaleTimeString()),
    datasets: [
      {
        label: `Battery % - ${droneId}`,
        data: data.map(d => d.battery),
        borderColor: 'blue',
        tension: 0.4,
        fill: false
      }
    ]
  };

  return (
    <div className="container">
      <h1>Drone Battery Monitor</h1>

      <div className="controls">
        <div className="input-group">
          <label>Select Drone</label>
          <select value={droneId} onChange={e => setDroneId(e.target.value)}>
            {['drone1', 'drone2', 'drone3', 'drone4', 'drone5'].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Time Window (minutes)</label>
          <input
            type="number"
            min={1}
            value={minutes}
            onChange={e => setMinutes(+e.target.value)}
          />
        </div>
      </div>

      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default App;