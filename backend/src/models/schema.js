const createTablesSQL = `
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(120) UNIQUE NOT NULL,
  primary_color VARCHAR(20) DEFAULT '#0f172a',
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(30) NOT NULL CHECK (role IN ('Admin', 'Client', 'Technician')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(tenant_id, email)
);

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  full_name VARCHAR(120) NOT NULL,
  phone VARCHAR(25),
  email VARCHAR(180),
  instrument_type VARCHAR(120),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  assigned_technician_id UUID REFERENCES users(id) ON DELETE SET NULL,
  order_type VARCHAR(40) NOT NULL CHECK (order_type IN ('Repair', 'Sale', 'Rental')),
  status VARCHAR(40) NOT NULL CHECK (status IN ('Pending', 'InProgress', 'Completed', 'Delivered', 'Cancelled')),
  amount NUMERIC(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'MXN',
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_bookings (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  event_name VARCHAR(120) NOT NULL,
  event_date DATE NOT NULL,
  location VARCHAR(160),
  status VARCHAR(40) NOT NULL CHECK (status IN ('Requested', 'Confirmed', 'Cancelled', 'Done')),
  fee NUMERIC(12,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  cfdi_version VARCHAR(10) DEFAULT '4.0',
  serie VARCHAR(25),
  folio VARCHAR(25),
  rfc_emisor VARCHAR(13) NOT NULL,
  rfc_receptor VARCHAR(13) NOT NULL,
  razon_social_receptor VARCHAR(200) NOT NULL,
  uso_cfdi VARCHAR(10) NOT NULL,
  regimen_fiscal_receptor VARCHAR(10) NOT NULL,
  codigo_postal_receptor VARCHAR(10) NOT NULL,
  subtotal NUMERIC(12,2) NOT NULL,
  impuestos NUMERIC(12,2) NOT NULL,
  total NUMERIC(12,2) NOT NULL,
  moneda VARCHAR(10) DEFAULT 'MXN',
  metodo_pago VARCHAR(10),
  forma_pago VARCHAR(10),
  estatus VARCHAR(40) DEFAULT 'Draft',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS webhook_events (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  source VARCHAR(80) NOT NULL,
  event_type VARCHAR(120) NOT NULL,
  payload JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
`;

module.exports = { createTablesSQL };
