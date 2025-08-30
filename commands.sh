 curl -s http://localhost:3000/api/users/create
 docker compose up -d && docker compose logs -f
 docker-compose down
 docker-compose build --no-cache
 docker-compose up

 docker exec user-service-postgres-1 psql -U user -d user_service -c "\d users"
 docker exec user-service-postgres-1 psql -U user -d user_service -c "SELECT * FROM users;"



 curl -X POST http://localhost:3000/api/users/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hira hasan",
    "email": "john.does@example.com"
  }'