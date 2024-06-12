## Monitoring

### Prometheus

1. go to: `http://localhost:9090`
2. go graph tab enter metric name "cpu_usage_percent" in search field

**Access via links:**

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

## Launch Project

**build & run docker compose:**

```bash
docker-compose up --build
docker-compose down
```

##  Pipeline

- **CI:** config => build => tests => sonarqube => synk => docker hub (log, build, push).
- **CD:** connect ec2 => docker hub (log, pull) => ec2 (delete force container) => run docker container.

## AWS

create an aws account

**AWS Credentials:**

```bash
email: <senanisammy@gmail.com>
password: #3TyjzG5CiYRr_^
```

- **create multiple services**: EC2, S3, RDS, Service Manager.

### EC2

- **update & upgrade:**

```bash
sudo apt update
sudo apt upgrade
sudo apt install curl
```

- **install node/npm:**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

- **install global dependencies:** `sudo npm install pm2 -g`
- **configure nginx:**

```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/default
```

```bash
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    /home/ubuntu/devops-project/app;
    index index.html;

    server_name www.rahulvikhe.com rahulvikhe.com;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx
```

###  Route 53

associate ec2 instance ip address with domain name

### ACM

put an ssl/tls cerificate on the domain name

##  Client (React)

- create a projet `/client` that will have:
  - pipeline workflow `/client/.github/workflows`: ci/cd => automate integration / deployment.
  - the react app `/client`
- the react app will have these main features:

  - list all files present inside the s3 bucket
  - add single / multiple files to s3 bucket
  - add a new todo to rds

- Stating react app
  npm run dev // dev
  npm run build // build
  npm run build:docker // create docker image & run it
  npm run prod // production

```bash
docker build -t client-app .
docker run -p 3002:5173 client-app
```

##  Testing

- create a projet `/tesing` that will have:
  - pipeline workflow `/tesing/.github/workflows`: ci/cd => automate integration / deployment.
  - test performence / work load `/tesing/gatling`.
  - test ui e2e `/tesing/e2e`.

###  E2E Automation

- create a new projet `/testing/e2e`
- configure some config to access my remote database in AWS.
- write automation scripts.
- add these scripts:

```bash
"e2e:run": "npx cypress run", // run all e2e tests
"e2e:open": "npx cypress open" // open cypress ui
```

- add a workflow crojob that will run automaticly everyday at 0am
- archiver les rapports aprés chaque test

### Gatling Automation

- create a new projet `/testing/gatling`
- add a workflow crojob that will run automaticly everyday at 0am
- archiver les rapports aprés chaque test

`https://docs.cypress.io/guides/references/cypress-studio`

##  Infra

- create a projet `/infra` that will have:
  - pipeline workflow `/infra/.github/workflows`: ci/cd => automate integration / deployment.
  - provisionning `/infra/terraform`.
  - managing `/infra/ansible`.

## Environment

I have 2 environments:

- dev: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev up`
- prod: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d`

### NB

**build & run docker image:** \*\*\*\*

```bash
docker build -t node-api . // build docker image
docker run -p 3001:3001 node-api // run docker container
```

**useful links:**

```bash
- https://plainenglish.io/blog/step-by-step-guide-to-dockerize-react-app-created-using-vite
- https://medium.com/@rahulvikhe25/configure-node-js-on-ec2-with-cloudfront-route-53-and-aws-certificate-manager-d9ae6d364a18
```
