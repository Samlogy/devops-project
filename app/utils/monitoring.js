const client = require('prom-client')

const numberOfVisitors = new client.Counter({
    name: 'app_visitors_total',
    help: 'Total number of visitors to the app',
})

// Custom metric: CPU, Storage, RAM usage
const cpuUsage = new client.Gauge({
    name: 'cpu_usage_percent',
    help: 'CPU usage percentage',
})

const storageUsage = new client.Gauge({
    name: 'storage_usage_bytes',
    help: 'Storage usage in bytes',
})

const ramUsage = new client.Gauge({
    name: 'ram_usage_bytes',
    help: 'RAM usage in bytes',
})

const diskUsageGauge = new client.Gauge({
    name: 'disk_usage',
    help: 'Disk Usage in Bytes',
})

const networkTrafficCounter = new client.Counter({
    name: 'network_traffic',
    help: 'Network Traffic in Bytes',
})

module.exports = {
    numberOfVisitors,
    cpuUsage,
    storageUsage,
    ramUsage,
    diskUsageGauge,
    networkTrafficCounter,
}
