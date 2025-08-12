 curl -s http://localhost:3000/api/users/create
 docker compose up -d && docker compose logs -f

 docker exec user-service-postgres-1 psql -U user -d user_service -c "\d users"