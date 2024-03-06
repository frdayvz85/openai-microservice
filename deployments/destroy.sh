#!/bin/bash

# Delete the secret
kubectl delete -f secrets.yaml

# Delete the config map
kubectl delete -f config-maps.yaml

# Delete the deployment files
kubectl delete -f code-generate.yaml
kubectl delete -f video-generate.yaml
kubectl delete -f frontend.yaml
kubectl delete -f api-gateway.yaml

echo "Deletion completed successfully."