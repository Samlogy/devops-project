## Getting Started

## Tech Stack

1. Nodejs
2. Prometheus / Grafana
3. ELK
4. AWS (EC2, RDS, S3)
5. GitHub Actions

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

## AWS services

There are two primary services: RDS and S3.

- **RDS:** This service supports a range of CRUD operations, including: get, getById, post, updateById, deleteById
- **S3:** This service offers a variety of file operations, such as: upload file, delete file, list files, getSignedUrl

## Architecture

The Node.js application is a monolith with a modular approach, which separates each distinct feature into its own module. This structure enhances maintainability and scalability.

```bash
├── app
│   ├── Dockerfile
│   ├── index.js
│   ├── logs
│   │   └── app.log
│   ├── middlewares
│   │   └── monitoring.js
│   ├── package.json
│   ├── package-lock.json
│   ├── routes
│   │   ├── aws_routes.js
│   │   ├── health.js
│   │   └── monitoring.js
│   ├── services
│   │   ├── aws_rds.js
│   │   └── aws_s3.js
│   └── utils
│   ├── logger.js
│   └── monitoring.js
├── app-logs
├── docker-compose.yml
├── filebeat
│   ├── Dockerfile
│   └── filebeat.yml
├── grafana
│   ├── dashboards
│   │   └── dashboard.json
│   └── datasources
│   └── datasource.yaml
├── package-lock.json
├── prometheus
│   └── prometheus.yml
└── README.md
```

### NB:

\*\*build & run docker image:

```bash
docker build -t node-api .
docker run -p 3001:3001 node-api
```

**build & run docker compose:**

```bash
docker-compose up --build
docker-compose down
```

## Tests

```bash
npm test
npm run test:unit
npm run test:integration
```
