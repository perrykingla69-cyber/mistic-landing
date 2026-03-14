# Mystic Landing

Landing page estática de Mystic con un área privada de módulos PDF.

## Dirección estratégica (recomendada)

Para no perder el hilo entre marca y producto:

- `sonoradigitalcorp.com` = marca/empresa (repo `sonora-digital-corp`).
- `mystic.sonoradigitalcorp.com` = producto Mystic (este repo).

Guía completa de estrategia y operación en: `docs/ESTRATEGIA_SONORA_MYSTIC.md`.
Templates de Nginx listos en: `infra/nginx/sonora.conf` y `infra/nginx/mystic.conf`.
Runbook operativo VPS en: `docs/VPS_RUNBOOK_SONORA_MYSTIC.md`.

## Estructura

- `index.html`: página pública principal.
- `modulos/index.html`: índice privado de módulos PDF (se protege desde Nginx con usuario/contraseña).
- `modulos/pdfs/`: carpeta para subir tus PDFs.

## Deploy real en VPS + dominio (orden recomendado)

### 1) Preparar el repositorio y branch correcto

Si tu rama local principal es `master`, empuja así:

```bash
git push -u origin master
```

Si en GitHub quieres usar `main`, crea/renombra la rama y empuja:

```bash
git branch -M main
git push -u origin main
```

> El error `src refspec main no concuerda con ninguno` ocurre cuando no existe una rama local llamada `main`.

### 2) Conectar al VPS e instalar Nginx + utilidades

```bash
sudo apt update
sudo apt install -y nginx apache2-utils certbot python3-certbot-nginx
```

### 3) Clonar o actualizar el proyecto en el VPS

```bash
cd /var/www
sudo git clone https://github.com/<tu-usuario>/mistic-landing.git
# o, si ya existe:
cd /var/www/mistic-landing && sudo git pull
```

### 4) Subir tus PDFs privados

Copia tus archivos a:

```bash
/var/www/mistic-landing/modulos/pdfs/
```

### 5) Crear usuario/contraseña para módulos privados

```bash
sudo htpasswd -c /etc/nginx/.mystic_htpasswd mysticadmin
```

### 6) Configurar Nginx para dominio + protección de `/modulos/`

Crea `/etc/nginx/sites-available/mystic`:

```nginx
server {
    listen 80;
    server_name TU_DOMINIO.com www.TU_DOMINIO.com;

    root /var/www/mistic-landing;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location /modulos/ {
        auth_basic "Acceso privado Mystic";
        auth_basic_user_file /etc/nginx/.mystic_htpasswd;
        try_files \$uri \$uri/ =404;
    }
}
```

Activar y validar:

```bash
sudo ln -s /etc/nginx/sites-available/mystic /etc/nginx/sites-enabled/mystic
sudo nginx -t
sudo systemctl reload nginx
```

### 7) Activar HTTPS con Let’s Encrypt

```bash
sudo certbot --nginx -d TU_DOMINIO.com -d www.TU_DOMINIO.com
```

### 8) Dónde verás cada cosa en tu página

- **Landing pública:** `https://TU_DOMINIO.com/`
- **Módulos privados (pedirá user/pass):** `https://TU_DOMINIO.com/modulos/`
- **PDF directo (si conoces la ruta y autenticado):**
  `https://TU_DOMINIO.com/modulos/pdfs/nombre-del-archivo.pdf`

## Comandos para personalizar VPS, dominio real y usuario final

Copia y pega este bloque en tu VPS y cambia solo las variables iniciales:

```bash
# 1) Personaliza estos valores
DOMINIO="tudominio.com"
DOMINIO_WWW="www.tudominio.com"
USUARIO_FINAL="mysticadmin"
REPO_URL="https://github.com/<tu-usuario>/mistic-landing.git"
RUTA_WEB="/var/www/mistic-landing"

# 2) Instalar dependencias
sudo apt update
sudo apt install -y nginx apache2-utils certbot python3-certbot-nginx

# 3) Clonar/actualizar repo
if [ ! -d "$RUTA_WEB/.git" ]; then
  sudo mkdir -p /var/www
  sudo git clone "$REPO_URL" "$RUTA_WEB"
else
  cd "$RUTA_WEB" && sudo git pull
fi

# 4) Crear usuario y contraseña de acceso privado
sudo htpasswd -c /etc/nginx/.mystic_htpasswd "$USUARIO_FINAL"

# 5) Crear config nginx con tu dominio real
sudo tee /etc/nginx/sites-available/mystic >/dev/null <<NGINX
server {
    listen 80;
    server_name ${DOMINIO} ${DOMINIO_WWW};

    root ${RUTA_WEB};
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location /modulos/ {
        auth_basic "Acceso privado Mystic";
        auth_basic_user_file /etc/nginx/.mystic_htpasswd;
        try_files \$uri \$uri/ =404;
    }
}
NGINX

# 6) Activar sitio y recargar nginx
if [ ! -L /etc/nginx/sites-enabled/mystic ]; then
  sudo ln -s /etc/nginx/sites-available/mystic /etc/nginx/sites-enabled/mystic
fi
sudo nginx -t
sudo systemctl reload nginx

# 7) Activar HTTPS
sudo certbot --nginx -d "$DOMINIO" -d "$DOMINIO_WWW"
```

### ¿Dónde lo verás en la página?

- Home público: `https://tudominio.com/`
- Zona privada con login: `https://tudominio.com/modulos/`
- PDFs privados: `https://tudominio.com/modulos/pdfs/archivo.pdf`

## Flujo de actualización

Cada vez que hagas cambios:

```bash
git add .
git commit -m "tu mensaje"
git push
```

En VPS:

```bash
cd /var/www/mistic-landing
sudo git pull
sudo systemctl reload nginx
```


## Recuperación rápida (si borraste `.git` o falló `docker compose`)

Si ejecutaste comandos como `rm -rf .git *` y luego `git clone ... .`, usa esta secuencia en el VPS para recuperarte sin errores:

```bash
# Variables reales
DOMINIO="sonoradigitalcorp.com"
DOMINIO_WWW="www.sonoradigitalcorp.com"
USUARIO_FINAL="mysticadmin"
REPO_URL="https://github.com/perrykingla69-cyber/mistic-landing.git"
RUTA_WEB="/var/www/mistic-landing"

# 1) Elimina carpeta rota y vuelve a clonar limpio
sudo rm -rf "$RUTA_WEB"
sudo git clone "$REPO_URL" "$RUTA_WEB"

# 2) Instala nginx/certbot (este proyecto es estático, NO usa docker compose)
sudo apt update
sudo apt install -y nginx apache2-utils certbot python3-certbot-nginx

# 3) Crea usuario/password para /modulos/
sudo htpasswd -c /etc/nginx/.mystic_htpasswd "$USUARIO_FINAL"

# 4) Config Nginx del dominio
sudo tee /etc/nginx/sites-available/mystic >/dev/null <<NGINX
server {
    listen 80;
    server_name ${DOMINIO} ${DOMINIO_WWW};

    root ${RUTA_WEB};
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location /modulos/ {
        auth_basic "Acceso privado Mystic";
        auth_basic_user_file /etc/nginx/.mystic_htpasswd;
        try_files \$uri \$uri/ =404;
    }
}
NGINX

# 5) Activar sitio y recargar nginx
sudo rm -f /etc/nginx/sites-enabled/default
if [ ! -L /etc/nginx/sites-enabled/mystic ]; then
  sudo ln -s /etc/nginx/sites-available/mystic /etc/nginx/sites-enabled/mystic
fi
sudo nginx -t
sudo systemctl restart nginx

# 6) HTTPS
sudo certbot --nginx -d "$DOMINIO" -d "$DOMINIO_WWW"
```

### Verificación mínima en VPS

```bash
curl -I http://sonoradigitalcorp.com
curl -I https://sonoradigitalcorp.com
curl -I https://sonoradigitalcorp.com/modulos/
```

### Dónde lo verás

- Landing pública: `https://sonoradigitalcorp.com/`
- Login módulos privados: `https://sonoradigitalcorp.com/modulos/`
- PDF privado (ejemplo): `https://sonoradigitalcorp.com/modulos/pdfs/modulo-contabilidad.pdf`

> Nota: El error `no configuration file provided: not found` aparece porque este repo no incluye `docker-compose.yml`.


## Troubleshooting real (errores que ya te pasaron)

### 1) `fatal: not a git repository (or any of the parent directories): .git`

Causa: se borró `.git` en una carpeta de trabajo (`rm -rf .git ...`).

Solución rápida:

```bash
sudo rm -rf /var/www/mistic-landing
sudo git clone https://github.com/perrykingla69-cyber/mistic-landing.git /var/www/mistic-landing
```

### 2) `fatal: destination path '.' already exists and is not an empty directory`

Causa: intentaste `git clone ... .` dentro de un directorio con archivos.

Solución:

- Clonar en una ruta nueva (recomendado: `/var/www/mistic-landing`) o
- Vaciar por completo la ruta destino antes de clonar.

### 3) `no configuration file provided: not found` (al correr docker compose)

Causa: este repositorio es estático (HTML/CSS) y **no** incluye `docker-compose.yml`.

Solución: desplegar con **Nginx + Certbot**, no con Docker Compose.

### 4) `Another instance of Certbot is already running`

Causa: hay un proceso de certbot colgado o una ejecución abierta en otra terminal.

Secuencia de recuperación:

```bash
ps -ef | grep certbot | grep -v grep
sudo pkill -f certbot
sudo rm -f /var/lib/letsencrypt/.lock
sudo rm -f /var/log/letsencrypt/.lock
sudo rm -f /tmp/certbot-log-*/lock 2>/dev/null || true
sudo certbot --nginx -d sonoradigitalcorp.com -d www.sonoradigitalcorp.com --redirect -m TU_CORREO_REAL --agree-tos -n
```

### 5) Se "rompe" la terminal al pegar bloques largos

Causa: se mezclan comandos dentro del bloque `tee <<NGINX`.

Regla práctica:

1. Pega el bloque desde `sudo tee ... <<NGINX` **hasta** la línea `NGINX`.
2. Presiona Enter.
3. Después pega los comandos siguientes (`nginx -t`, `systemctl`, `certbot`) por separado.

### Checklist final de validación

```bash
sudo nginx -t
curl -I https://sonoradigitalcorp.com
curl -I https://www.sonoradigitalcorp.com
curl -I https://sonoradigitalcorp.com/modulos/
```
