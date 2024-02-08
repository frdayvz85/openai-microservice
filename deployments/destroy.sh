#!/bin/bash

# Deploy the secret
kubectl delete  -f secrets.yaml

# Deploy the config map
kubectl delete  -f config-maps.yaml

# Deploy the deployment files
kubectl delete  -f code-generate.yaml
kubectl delete  -f video-generate.yaml
kubectl delete  -f api-gateway.yaml


echo "Deletion completed successfully."