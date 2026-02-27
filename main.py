import asyncio
import threading

from bot import run_bot
from web import app


def run_dashboard() -> None:
    app.run(host="0.0.0.0", port=5000, debug=False, use_reloader=False)


async def main() -> None:
    web_thread = threading.Thread(target=run_dashboard, daemon=True)
    web_thread.start()

    print("✅ Dashboard disponible en http://localhost:5000")
    print("✅ Bot Telegram iniciando...")
    await run_bot()


if __name__ == "__main__":
    asyncio.run(main())
