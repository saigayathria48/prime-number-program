# Prime Number Program

This project checks whether an integer is prime and includes a small HTTP sample application for Jenkins and Kubernetes deployment.

## Run the prime checker

```powershell
node prime.js 17
```

Expected output: `17 is a prime number`.

## Test

```powershell
npm test
```

## Run the web application locally

```powershell
npm start
```

Open `http://localhost:3000/api/prime/17` to see the JSON result. The `/healthz` endpoint is used by Kubernetes health probes.

## Build and run with Docker

```powershell
docker build -t prime-number-app:latest .
docker run --rm -p 3000:3000 prime-number-app:latest
```

## Kubernetes

The Docker Desktop Kubernetes cluster is used for the local lab deployment. Jenkins runs the tests, builds the image, applies the manifests in `k8s/`, and waits for the deployment rollout to complete.

```powershell
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get deployments,pods,services -l app=prime-number-app
```
