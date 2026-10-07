from fastapi import FastAPI

app = FastAPI(title="ELDent API", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Welcome to ELDent API System"}

@app.get("/services")
def get_services():
    return [
        {"id": 1, "name": "Müayinə (Осмотр)", "price": 20},
        {"id": 2, "name": "Diş çəkimi (Удаление зуба)", "price": 50},
        {"id": 3, "name": "Plomb (Пломба)", "price": 40},
        {"id": 4, "name": "İmplant (Имплант)", "price": 350}
    ]