const express = require("express");
const promBundle = require("express-prom-bundle");
const client = require("prom-client");
const os = require("os");
const winston = require("winston");

// Prometheus / Grafana *******************************************************

const metricsMiddleware = promBundle({ includeMethod: true });

const PORT = process.env.PORT || 3000;

const app = express();
app.use(metricsMiddleware);

const numberOfVisitors = new client.Counter({
  name: "app_visitors_total",
  help: "Total number of visitors to the app",
});

// Custom metric: CPU, Storage, RAM usage
const cpuUsage = new client.Gauge({
  name: "cpu_usage_percent",
  help: "CPU usage percentage",
});

const storageUsage = new client.Gauge({
  name: "storage_usage_bytes",
  help: "Storage usage in bytes",
});

const ramUsage = new client.Gauge({
  name: "ram_usage_bytes",
  help: "RAM usage in bytes",
});

const diskUsageGauge = new client.Gauge({
  name: "disk_usage",
  help: "Disk Usage in Bytes",
});

const networkTrafficCounter = new client.Counter({
  name: "network_traffic",
  help: "Network Traffic in Bytes",
});

app.get("/", (req, res) => {
  // Increment number of visitors
  numberOfVisitors.inc();

  // Endpoint logic
  // Update CPU, Storage, RAM metrics
  const cpuPercentage = os.loadavg()[0] * 100; // Example CPU usage calculation
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  cpuUsage.set(cpuPercentage);
  storageUsage.set(1000000000); // Example storage usage in bytes
  ramUsage.set(usedMemory);

  // Update metrics
  // diskUsageGauge.set(getDiskUsageInBytes());
  // networkTrafficCounter.inc(getNetworkTrafficInBytes());

  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  res.send("OK!");
});

// Metrics Endpoint for Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.get("/test-scenario", (req, res) => {
  // Simulate a test scenario: Increase traffic by incrementing visitors
  for (let i = 0; i < 100; i++) {
    numberOfVisitors.inc();
  }

  // Simulate high CPU usage (80%)
  cpuUsage.set(80);

  // Simulate increased storage and RAM usage
  storageUsage.set(2000000000); // Example: Increased storage usage in bytes
  ramUsage.set(1500000000); // Example: Increased RAM usage in bytes

  res.send("Test scenario executed: Increased traffic and metrics.");
});

// app.listen(PORT, () => {
//   console.log("Server is running on port: ", PORT);
// });

// import express from "express";
// import winston from "winston";

// const PORT = process.env.PORT || 3001;

// const app = express();

// ELK *******************************************************

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

app.get("/health", (req, res) => {
  logger.info("App is Running !");
  res.send("App is Running !");
});

app.get("/a", (req, res) => {
  logger.info("Endpoint A called !");
  res.send("Endpoint A called !");
});

app.get("/b", (req, res) => {
  logger.info("Endpoint B called !");
  res.send("Endpoint B called !");
});

app.listen(PORT, () => console.log("server => ", PORT));

// Tracing *******************************************************
