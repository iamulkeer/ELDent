# ELDent — Layihə Backlog

> Bölmə: **Engineering Manager** · Layihə: stomatoloq randevu sistemi (FastAPI + PostgreSQL + React + Docker) · Yenilənib: 12.10.2026

## Epic cədvəli

| Epic | Ad | Məsul rol | Status | Qeyd |
|---|---|---|---|---|
| E1 | ITBA analizi | ITBA | Done | ITBA_Analysis.pdf: 15 FR, 6 NFR, 12 user story |
| E2 | UX/UI dizayn | UX/UI | Done | style_guide.md, component_specs.md |
| E3 | Backend (API + DB) | Backend | Done | 14 endpoint, Alembic, swagger.yaml; API testləri keçib |
| E4 | Frontend (web + admin) | Frontend | Done | 6 + 4 səhifə; production build uğurlu |
| E5 | Docker deploy | DevOps | In Review | docker-compose.yml, 3 Dockerfile, nginx; tam `docker-compose up` hələ icra olunmayıb |
| E6 | QA və test | QA | In Progress | Test_Scenarios.pdf (87 API testi); UI testləri icra olunmalıdır |
| E7 | Backlog və təhvil | Eng. Manager | In Progress | Bu səhifə; demo və təqdimat hazırlığı |

## Tapşırıqlar cədvəli

| ID | Epic | Tapşırıq | Prioritet | Status |
|---|---|---|---|---|
| T-01 | E1 | Funksional və qeyri-funksional tələblərin yazılması | High | Done |
| T-02 | E1 | User story-lər və Given/When/Then qəbul kriteriyaları | High | Done |
| T-03 | E1 | İzlənilmə matrisi (FR ↔ US ↔ endpoint ↔ səhifə) | Medium | Done |
| T-04 | E2 | Rəng paleti, tipografiya (Inter/Poppins), spacing | High | Done |
| T-05 | E2 | Komponent spesifikasiyaları (Button … DatePicker) | High | Done |
| T-06 | E2 | Səhifə şablonları və əlçatanlıq qaydaları | Medium | Done |
| T-07 | E3 | DB modelləri və Alembic miqrasiyası | High | Done |
| T-08 | E3 | Auth: register/login/JWT, rol yoxlaması | High | Done |
| T-09 | E3 | Həkim və xidmət CRUD | High | Done |
| T-10 | E3 | Randevu qaydaları: konflikt, iş saatları, ləğv | High | Done |
| T-11 | E4 | Web: Ana səhifə, Həkimlər, Xidmətlər | High | Done |
| T-12 | E4 | Web: Rezervasiya formu, Profil, Login/Register | High | Done |
| T-13 | E4 | Admin: Dashboard və Randevular | High | Done |
| T-14 | E4 | Admin: Həkimlər və Xidmətlər CRUD | Medium | Done |
| T-15 | E5 | docker-compose (db, backend, web, admin) və healthcheck | High | Done |
| T-16 | E5 | nginx: SPA yönləndirməsi və /api proxy | High | Done |
| T-17 | E5 | Təmiz maşında `docker-compose up --build` yoxlaması | High | To Do |
| T-18 | E6 | API testləri (funksional, edge, mənfi) | High | Done |
| T-19 | E6 | curl nümunələri | Medium | Done |
| T-20 | E6 | UI testlərinin icrası (13 ssenari) | High | To Do |
| T-21 | E6 | Avtomatik test paketi (pytest) və CI | Low | To Do |
| T-22 | E7 | Backlog səhifəsi və epic statusları | Medium | In Progress |
| T-23 | E7 | Demo ssenarisi və təqdimat slaydları | Medium | To Do |
| T-24 | E7 | Parol/açarların istehsal üçün dəyişdirilməsi | High | To Do |

## Risklər

| # | Risk | Ehtimal | Təsir | Tədbir |
|---|---|---|---|---|
| R1 | Docker-də tam yerləşdirmə təmiz mühitdə yoxlanılmayıb | Orta | Yüksək | T-17: təmiz maşında `docker-compose up --build`, logların yoxlanması |
| R2 | UI testləri icra olunmayıb | Orta | Orta | T-20: 13 əl ilə ssenarinin icrası |
| R3 | Eyni anda iki rezervasiya (race condition) | Aşağı | Yüksək | DB səviyyəsində məhdudiyyət və ya tranzaksiya kilidi |
| R4 | Defolt admin parolu və SECRET_KEY dəyişdirilməyib | Yüksək | Yüksək | `.env`-də dəyişmək (T-24) |
| R5 | Vaxt zonası saxlanılmır (yerli vaxt kimi qəbul olunur) | Aşağı | Orta | UTC saxlama və göstərmədə çevirmə |
| R6 | Bildirişlər (SMS/e-poçt) yoxdur — xəstə randevunu unuda bilər | Orta | Orta | Növbəti mərhələdə xatırlatma modulu |
