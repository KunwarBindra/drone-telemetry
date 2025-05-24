# Drone Dashboard

This project simulates a fleet of 5 autonomous drones sending telemetry data (battery %, GPS, random int)
to a TimescaleDB backend every 10 seconds. A frontend visualizes battery data over a selected time window.

## Stack
- Backend: Node.js + Express
- DB: TimescaleDB (via PostgreSQL)
- Frontend: React + TailwindCSS
- Simulation: Node.js script
- All components run via Docker Compose

## Run the project

1. Clone the repo
2. Run:

```bash
docker compose up --build
```

This will start TimescaleDB, the backend API, the simulator, and the frontend UI.

## Access
- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend API: [http://localhost:3000/api](http://localhost:3000/api)
