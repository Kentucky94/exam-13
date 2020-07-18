#!/bin/bash

echo "Running tests"

echo "API"

cd ../backend

echo "Running fixtures"
NODE_ENV=test npm run seed

echo "Running API server"
pm2 start "npm run start:test" --name="exam13-backend"

echo "Running fontend"
cd ../frontend
pm2 start "npm run start:test" --name="exam13-frontend"

echo "Running tests"
cd ../project-tests
npm start

pm2 kill

echo "I am here"