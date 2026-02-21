# Arquitectura del sistema · Sonora Mystic Corp

## 1) Visión arquitectónica

Arquitectura modular por dominios (estilo modular monolith evolutivo a microservicios):

- **Experience Layer (Frontend)**: portal web React, dashboards por rol, motor UI de comunidad y marketplace.
- **API Layer (Backend)**: Express API Gateway + módulos de negocio.
- **Domain Layer**:
  - Auth & Roles
  - Memberships & Billing
  - Profiles & Brand OS
  - Legal & Admin Assistant
  - AC / Donaciones
  - Marketplace & Orders
  - Logistics & Inventory
  - Gamification Engine
  - Community Engine
  - Metaverse Access
  - Admin Console
- **Data Layer**:
  - PostgreSQL (datos transaccionales)
  - Redis (cache, sesiones, rankings)
  - Object Storage (media/documentos)
- **Integrations**:
  - Stripe/MercadoPago
  - SAT/facturación (proveedor autorizado)
  - Paqueterías/logística
  - Email/SMS/Push

## 2) Estructura de carpetas sugerida

```text
sonora-mystic-corp/
├─ frontend/
│  ├─ src/
│  │  ├─ app/
│  │  ├─ modules/
│  │  │  ├─ auth/
│  │  │  ├─ memberships/
│  │  │  ├─ profiles/
│  │  │  ├─ legal-admin/
│  │  │  ├─ community/
│  │  │  ├─ marketplace/
│  │  │  ├─ gamification/
│  │  │  ├─ metaverse/
│  │  │  └─ admin/
│  │  ├─ components/
│  │  ├─ services/
│  │  └─ styles/
│  └─ public/
├─ backend/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ modules/
│  │  │  ├─ auth/
│  │  │  ├─ users/
│  │  │  ├─ memberships/
│  │  │  ├─ profiles/
│  │  │  ├─ legal/
│  │  │  ├─ marketplace/
│  │  │  ├─ logistics/
│  │  │  ├─ gamification/
│  │  │  ├─ community/
│  │  │  └─ admin/
│  │  ├─ integrations/
│  │  ├─ jobs/
│  │  └─ shared/
│  └─ prisma/ (o migrations SQL)
└─ docs/
```

## 3) Principios de diseño

- **Simple por fuera, potente por dentro**: lenguaje no técnico para fiscal/legal.
- **Escalable por módulos**: cada módulo puede escalar de forma independiente.
- **Security first**: JWT, refresh tokens, RBAC y auditoría por eventos.
- **Product-led + Community-led growth**: adquisición por comunidad y gamificación.
