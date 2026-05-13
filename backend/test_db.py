import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("DATABASE_URL")
print(f"Попытка подключения к: {url}")

try:
    conn = psycopg2.connect(url)
    print("✅ Подключение успешно!")
    conn.close()
except Exception as e:
    print(f"❌ Ошибка: {e}")