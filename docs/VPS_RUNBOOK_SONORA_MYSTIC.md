# VPS Runbook (Sonora + Mystic)

Basado en tu estado actual reportado:

- VPS Ubuntu 24.04 activo
- Nginx activo
- Docker activo
- Puertos abiertos: 22, 80, 443, 8000, 8001, 5679
- Dominio principal: `sonoradigitalcorp.com`
- IP pública: `187.124.85.191`

## Estrategia final recomendada (sin perder el hilo)

- `sonoradigitalcorp.com` y `www.sonoradigitalcorp.com` → sitio corporativo (repo `sonora-digital-corp`).
- `mystic.sonoradigitalcorp.com` → producto Mystic (repo `mistic-landing`).
- `/modulos/` protegido con usuario/contraseña en Mystic.

## Paso 1: Verificar que ambos repos estén en VPS

```bash
sudo mkdir -p /var/www
[ -d /var/www/sonora-digital-corp/.git ] || sudo git clone https://github.com/perrykingla69-cyber/sonora-digital-corp.git /var/www/sonora-digital-corp
[ -d /var/www/mistic-landing/.git ] || sudo git clone https://github.com/perrykingla69-cyber/mistic-landing.git /var/www/mistic-landing
```

## Paso 2: Configurar Nginx de forma limpia (2 sitios)

```bash
sudo cp /var/www/mistic-landing/infra/nginx/sonora.conf /etc/nginx/sites-available/sonora
sudo cp /var/www/mistic-landing/infra/nginx/mystic.conf /etc/nginx/sites-available/mystic

sudo ln -sf /etc/nginx/sites-available/sonora /etc/nginx/sites-enabled/sonora
sudo ln -sf /etc/nginx/sites-available/mystic /etc/nginx/sites-enabled/mystic
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t
sudo systemctl reload nginx
```

## Paso 3: Crear credenciales para `/modulos/`

```bash
sudo htpasswd -c /etc/nginx/.mystic_htpasswd mysticadmin
```

## Paso 4: Emitir SSL de una vez para los 3 hostnames

```bash
sudo pkill -f certbot || true
sudo rm -f /var/lib/letsencrypt/.lock /var/log/letsencrypt/.lock
sudo certbot --nginx \
  -d sonoradigitalcorp.com \
  -d www.sonoradigitalcorp.com \
  -d mystic.sonoradigitalcorp.com
```

## Paso 5: Validación rápida

```bash
curl -sI https://sonoradigitalcorp.com | head
curl -sI https://www.sonoradigitalcorp.com | head
curl -sI https://mystic.sonoradigitalcorp.com | head
curl -sI https://mystic.sonoradigitalcorp.com/modulos/ | head
```

## Paso 6: Deploy diario

```bash
# Sonora
cd /var/www/sonora-digital-corp && sudo git pull

# Mystic
cd /var/www/mistic-landing && sudo git pull

sudo systemctl reload nginx
```

## Paso 7 (muy recomendado): activar backups

Tu VPS está sin backups diarios. Activa snapshots/backups automáticos en Hostinger antes de cambios grandes.

## Cuándo usar Docker en tu caso

- Este repo `mistic-landing` es estático: **no requiere docker compose**.
- Usa Docker solo para APIs/servicios backend (puertos 8000/8001/etc.) y publícalos detrás de Nginx con `proxy_pass`.
