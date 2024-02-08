#!/bin/bash

# Deploy the secret
kubectl apply -f secrets.yaml

# Deploy the config map
kubectl apply -f config-maps.yaml

# Deploy the deployment files
kubectl apply -f code-generate.yaml
kubectl apply -f video-generate.yaml
kubectl apply -f api-gateway.yaml

echo "Deployment completed successfully."