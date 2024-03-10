
update_docker_image() {
    # Check if Docker image name is provided
    if [ -z "$1" ]; then
        echo "Please provide the Docker image name (without the username) as an argument."
        exit 1
    fi

    # Check if Dockerfile exists in the specified directory
    if [ ! -f "$1/Dockerfile" ]; then
        echo "Dockerfile not found in directory $1."
        exit 1
    fi

    # Navigate to the directory containing Dockerfile
    cd "$1" || exit 1

    # Prompt user for version number
    read -p "Enter the version number: " VERSION

    # Docker image details
    DOCKER_IMAGE="farid25/$2"
    DOCKER_TAG="$DOCKER_IMAGE:$VERSION"

    # Build the Docker image
    docker build --no-cache -t $DOCKER_TAG .

    # Tag the Docker image with latest
    docker tag $DOCKER_TAG $DOCKER_IMAGE:latest

    # Push the Docker image to Docker Hub
    docker push $DOCKER_TAG
    docker push $DOCKER_IMAGE:latest

    # Return to the original directory
    cd - || exit 1
}

# Check if both directory and image name are provided as arguments
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <directory_containing_dockerfile> <docker_image_name>"
    exit 1
fi

# Call the function with provided directory and Docker image name
update_docker_image "$1" "$2"

# Example use case
# ./send.sh ../api-gateway apigt //inside of deployments folder run this code