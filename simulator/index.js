const axios = require('axios');

const drones = Array.from({ length: 5 }, (_, i) => ({
  id: `drone${i + 1}`,
  battery: 100,
  lat: 37.7749 + Math.random(),
  lon: -122.4194 + Math.random()
}));

async function sendTelemetry(drone) {
  drone.battery = Math.max(0, drone.battery - Math.floor(Math.random() * 5));
  drone.lat += (Math.random() - 0.5) * 0.01;
  drone.lon += (Math.random() - 0.5) * 0.01;

  try {
    await axios.post('http://backend:3000/api/telemetry', {
      droneId: drone.id,
      battery: drone.battery,
      latitude: drone.lat,
      longitude: drone.lon,
      randomVal: Math.floor(Math.random() * 199) + 1
    });
    console.log(`Sent telemetry for ${drone.id}`);
  } catch (err) {
    console.error(`Error sending data for ${drone.id}:`, err.message);
  }
}

setInterval(() => {
  drones.forEach(drone => sendTelemetry(drone));
}, 10000);
