# Drone Dashboard

This project simulates a fleet of 5 autonomous drones sending telemetry data (battery %, GPS, random int)
to a TimescaleDB backend every 10 seconds. A frontend visualizes battery data over a selected time window.

## Demo Walkthrough
<div>
    <a target="_blank" href="https://www.loom.com/share/6c2e1cf0e85548f8be56e1cafe23ccf9?t=39&sid=c5a6a74b-2d88-4877-84e0-c18985eb27bf">
      <p>Real-Time Drone Battery Monitoring Dashboard - Watch Video</p>
    </a>
    <a target="_blank" href="https://www.loom.com/share/6c2e1cf0e85548f8be56e1cafe23ccf9?t=39&sid=c5a6a74b-2d88-4877-84e0-c18985eb27bf">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/6c2e1cf0e85548f8be56e1cafe23ccf9-37ac1716c86722a8-full-play.gif">
    </a>
</div>

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
