#!/bin/bash

# Create uploads directory if it doesn't exist
mkdir -p /app/backend/uploads

# Start the FastAPI application
uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001}
