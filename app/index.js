const express = require("express");


const { metricsMiddleware } = require("./middlewares/monitoring");

const routeHealth = require('./routes/health')
const routeMonitoring = require('./routes/monitoring')


const PORT = process.env.PORT || 3000;

const app = express();

app.use(metricsMiddleware);


app.listen(PORT, () => {
  console.log("server => ", PORT)

  routeHealth('/health-check', app);

  // Prometheus / Grafana *******************************************************
  routeMonitoring('/monitoring', app)
});

// Tracing *******************************************************