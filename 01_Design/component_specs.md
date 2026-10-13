# ELDent — Component Specs

Bütün komponentlər `style_guide.md` tokenlərindən istifadə edir. Props React konvensiyasına uyğundur. Hər komponent hover / focus / disabled hallarını dəstəkləməlidir.

---

## 1. Button

| Prop | Tip | Defolt | Təsvir |
|---|---|---|---|
| `variant` | `primary` \| `secondary` \| `success` \| `danger` \| `ghost` | `primary` | Vizual üslub |
| `size` | `sm` \| `md` \| `lg` | `md` | Hündürlük 32 / 40 / 48 px |
| `loading` | boolean | `false` | Spinner göstərir, klikləri bloklayır |
| `disabled` | boolean | `false` | Opacity 50 %, `cursor-not-allowed` |
| `fullWidth` | boolean | `false` | `w-full` |

Üslublar: `primary` — fon `primary-600`, mətn ağ, hover `primary-700`; `secondary` — ağ fon, `primary-600` kənarlıq və mətn; `success` — `accent-500`; `danger` — `danger`; `ghost` — fonsuz, hover `primary-50`.
Radius `sm`, şrift Inter 14/20 çəki 600, üfüqi padding 16 px.

---

## 2. Input

| Prop | Tip | Təsvir |
|---|---|---|
| `label` | string | Həmişə görünən etiket (inputun üstündə) |
| `type` | `text` \| `email` \| `password` \| `tel` \| `number` | HTML tipi |
| `error` | string | Xəta mətni; olarsa kənarlıq `danger` |
| `hint` | string | Köməkçi mətn (caption, `muted`) |
| `required` | boolean | Etiketə qırmızı `*` əlavə edir |

Hündürlük 40 px, radius `sm`, kənarlıq `border`, fokusda `primary-500` halqa. Xəta mətni inputun altında, 12 px, `danger`. `textarea` və `select` eyni üslubdadır.

---

## 3. Card

Ağ fon, radius `md`, kölgə `card`, padding `space-6`, kənarlıq `border`. Slotlar: `header` (başlıq H3), `body`, `footer` (əməliyyat düymələri, yuxarıdan 1px ayırıcı). `hoverable` olduqda hover-də kölgə artır və 2 px yuxarı qalxır.

---

## 4. Modal

| Prop | Tip | Təsvir |
|---|---|---|
| `open` | boolean | Görünürlük |
| `title` | string | Başlıq (H3) |
| `onClose` | function | Bağlama (X düyməsi, Esc, overlay klik) |
| `footer` | node | Əməliyyat düymələri (sağa düzülmüş) |
| `size` | `sm` \| `md` \| `lg` | Maks. genişlik 400 / 560 / 720 px |

Overlay `rgba(10,61,98,.45)`, radius `lg`, kölgə `modal`. Açılanda fokus modalın içinə keçir, bağlananda əvvəlki elementə qayıdır (focus trap). Mobil ekranda tam enli, aşağıdan açılan «sheet».

---

## 5. DoctorCard

Məqsəd: həkimlər siyahısında və rezervasiyada həkim seçimi.

| Prop | Tip | Təsvir |
|---|---|---|
| `doctor` | `{ id, full_name, specialty, experience_years, bio }` | Məlumat |
| `selected` | boolean | Seçilmiş halda `primary-600` kənarlıq + `primary-50` fon |
| `onSelect` | function | «Randevu götür» və ya kart klikində |

Quruluş: solda 64 px dairəvi avatar (baş hərflər, `primary-100` fon), sağda ad (H3), ixtisas (`primary-600`, 14 px), təcrübə («8 il təcrübə», `muted`), 2 sətirlik bio (`line-clamp-2`), altda düymə «Randevu götür».

---

## 6. ServiceCard

| Prop | Tip | Təsvir |
|---|---|---|
| `service` | `{ id, name, description, price, duration_minutes }` | Məlumat |
| `selected` | boolean | Seçim vəziyyəti |
| `onSelect` | function | Seçim handler-i |

Quruluş: yuxarıda 40 px ikon dairəsi (`accent-50` fon, 🦷), ad (H3), təsvir (14 px, `muted`), altda iki «chip»: müddət («45 dəq») və qiymət («80 ₼», qalın, `primary-900`). Düymə: «Seç».

---

## 7. DatePicker

Tarix və vaxtı birlikdə seçir (randevu başlama vaxtı).

| Prop | Tip | Təsvir |
|---|---|---|
| `value` | string (`YYYY-MM-DDTHH:mm`) | Seçilmiş dəyər |
| `onChange` | function | Dəyər dəyişəndə |
| `min` | string | Minimum tarix (bu gün) |
| `workHours` | `{ from: "09:00", to: "18:00" }` | İş saatları |
| `error` | string | Xəta mətni |

Quruluş: tarix sahəsi (`input type="date"`, `min` = bu gün) və vaxt seçimi (30 dəqiqəlik addımla 09:00–17:30 siyahısı). Seçilə bilməyən vaxtlar `disabled`. Yoxlama: keçmiş vaxt və iş saatından kənar dəyər qəbul edilmir, xəta mətni göstərilir. Mobil cihazda yerli (native) seçici istifadə olunur.

---

## 8. Əlavə komponentlər

- **StatusBadge** — `pending` / `confirmed` / `completed` / `cancelled`; radius `full`, 12 px, mətn + rəng (style_guide §1).
- **Navbar** — ağ fon, sol: loqo «ELDent» (Poppins 700, `primary-600`); mərkəz: Ana səhifə, Həkimlər, Xidmətlər; sağ: Giriş / Profil. Mobildə hamburger menyu.
- **Table (admin)** — başlıq sətri `primary-50`, sətirlər arası `border`, hover `bg`; mobildə üfüqi scroll.
- **Alert** — `success` (`accent-50`), `error` (`#FDECEA`) fonları, sol 4 px rəngli xətt.
- **EmptyState** — ikon + «Heç nə tapılmadı» mətni + əməliyyat düyməsi.

## 9. Səhifə şablonları

| Səhifə | Komponentlər |
|---|---|
| Ana səhifə (Web) | Navbar, hero (başlıq + CTA «Randevu götür»), ServiceCard ×4, DoctorCard ×3 |
| Həkimlər | DoctorCard qridi |
| Xidmətlər | ServiceCard qridi |
| Rezervasiya | Addım 1 DoctorCard seçimi → 2 ServiceCard seçimi → 3 DatePicker → Təsdiq |
| Profil | Input-lar (ad, telefon), «Mənim randevularım» cədvəli + ləğv düyməsi |
| Login/Register | Card içində Input-lar, Button |
| Admin Dashboard | 4 statistik Card, statuslar üzrə bölgü |
| Admin cədvəllər | Table + Button + Modal (əlavə/redaktə) |
