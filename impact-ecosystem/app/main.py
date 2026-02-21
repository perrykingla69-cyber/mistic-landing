from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from .database import Base, engine, SessionLocal
from .models import User, Treasury
from .reward_engine import reward_user
from .token_engine import spend_tokens

app = FastAPI()
templates = Jinja2Templates(directory="app/templates")

Base.metadata.create_all(bind=engine)

# Init treasury if not exists
db = SessionLocal()
if not db.query(Treasury).first():
    db.add(Treasury())
    db.commit()
db.close()

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/register")
def register(username: str = Form(...)):
    db = SessionLocal()
    user = User(username=username)
    db.add(user)
    db.commit()
    db.close()
    return RedirectResponse("/dashboard?user=" + username, status_code=302)

@app.get("/dashboard")
def dashboard(request: Request, user: str):
    db = SessionLocal()
    user_obj = db.query(User).filter(User.username == user).first()
    treasury = db.query(Treasury).first()
    db.close()

    return templates.TemplateResponse("dashboard.html", {
        "request": request,
        "user": user_obj,
        "treasury": treasury
    })

@app.post("/reward")
def reward(user: str = Form(...), activity: str = Form(...)):
    db = SessionLocal()
    user_obj = db.query(User).filter(User.username == user).first()
    reward_user(user_obj, activity)
    db.commit()
    db.close()
    return RedirectResponse("/dashboard?user=" + user, status_code=302)

@app.post("/buy")
def buy(user: str = Form(...), amount: float = Form(...)):
    db = SessionLocal()
    user_obj = db.query(User).filter(User.username == user).first()
    treasury = db.query(Treasury).first()

    user_obj.tokens += amount
    db.commit()
    db.close()
    return RedirectResponse("/dashboard?user=" + user, status_code=302)

@app.post("/spend")
def spend(user: str = Form(...), amount: float = Form(...)):
    db = SessionLocal()
    user_obj = db.query(User).filter(User.username == user).first()
    treasury = db.query(Treasury).first()

    spend_tokens(user_obj, amount, treasury)

    db.commit()
    db.close()
    return RedirectResponse("/dashboard?user=" + user, status_code=302)