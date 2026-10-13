# ELDent — Yerləşdirmə (Docker)

## Tələblər
- Docker və docker-compose (Docker Desktop kifayətdir)
- Boş portlar: 3000, 3001, 8000, 5432

## Başlatma

```bash
cd ELDent/04_Deploy
cp .env.example .env        # istəyə bağlı: parol və açarları dəyişin
docker-compose up --build
```

(Yeni Docker versiyasında: `docker compose up --build`.) İlk build bir neçə dəqiqə çəkir.

## Ünvanlar

| Servis | Ünvan | Qeyd |
|---|---|---|
| İstifadəçi saytı | http://localhost:3000 | Qeydiyyat, həkim/xidmət seçimi, randevu |
| Admin panel | http://localhost:3001 | Giriş: `admin@eldent.az` / `admin123` |
| API (Swagger UI) | http://localhost:8000/docs | İnteraktiv sənəd |
| PostgreSQL | localhost:5432 | İstifadəçi/parol `.env`-dən |

## İlk istifadə
1. http://localhost:3001 — admin kimi daxil olun, **Həkimlər** bölməsində ən azı bir həkim əlavə edin.
2. http://localhost:3000 — xəstə kimi qeydiyyatdan keçin və randevu götürün.
3. Admin paneldə **Randevular** bölməsində statusu dəyişin (təsdiqlə / tamamla / ləğv et).

Xidmətlər (Müayinə, Diş çəkimi, Plomb, İmplant) və admin hesabı ilk başlamada avtomatik yaradılır.

## Arxitektura
- `db` — PostgreSQL 15 (məlumat `pgdata` volume-da saxlanılır)
- `backend` — FastAPI; başlayanda `alembic upgrade head` ilə cədvəllər yaradılır
- `web` və `admin` — React build-i nginx ilə təqdim olunur; `/api/*` sorğuları nginx tərəfindən `backend:8000`-ə yönləndirilir

## Faydalı əmrlər

```bash
docker-compose ps                 # servislərin vəziyyəti
docker-compose logs -f backend    # backend logları
docker-compose down               # dayandır (məlumat qalır)
docker-compose down -v            # dayandır və bazanı sıfırla
```

## Problem olarsa
- `backend` təkrar-təkrar yenidən başlayırsa: `docker-compose logs backend` — adətən DB parol uyğunsuzluğu olur. Parolu dəyişmisinizsə `docker-compose down -v` edin.
- Port məşğuldur xətası: `docker-compose.yml`-də sol tərəfdəki portu dəyişin (məs. `"3100:80"`).
