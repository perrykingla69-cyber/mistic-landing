# Mistic Landing MVP (Local Production-Ready Docker Setup)

This repository contains a modular MVP scaffold for:
- CRM for musicians and accordion repair clients
- Order management
- Event booking
- Dashboard analytics
- CFDI-compatible invoice placeholders
- n8n-ready webhooks
- Multi-tenant architecture (brandable tenants)

## Stack
- Node.js + Express backend
- PostgreSQL
- Redis
- React frontend (admin/client panel base)
- Nginx reverse proxy
- Docker Compose

## Quick start (Ubuntu Server)

1. Copy environment file:
```bash
cp .env.example .env
```

2. Start all services:
```bash
docker compose up -d --build
```

3. Open app/API:
- App via Nginx: `http://SERVER_IP:${NGINX_PORT}`
- API health: `http://SERVER_IP:${NGINX_PORT}/api/health`

## Service structure
- `backend/` Express REST API (JWT auth, roles, tenant scoping)
- `frontend/` React admin/client dashboard shell
- `nginx/` reverse proxy config
- `docker-compose.yml` orchestration with persistent volumes

## API overview
Base path: `/api`
- `POST /auth/register` (tenant-scoped)
- `POST /auth/login` (tenant-scoped)
- `POST /tenants` / `GET /tenants` (Admin)
- `GET/POST /clients`
- `GET/POST /orders`
- `GET/POST /events`
- `GET/POST /invoices` (CFDI fields)
- `GET /analytics/dashboard`
- `POST /webhooks/n8n` (n8n automation entry)

### Multi-tenant usage
Pass tenant context with:
- Header: `x-tenant-id: <uuid>`

## Notes for production hardening
- Replace `JWT_SECRET` and restrict CORS.
- Configure HTTPS termination (Let's Encrypt/Nginx).
- Add backup strategy for `postgres_data` and `redis_data` volumes.
- Add CI checks and API schema validation expansion.
