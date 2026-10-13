# ELDent — Style Guide

Tibbi, təmiz və etibarlı görünüş: ağ fon, mavi əsas rəng, yaşıl vurğu.

## 1. Rəng paleti

| Token | HEX | İstifadə |
|---|---|---|
| `primary-50` | `#EAF4FB` | Yüngül fon, hover |
| `primary-100` | `#D3E8F6` | Seçilmiş element fonu |
| `primary-500` | `#1B87D0` | Linklər, fokus halqası |
| `primary-600` | `#0B6FB8` | **Əsas düymə, naviqasiya** |
| `primary-700` | `#0A5A96` | Düymə hover |
| `primary-900` | `#0A3D62` | Başlıqlar, tünd mətn |
| `accent-500` | `#1E9E78` | Uğur, təsdiq, vurğu (yaşıl) |
| `accent-600` | `#178566` | Yaşıl düymə hover |
| `accent-50` | `#E6F6F1` | Uğur mesajı fonu |
| `white` | `#FFFFFF` | Kart, giriş sahəsi fonu |
| `bg` | `#F4F8FB` | Səhifə fonu |
| `border` | `#D5DEE6` | Kənarlıqlar |
| `ink` | `#1C2733` | Əsas mətn |
| `muted` | `#5B6B7A` | İkinci dərəcəli mətn |
| `warning` | `#E0A100` | «Gözləyir» statusu |
| `danger` | `#C0392B` | Xəta, ləğv, silmə |

Status rəngləri: `pending` — warning, `confirmed` — primary-600, `completed` — accent-500, `cancelled` — danger.

Kontrast: əsas mətn (`ink`) ağ fonda ≥ 12:1, ağ mətn `primary-600` üzərində ≥ 5:1 (WCAG AA).

## 2. Tipografiya

- **Başlıqlar:** `Poppins` (600/700)
- **Mətn və interfeys:** `Inter` (400/500/600)
- Ehtiyat: `system-ui, -apple-system, "Segoe UI", Arial, sans-serif`
- Azərbaycan hərfləri (ə, ı, ş, ç, ğ, ö, ü, İ) üçün `latin-ext` alt çoxluğu yüklənməlidir.

| Rol | Şrift | Ölçü / sətir hündürlüyü | Çəki |
|---|---|---|---|
| Display (hero) | Poppins | 40 / 48 px (mobil 30 / 38) | 700 |
| H1 | Poppins | 30 / 38 | 600 |
| H2 | Poppins | 22 / 30 | 600 |
| H3 | Poppins | 18 / 26 | 600 |
| Body | Inter | 16 / 24 | 400 |
| Body small | Inter | 14 / 20 | 400 |
| Label / Button | Inter | 14 / 20 | 500–600 |
| Caption | Inter | 12 / 16 | 400 |

## 3. Spacing sistemi (4 px baza)

| Token | px | Tailwind |
|---|---|---|
| `space-1` | 4 | `1` |
| `space-2` | 8 | `2` |
| `space-3` | 12 | `3` |
| `space-4` | 16 | `4` |
| `space-6` | 24 | `6` |
| `space-8` | 32 | `8` |
| `space-12` | 48 | `12` |
| `space-16` | 64 | `16` |

Qaydalar: kart daxili boşluq `space-6`; kartlar arası `space-6`; bölmələr arası `space-12`/`space-16`; forma sahələri arası `space-4`.

## 4. Radius, kölgə, qridlər

- Radius: `sm` 6 px (input, düymə), `md` 12 px (kart), `lg` 16 px (modal), `full` (avatar, badge).
- Kölgə: `card` → `0 1px 3px rgba(10,61,98,.08)`; `modal` → `0 20px 40px rgba(10,61,98,.20)`.
- Konteyner: maks. genişlik 1120 px; yan boşluq 16 px (mobil) / 24 px (masaüstü).
- Qrid: 12 sütun; kart siyahıları — mobil 1, planşet 2, masaüstü 3 sütun.
- Breakpointlər: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

## 5. İkonlar və illüstrasiya

Sadə xətti (outline) ikonlar, 20/24 px, 1.5 px xətt. Emoji yalnız demo məqsədi ilə (🦷, 👨‍⚕️) istifadə olunur.

## 6. Hərəkət (motion)

Keçid müddəti 150–200 ms, `ease-out`. Modal: fade + 8 px yuxarı sürüşmə. Animasiya `prefers-reduced-motion` üçün söndürülür.

## 7. Əlçatanlıq

- Bütün interaktiv elementlərdə görünən fokus halqası (`2px primary-500`, offset 2px).
- Minimum toxunma sahəsi 40×40 px.
- Hər input üçün `label`; xəta mesajları `aria-live="polite"`.
- Rəng yeganə informasiya daşıyıcısı olmamalıdır (status badge-lərdə mətn də var).

## 8. Mətn tonu (UI copy)

Qısa, nəzakətli, «siz» müraciəti. Nümunələr: «Randevu götür», «Randevunuz uğurla yaradıldı», «Bu vaxt artıq tutulub. Başqa vaxt seçin.»
