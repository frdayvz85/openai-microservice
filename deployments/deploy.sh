#!/bin/bash

# Deploy the secret
kubectl apply -f secrets.yaml

# Deploy the config map
kubectl apply -f config-maps.yaml

# Deploy the deployment files
kubectl apply -f code-generate.yaml
kubectl apply -f video-generate.yaml
kubectl apply -f frontend.yaml
kubectl apply -f api-gateway.yaml


INGRESS_NAME_1="frontend-ingress"
INGRESS_NAME_2="backend-ingress"
INGRESS_FILE_NAME="ingress.yaml"
# Check if ingress resources with names "frontend-ingress" and "backend-ingress" exist
if kubectl get ingress $INGRESS_NAME_1 &>/dev/null && kubectl get ingress $INGRESS_NAME_2 &>/dev/null; then
    echo "Ingress resources '$INGRESS_NAME_1' and '$INGRESS_NAME_2' already exist. Skipping..."
else
    echo "Ingress resources '$INGRESS_NAME_1' and '$INGRESS_NAME_2' not found. Applying $INGRESS_FILE_NAME..."
    kubectl apply -f $INGRESS_FILE_NAME
fi
