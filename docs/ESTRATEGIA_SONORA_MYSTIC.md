# Estrategia recomendada: Sonora (marca) + Mystic (producto)

## Decisión clave (recomendada)

**No fusionar todo en un solo repositorio por ahora.**

Mantén 2 repos separados:

1. `sonora-digital-corp` = sitio corporativo / marca.
2. `mistic-landing` = landing/producto Mystic (contabilidad + módulos privados).

### ¿Por qué?

- Menos riesgo operativo (si rompes uno, no tumbas todo).
- Despliegues independientes.
- Más claridad de marca: Sonora = empresa, Mystic = producto.
- Más fácil escalar luego a multi-cliente en subdominios.

## Arquitectura web sugerida

- `sonoradigitalcorp.com` y `www.sonoradigitalcorp.com` → web corporativa (repo Sonora).
- `mystic.sonoradigitalcorp.com` → web/producto Mystic (este repo).
- `mystic.sonoradigitalcorp.com/modulos/` → área privada con basic auth.

## DNS (Hostinger)

Crea/valida estos registros A (TTL 300):

- `@` → `187.124.85.191`
- `www` → `187.124.85.191`
- `mystic` → `187.124.85.191`

## Estructura de carpetas en VPS

```bash
/var/www/sonora-digital-corp
/var/www/mistic-landing
```

## SSL

Emitir certificado para los tres hostnames:

```bash
sudo certbot --nginx \
  -d sonoradigitalcorp.com \
  -d www.sonoradigitalcorp.com \
  -d mystic.sonoradigitalcorp.com
```

## Operación diaria

### Sonora

```bash
cd /var/www/sonora-digital-corp
sudo git pull
sudo systemctl reload nginx
```

### Mystic

```bash
cd /var/www/mistic-landing
sudo git pull
sudo systemctl reload nginx
```

## Evolución futura (cuando quieras unificar)

Si en el futuro sí quieres fusionar, mejor hacerlo como **monorepo ordenado**:

```text
/apps/sonora-web
/apps/mystic-web
/apps/mystic-api
/infra/nginx
```

Pero solo conviene cuando ya tengas CI/CD y pipelines claros.
