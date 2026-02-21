# Modelos de datos (MVP)

## Entidades principales

### User
- id (uuid)
- role (artist, business, admin, mentor)
- email
- password_hash
- status
- created_at

### Membership
- id
- user_id
- plan (basic, pro, elite)
- price_monthly
- payment_provider
- started_at
- renewal_at

### Profile
- id
- user_id
- type (brand, project, company, artistic)
- name
- story
- services (jsonb)
- products (jsonb)
- social_links (jsonb)
- metrics (jsonb)

### LegalCase
- id
- user_id
- fiscal_regime
- invoice_enabled
- contracts_count
- trademark_status
- compliance_status

### Product
- id
- seller_profile_id
- category (music, merch, service, course, ticket, physical)
- title
- price
- stock
- active

### Order
- id
- buyer_user_id
- subtotal
- platform_commission_pct (30)
- seller_share_pct (70)
- status
- payment_id

### InventoryItem
- id
- product_id
- sku
- quantity
- provider_id
- dropshipping_enabled

### Mission
- id
- code
- title
- points
- type (learn, work, play)
- status

### RewardLedger
- id
- user_id
- points_balance
- last_update

### CommunityPost
- id
- forum_id
- author_user_id
- content
- created_at

### AuditEvent
- id
- actor_user_id
- module
- action
- metadata
- created_at
