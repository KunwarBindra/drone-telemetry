const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'telemetry_db',
  port: 5432,
});

app.post('/api/telemetry', async (req, res) => {
  const { droneId, battery, latitude, longitude, randomVal } = req.body;
  try {
    await pool.query(
      'INSERT INTO telemetry (time, drone_id, battery, latitude, longitude, random_val) VALUES (NOW(), $1, $2, $3, $4, $5)',
      [droneId, battery, latitude, longitude, randomVal]
    );
    res.status(201).json({ message: 'Data inserted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

app.get('/api/battery', async (req, res) => {
  const { droneId, start, end } = req.query;
  try {
    const result = await pool.query(
      'SELECT time, battery FROM telemetry WHERE drone_id = $1 AND time BETWEEN $2 AND $3 ORDER BY time ASC',
      [droneId, start, end]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
