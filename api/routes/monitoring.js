const client = require("prom-client");
const os = require("os");
const {
  numberOfVisitors,
  cpuUsage,
  storageUsage,
  ramUsage,
  diskUsageGauge,
  networkTrafficCounter,
} = require("../utils/monitoring");

const routeMonitoring = (route, app) => {
    app.get(route + "/", (req, res) => {
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
    
    // Metrics Endpoint for Prometheus
    app.get(route + "/metrics", async (req, res) => {
        res.set("Content-Type", client.register.contentType);
        res.end(await client.register.metrics());
    });
    
    app.get(route + "/test-scenario", (req, res) => {
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
}

module.exports = routeMonitoring