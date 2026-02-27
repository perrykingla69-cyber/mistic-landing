# mistic-landing

Implementación base para **Fourgea Pro** con dos componentes en un solo runtime:

- Bot de Telegram (`bot.py`)
- Dashboard Flask (`web.py` en puerto `5000`)

## Ejecución local

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export TELEGRAM_BOT_TOKEN="tu_token"
python main.py
```

## Deploy rápido en Replit
Consulta la guía paso a paso en [`DEPLOY_REPLIT.md`](DEPLOY_REPLIT.md).
