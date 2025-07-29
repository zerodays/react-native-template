#!/bin/bash
set -e # The script fails if any of the steps fail

# This script fetches secrets from Infisical and creates a .env file

# Function to use jq command
use_jq() {
    if command -v jq >/dev/null 2>&1; then
        # Use system jq
        jq "$@"
    else
        # Use downloaded jq
        ./jq "$@"
    fi
}

# Download jq binary only if EAS_BUILD is true and jq is not available in the system
if [ "$EAS_BUILD" = "true" ] && ! command -v jq >/dev/null 2>&1; then
    echo "EAS_BUILD is true and jq is not installed. Downloading jq binary..."

    # Check the platform and download the appropriate jq binary
    if [ "$EAS_BUILD_PLATFORM" = "ios" ]; then
        curl -L -o jq https://github.com/jqlang/jq/releases/download/jq-1.7.1/jq-macos-arm64 && chmod +x ./jq
    else
        curl -L -o jq https://github.com/jqlang/jq/releases/download/jq-1.7.1/jq-linux-amd64 && chmod +x ./jq
    fi
else
    echo "Skipping jq binary download."
fi

# Determine the environment to use
ENVIRONMENT="staging"
if [ "$EAS_BUILD_PROFILE" = "production" ]; then
    ENVIRONMENT="prod"
fi
echo "Using environment: $ENVIRONMENT"

SECRET_PATH="/native"
WORKSPACE_ID="650c0ca916f6d380e9193251"

# Fetch secrets and create .env file
echo "Fetching secrets and creating .env file..."
curl "https://app.infisical.com/api/v3/secrets/raw?environment=$ENVIRONMENT&secretPath=$SECRET_PATH&workspaceId=$WORKSPACE_ID" \
    --header "Authorization: Bearer $INFISICAL_TOKEN" | \
    use_jq -r '.secrets[] | "\(.secretKey)=\(.secretValue)"' > .env

# Cleanup if ./jq binary was downloaded
if [ -f "./jq" ]; then
    echo "Cleaning up ./jq binary..."
    rm ./jq
fi

echo "Script execution completed."
