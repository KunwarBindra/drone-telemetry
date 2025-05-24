CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE telemetry (
  time        TIMESTAMPTZ NOT NULL,
  drone_id    TEXT NOT NULL,
  battery     INTEGER,
  latitude    DOUBLE PRECISION,
  longitude   DOUBLE PRECISION,
  random_val  INTEGER
);

SELECT create_hypertable('telemetry', 'time');
CREATE INDEX ON telemetry (drone_id, time DESC);
