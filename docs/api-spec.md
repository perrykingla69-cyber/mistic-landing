# API Spec (MVP)

Base URL: `/api/v1`

## Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

## Memberships
- `GET /memberships/plans`
- `POST /memberships/subscribe`
- `PATCH /memberships/change-plan`
- `GET /memberships/me`

## Profiles (Marca/Proyecto/Empresa/Artístico)
- `POST /profiles`
- `GET /profiles/:id`
- `PATCH /profiles/:id`
- `GET /profiles/:id/metrics`
- `POST /profiles/:id/documents`

## Legal/Admin Assistant
- `GET /legal/checklists`
- `POST /legal/onboarding/start`
- `POST /legal/contracts/generate`
- `POST /legal/invoices/create`
- `GET /legal/compliance/status`

## A.C. Integration
- `POST /ac/projects`
- `POST /ac/donations`
- `GET /ac/transparency/:projectId`

## Marketplace
- `POST /marketplace/products`
- `GET /marketplace/products`
- `POST /marketplace/orders`
- `POST /marketplace/orders/:id/pay`
- `GET /marketplace/commissions`

## Logistics
- `POST /logistics/inventory`
- `PATCH /logistics/inventory/:id`
- `POST /logistics/shipments`
- `GET /logistics/shipments/:id/tracking`

## Gamification
- `GET /game/missions`
- `POST /game/missions/:id/complete`
- `GET /game/rankings`
- `GET /game/rewards`

## Community
- `GET /community/forums`
- `POST /community/forums/:id/posts`
- `POST /community/chats/:roomId/messages`
- `POST /community/mentorship/match`

## Admin Console
- `GET /admin/dashboard`
- `GET /admin/reports/revenue`
- `GET /admin/reports/commissions`
- `GET /admin/audit/events`
