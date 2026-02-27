# Fourgea Pro en Replit (Bot + Dashboard)

## 1) Crear Replit
1. Entra a https://replit.com/
2. Click en **Create Repl**
3. Selecciona template **Python**
4. Sube estos archivos: `main.py`, `bot.py`, `web.py`, `requirements.txt`

## 2) Variables de entorno
En **Secrets** agrega:
- `TELEGRAM_BOT_TOKEN` = token de `@BotFather`

## 3) Ejecutar
En consola de Replit:
```bash
pip install -r requirements.txt
python main.py
```

## 4) Validación rápida
- Telegram: abre `@FougeaProBot` y manda `/start`
- Telegram: manda `/status`
- Web: abre la URL pública de Replit (apunta al puerto `5000`)

## 5) Siguiente paso producción
Cuando Naty valide chat + web, migrar a VPS Hostinger:
- Nginx + systemd
- PostgreSQL/Redis
- dominio + SSL
