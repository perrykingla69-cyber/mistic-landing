from datetime import datetime

from flask import Flask, render_template_string

app = Flask(__name__)


def spanish_date() -> str:
    """Return a localized date string in Spanish."""
    days = {
        "Monday": "Lunes",
        "Tuesday": "Martes",
        "Wednesday": "Miércoles",
        "Thursday": "Jueves",
        "Friday": "Viernes",
        "Saturday": "Sábado",
        "Sunday": "Domingo",
    }
    months = {
        "January": "enero",
        "February": "febrero",
        "March": "marzo",
        "April": "abril",
        "May": "mayo",
        "June": "junio",
        "July": "julio",
        "August": "agosto",
        "September": "septiembre",
        "October": "octubre",
        "November": "noviembre",
        "December": "diciembre",
    }

    now = datetime.now()
    day_name = days[now.strftime("%A")]
    month_name = months[now.strftime("%B")]
    return f"{day_name}, {now.strftime('%d')} de {month_name} de {now.strftime('%Y')}"


HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fourgea Pro - Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header, .alerts, .card, .semaforo-item {
            background: white; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header { padding: 30px; margin-bottom: 24px; }
        .header h1 { color: #333; font-size: 28px; margin-bottom: 10px; }
        .header p { color: #666; font-size: 14px; }
        .grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 30px;
        }
        .card { padding: 25px; transition: transform .2s ease, box-shadow .2s ease; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 14px 34px rgba(0,0,0,0.15); }
        .card h2 { color: #333; font-size: 18px; margin-bottom: 10px; }
        .card p { color: #666; font-size: 14px; line-height: 1.5; }
        .status { display: inline-block; margin-top: 10px; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .green { background: #d4edda; color: #155724; }
        .yellow { background: #fff3cd; color: #856404; }
        .button {
            display: inline-block; margin-top: 14px; background: #667eea; color: #fff; text-decoration: none;
            padding: 11px 20px; border-radius: 6px; font-weight: bold;
        }
        .button:hover { background: #5a67d8; }
        .alerts { padding: 25px; margin-bottom: 30px; }
        .alerts h2 { color: #333; margin-bottom: 15px; }
        .alert-item {
            padding: 14px; margin-bottom: 10px; border-left: 4px solid #667eea;
            background: #f8f9fa; border-radius: 5px;
        }
        .critical { border-left-color: #dc3545; background: #fff5f5; }
        .warning { border-left-color: #ffc107; background: #fffaf0; }
        .semaforo { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom: 24px; }
        .semaforo-item { text-align: center; padding: 20px; }
        .semaforo-item h3 { font-size: 12px; color: #666; margin-bottom: 5px; }
        .value { font-size: 24px; font-weight: bold; color: #333; }
        .footer { text-align: center; color: white; margin-top: 30px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>👋 Buenos días, Naty</h1>
            <p>{{ current_date }}</p>
        </div>

        <div class="semaforo">
            <div class="semaforo-item"><h3>FISCAL</h3><div class="value">🟢</div><p style="color:#28a745;margin-top:5px;">Cumplimiento OK</p></div>
            <div class="semaforo-item"><h3>LABORAL</h3><div class="value">🟡</div><p style="color:#ffc107;margin-top:5px;">Revisar en 7 días</p></div>
            <div class="semaforo-item"><h3>C. EXTERIOR</h3><div class="value">🟢</div><p style="color:#28a745;margin-top:5px;">Cumplimiento OK</p></div>
        </div>

        <div class="alerts">
            <h2>⚠️ Alertas Recientes</h2>
            <div class="alert-item critical"><strong>🔴 CRÍTICA:</strong> Factura #12345 detectada como CFDI falso (Art. 69-B)</div>
            <div class="alert-item warning"><strong>🟡 IMPORTANTE:</strong> Pago IMSS vence en 3 días (17 de marzo)</div>
            <div class="alert-item"><strong>ℹ️ INFO:</strong> Importación #567 liberada en aduanas ✅</div>
        </div>

        <div class="grid">
            <div class="card"><h2>💰 Módulo Fiscal</h2><p>Gestión de facturas y cumplimiento SAT.</p><span class="status green">✅ ACTIVO</span><br><a href="/fiscal" class="button">Entrar</a></div>
            <div class="card"><h2>👥 Módulo Laboral</h2><p>Nómina, IMSS y cumplimiento LFT.</p><span class="status green">✅ ACTIVO</span><br><a href="/laboral" class="button">Entrar</a></div>
            <div class="card"><h2>📦 Comercio Exterior</h2><p>Pedimentos, VUCEM y operación aduanal.</p><span class="status green">✅ ACTIVO</span><br><a href="/comercio" class="button">Entrar</a></div>
            <div class="card"><h2>📊 Reportes</h2><p>Indicadores y exportación de métricas.</p><span class="status green">✅ ACTIVO</span><br><a href="/reportes" class="button">Entrar</a></div>
            <div class="card"><h2>⚙️ Configuración</h2><p>Integraciones, preferencias y seguridad.</p><span class="status green">✅ ACTIVO</span><br><a href="/configuracion" class="button">Entrar</a></div>
            <div class="card"><h2>💬 Soporte</h2><p>Tickets y contacto con administración.</p><span class="status green">✅ ACTIVO</span><br><a href="/soporte" class="button">Entrar</a></div>
        </div>

        <div class="footer">
            <p>🚀 Fourgea Pro v2.0 | Especializado para Fourgea México SA de CV</p>
            <p>© 2026 Mystic Core</p>
        </div>
    </div>
</body>
</html>
"""


@app.route("/")
def dashboard():
    return render_template_string(HTML_TEMPLATE, current_date=spanish_date())


@app.route("/fiscal")
def fiscal():
    return "<h1>Módulo Fiscal</h1><p>En desarrollo...</p><a href='/'>Volver</a>"


@app.route("/laboral")
def laboral():
    return "<h1>Módulo Laboral</h1><p>En desarrollo...</p><a href='/'>Volver</a>"


@app.route("/comercio")
def comercio():
    return "<h1>Comercio Exterior</h1><p>En desarrollo...</p><a href='/'>Volver</a>"


@app.route("/reportes")
def reportes():
    return "<h1>Reportes</h1><p>En desarrollo...</p><a href='/'>Volver</a>"


@app.route("/configuracion")
def configuracion():
    return "<h1>Configuración</h1><p>En desarrollo...</p><a href='/'>Volver</a>"


@app.route("/soporte")
def soporte():
    return "<h1>Soporte</h1><p>En desarrollo...</p><a href='/'>Volver</a>"


@app.route("/api/status")
def api_status():
    return {
        "status": "online",
        "timestamp": datetime.now().isoformat(),
        "modules": {
            "fiscal": "activo",
            "laboral": "activo",
            "comercio_exterior": "activo",
        },
    }


if __name__ == "__main__":
    print("🚀 Fourgea Pro Dashboard iniciado")
    print("Accede a: http://localhost:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)
