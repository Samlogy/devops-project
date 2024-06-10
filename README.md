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



* build node-app image + version tag:
docker build -t sammmmmm/node-app:latest .

* create a container from the image: 
docker run node-app:latest  
docker run -d -p 3000:3000 --name node-app sammmmmm/node-app:latest 



cree un compte AWS
 ec2, RDS, S3, SM

tester EC2 + GITHUB ACTIONS TO DEPLOY PROD


## Pipeline:
**CI:** config => build => tests => sonarqube => synk => docker hub (log, build, push)
**CD:** connect ec2 => docker hub (log, pull) => ec2 (stop, delete container) => run ocker container

## AWS
create an aws account

**AWS Credentials:**
- email: senanisammy@gmail.com 
- password: #3TyjzG5CiYRr_^

**create multiple services**: ec2, s3, service manager, rds.

## EC2:
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


## ROUTE 53:
associate ec2 instance ip address with domain name

## ACM:
put an ssl/tls cerificate on the domain name

`https://medium.com/@rahulvikhe25/configure-node-js-on-ec2-with-cloudfront-route-53-and-aws-certificate-manager-d9ae6d364a18`


## Client (React)

install 

```bash
npm install cypress --save-dev
```

add these scripts:

```bash
"test": "npx cypress run",
"cypress:open": "npx cypress open"
```
