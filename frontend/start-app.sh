#!/bin/bash

# Function to check if a port is in use
is_port_in_use() {
  lsof -i:$1 > /dev/null 2>&1
}

# Stop any running instances of the React application
pkill -f "react-scripts start"

# Start the React application on port 3001 or next available port
PORT=3001
while is_port_in_use $PORT; do
  PORT=$((PORT + 1))
done

# Start the React application
npm start --port $PORT &

# Wait for the application to start
sleep 5

# Display clickable links
echo "You can now view the application in the browser:"
echo "Please refresh your browser to see the latest updates."
echo "Front-end: http://localhost:$PORT"
echo "API: http://localhost:3002" # Update this if the API runs on a different port
echo "Backend: http://localhost:3003" # Update this if the backend runs on a different port
