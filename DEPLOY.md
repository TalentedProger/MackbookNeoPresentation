# 🚀 MacBook Neo — Руководство по публикации на Vercel

## Содержание
1. [Обзор архитектуры](#обзор-архитектуры)
2. [Требования](#требования)
3. [Быстрый старт](#быстрый-старт)
4. [Полное пошаговое руководство](#полное-пошаговое-руководство)
5. [Настройка пользовательского домена](#настройка-пользовательского-домена)
6. [После публикации: SEO и аналитика](#после-публикации-seo-и-аналитика)
7. [Устранение проблем](#устранение-проблем)
8. [Что изменилось в проекте](#что-изменилось-в-проекте)

---

## Обзор архитектуры

```
Premium-Visual-Design/
├── artifacts/macbook-neo/     ← ЕДИНСТВЕННАЯ ЧАСТЬ, которая деплоится
│   ├── src/                   ← React + TailwindCSS + Framer Motion
│   ├── public/                ← favicon, robots.txt, sitemap.xml, opengraph.jpg
│   ├── vite.config.ts         ← Конфиг сборки (без Replit-плагинов)
│   └── dist/                  ← Результат сборки → деплоится на Vercel
├── vercel.json                ← Конфиг Vercel (статический сайт)
└── .vercelignore              ← Ускорение деплоя (исключает ненужные файлы)
```

Проект является **чисто статическим сайтом** (React SPA). API-сервер (`artifacts/api-server`) и база данных **не используются** в этом деплое.

---

## Требования

- Node.js 18+ (рекомендуется 20 LTS или 22+)
- pnpm 9+ (`npm install -g pnpm`)
- Git
- Аккаунт на [vercel.com](https://vercel.com) (бесплатный план подходит)

---

## Быстрый старт

```bash
# 1. Перейдите в папку проекта
cd "Premium-Visual-Design"

# 2. Обновите зависимости (ОБЯЗАТЕЛЬНО перед деплоем — мы изменили package.json)
pnpm install

# 3. Проверьте, что сборка работает
pnpm --filter "@workspace/macbook-neo" build

# 4. Задеплойте через Vercel CLI
npx vercel --prod
```

---

## Полное пошаговое руководство

### Шаг 1: Подготовка репозитория

**Обязательно** обновите `pnpm-lock.yaml` перед деплоем, так как мы изменили зависимости:

```bash
# В корне проекта
pnpm install
```

Это обновит `pnpm-lock.yaml` с учётом удалённых пакетов Replit.

Зафиксируйте изменения в Git:

```bash
git add -A
git commit -m "feat: remove Replit dependencies, add SEO, optimize for Vercel"
git push origin main
```

---

### Шаг 2: Подключение GitHub к Vercel (рекомендуемый способ)

1. Перейдите на [vercel.com/new](https://vercel.com/new)
2. Нажмите **"Import Git Repository"**
3. Авторизуйтесь через **GitHub** (или GitLab/Bitbucket)
4. Найдите и выберите ваш репозиторий
5. На странице конфигурации:

   | Параметр | Значение |
   |----------|---------|
   | **Framework Preset** | `Other` (или `Vite`) |
   | **Root Directory** | `.` (корень, не меняйте) |
   | **Build Command** | `pnpm --filter "@workspace/macbook-neo" build` |
   | **Output Directory** | `artifacts/macbook-neo/dist` |
   | **Install Command** | `pnpm install` |
   | **Node.js Version** | `20.x` |

6. Нажмите **"Deploy"**

> ⚠️ **Важно**: vercel.json уже содержит правильные настройки. Vercel автоматически их прочитает. Если Vercel предлагает изменить настройки — оставьте значения из таблицы выше.

---

### Шаг 3: Деплой через Vercel CLI (альтернативный способ)

```bash
# Установите Vercel CLI
npm install -g vercel

# Авторизуйтесь
vercel login

# Деплой (первый раз — задаст вопросы о настройках)
vercel

# Производственный деплой
vercel --prod
```

При первом запуске `vercel` его спросит:
- **Set up and deploy?** → `Y`
- **Which scope?** → выберите ваш аккаунт
- **Link to existing project?** → `N` (первый раз)
- **What's project name?** → `macbook-neo` (или любое)
- **In which directory is code located?** → `.` (Enter)
- **Want to override settings?** → `Y`
  - **Build Command** → `pnpm --filter "@workspace/macbook-neo" build`
  - **Output Directory** → `artifacts/macbook-neo/dist`
  - **Development Command** → `pnpm --filter "@workspace/macbook-neo" dev`

---

### Шаг 4: Переменные окружения

Для базового статического деплоя **переменные окружения НЕ НУЖНЫ**.

Опционально можно установить:

| Переменная | Значение | Описание |
|-----------|---------|---------|
| `BASE_PATH` | `/` | URL-путь (оставьте `/` для корневого домена) |

---

### Шаг 5: Обновление SEO URL

После получения URL вашего сайта на Vercel (например, `https://macbook-neo.vercel.app`), необходимо обновить реальный URL в нескольких местах:

**1. `artifacts/macbook-neo/index.html`** — замените `https://macbook-neo.vercel.app`:
```html
<link rel="canonical" href="https://ВАШ-РЕАЛЬНЫЙ-URL/" />
<meta property="og:url" content="https://ВАШ-РЕАЛЬНЫЙ-URL/" />
<meta property="og:image" content="https://ВАШ-РЕАЛЬНЫЙ-URL/opengraph.jpg" />
<!-- и другие абсолютные URL -->
```

**2. `artifacts/macbook-neo/public/robots.txt`**:
```
Sitemap: https://ВАШ-РЕАЛЬНЫЙ-URL/sitemap.xml
Host: https://ВАШ-РЕАЛЬНЫЙ-URL
```

**3. `artifacts/macbook-neo/public/sitemap.xml`**:
```xml
<loc>https://ВАШ-РЕАЛЬНЫЙ-URL/</loc>
```

Затем повторно задеплойте: `git commit -am "fix: update canonical URLs" && git push`

---

### Шаг 6: Проверка деплоя

После успешного деплоя проверьте:

```bash
# Проверьте что robots.txt доступен
curl https://ваш-сайт.vercel.app/robots.txt

# Проверьте sitemap
curl https://ваш-сайт.vercel.app/sitemap.xml

# Проверьте Open Graph (для мессенджеров)
# Вставьте URL в https://opengraph.xyz/
```

---

## Настройка пользовательского домена

### Через дашборд Vercel:
1. Откройте проект в [vercel.com/dashboard](https://vercel.com/dashboard)
2. Перейдите в **Settings → Domains**
3. Нажмите **"Add Domain"**
4. Введите ваш домен (например, `macbook-neo.ru`)
5. Следуйте инструкциям по настройке DNS:

   Для **корневого домена** (example.com):
   ```
   A-запись: 76.76.21.21
   ```

   Для **www-поддомена** (www.example.com):
   ```
   CNAME: cname.vercel-dns.com.
   ```

6. После обновления DNS (до 48 часов) SSL-сертификат будет выдан автоматически

### Обновление URL после смены домена:
Обязательно обновите все URL в `index.html`, `robots.txt` и `sitemap.xml` на новый домен.

---

## После публикации: SEO и аналитика

### Google Search Console
1. Перейдите на [search.google.com/search-console](https://search.google.com/search-console)
2. Добавьте ваш сайт как **"URL-prefix property"**
3. Подтвердите владение (выберите метод DNS или через HTML-файл)
4. После подтверждения отправьте sitemap: `https://ваш-сайт/sitemap.xml`

### Яндекс.Вебмастер (для русской аудитории)
1. Перейдите на [webmaster.yandex.ru](https://webmaster.yandex.ru)
2. Добавьте сайт → выберите метод подтверждения
3. Перейдите в **"Индексирование" → "Файл Sitemap"**
4. Добавьте: `https://ваш-сайт/sitemap.xml`

### Vercel Analytics (опционально, бесплатно)
1. В дашборде Vercel откройте ваш проект
2. Перейдите в **Analytics**
3. Нажмите **"Enable"** → следуйте инструкциям

---

## Устранение проблем

### ❌ `pnpm install` завершается с ошибкой при деплое

**Причина**: `pnpm-lock.yaml` не совпадает с `package.json`.

**Решение**:
```bash
# Локально
pnpm install
git add pnpm-lock.yaml
git commit -m "fix: update pnpm lockfile"
git push
```

---

### ❌ Страница не найдена (404) для всех маршрутов

**Причина**: Правила маршрутизации SPA отсутствуют.

**Решение**: Убедитесь, что в `vercel.json` есть раздел `"routes"`:
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

---

### ❌ Ошибка `ENOENT: no such file or directory` при сборке

**Причина**: Vite не может найти `attached_assets/` — убедитесь, что он НЕ добавлен в `.vercelignore`.

---

### ❌ Изображения не загружаются в production

**Причина**: Неверный `base` в `vite.config.ts`.

**Решение**: Убедитесь, что `base: "/"` (или `BASE_PATH` не установлен).

---

### ❌ Шрифты не загружаются

**Причина**: Заблокированы CSP-заголовками.

**Решение**: Добавьте в `vercel.json` заголовок:
```json
{ "key": "Content-Security-Policy", "value": "font-src 'self' https://fonts.gstatic.com;" }
```

---

### ❌ Видео в CTASection не воспроизводится

**Причина**: Некоторые браузеры блокируют autoplay.

**Проверка**: Видео должно иметь атрибуты `autoPlay muted loop playsInline` — в `CTASection.tsx` они уже присутствуют.

---

## Что изменилось в проекте

### Удалено (Replit)
| Файл | Изменение |
|------|----------|
| `vite.config.ts` | Удалены `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` |
| `macbook-neo/package.json` | Удалены 3 Replit-плагина, `@workspace/api-client-react`, `next-themes` |
| `pnpm-workspace.yaml` | Удалены Replit-пакеты из каталога, очищены платформенные переопределения esbuild |

### Добавлено (SEO)
| Файл | Добавлено |
|------|----------|
| `index.html` | Полный набор meta тегов (EN+RU), Open Graph, Twitter Card, JSON-LD Product + WebSite schema |
| `public/robots.txt` | Директивы для поисковых роботов + ссылка на sitemap |
| `public/sitemap.xml` | XML Sitemap с hreflang EN/RU |
| `App.tsx` | `SeoUpdater` — динамическое обновление `<title>` и meta description при смене языка |

### Оптимизация производительности
| Файл | Изменение |
|------|----------|
| `index.css` | CSS-анимация spin (вместо JS Framer Motion для battery ring), `@keyframes spin`, `prefers-reduced-motion` |
| `BatterySection.tsx` | Бесконечная ротация кольца теперь через CSS `animation` вместо `framer-motion animate`, нет постоянной нагрузки на JS |
| `vite.config.ts` | `manualChunks` (vendor + motion), `target: es2020`, `cssCodeSplit: true` |
| Все компоненты с изображениями | Добавлены `sizes` атрибуты (предотвращение CLS), улучшены alt-тексты, `willChange: "transform, opacity"` |
| `index.html` | Оптимальная загрузка шрифтов через `preload` + `media="print"` трюк (нет FOUT) |

### Подготовка к Vercel
| Файл | Изменение |
|------|----------|
| `vercel.json` | Добавлены заголовки безопасности (X-Content-Type-Options, X-Frame-Options, CSP), кэширование ассетов (1 год), разделены маршруты |
| `.vercelignore` | Создан — исключает Replit-файлы, .git, IDE-папки, `api/` (предотвращает ошибки serverless) |
| `macbook-neo/tsconfig.json` | Удалена ссылка на `../../lib/api-client-react` |
| `favicon.svg` | Заменён на Apple-стилизованный (вместо оранжевого простого квадрата Replit) |

---

## Полезные ссылки

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel CLI Docs](https://vercel.com/docs/cli)
- [Google Search Console](https://search.google.com/search-console)
- [Яндекс.Вебмастер](https://webmaster.yandex.ru)
- [Google PageSpeed Insights](https://pagespeed.web.dev/) — проверьте Core Web Vitals
- [Open Graph Debugger](https://www.opengraph.xyz/)
- [JSON-LD Schema Validator](https://validator.schema.org/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
