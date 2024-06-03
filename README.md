## Monitoring Node Prometheus + Grafana

### Prometheus

1. go to: `http://localhost:9090`
2. go graph tab enter metric name "cpu_usage_percent" in search field

### App

1. check all metrics (prometheus): `http://localhost:3000/metrics`
2. launch test scenario for our app
3. check all metrics (prometheus): `http://localhost:3000/health`
4. check all metrics (prometheus): `http://localhost:3000/metrics`

### Grafana

1. go to: `http://localhost:3001`
2. explore

**NB:**
Most important metrics in monitoring:

- CPU, RAM Usage
- Number of visitors
- Disk, Network Traffic Usage

## Logs Centralization (ELK)

Once the setup is done, check in Elasticsearch: `http://localhost:9200/_cat/indices`

To check in Kibana and display your logs, follow these steps:

1. Access this URL: `http://localhost:5601/`
2. Follow these steps within Kibana:
   - Explore on my own
   - Stack Management / Index Management
   - Index Patterns
   - Create a new index pattern with the same name as the app and select `@timestamp`
   - Go to Discover and test to make other logs appear

### NB:

**build & run docker image:** \*\*\*\*

```bash
docker build -t node-api .
docker run -p 3001:3001 node-api
```

**build & run docker compose:** \*\*\*\*

```bash
docker-compose up --build
docker-compose down
```
