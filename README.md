# simple-server-v1

учебный проект — регистрация и авторизация с нуля.

## дизайн

макет в figma — [открыть](https://www.figma.com/design/ONfQ1zufkeQkMJMibo6lCH/Untitled?node-id=0-1&t=sZQyGLZTvtslFvJT-1)

## стек

- **frontend** — react + typescript + vite
- **backend** — node.js + express 5
- **база данных** — postgresql
- **авторизация** — jwt + bcrypt

## запуск

### требования

- node.js 18+
- postgresql

### база данных

создай базу и пользователя в postgresql, затем примени миграцию:

```bash
psql -U myuser -d simple-server-v1 -f server/sql/migrations/0000_init_sql_schema.sql
```

### сервер

```bash
cd server
npm install
```

создай файл `.env`:

```
DATABASE_URL=postgresql://myuser:пароль@localhost:5432/simple-server-v1
JWT_SECRET=любая_длинная_случайная_строка
```

```bash
npm run dev
```

сервер запустится на `http://localhost:3000`

### клиент

```bash
cd client
npm install
npm run dev
```

клиент запустится на `http://localhost:5173`

## api

| метод | путь               | описание    |
| ----- | ------------------ | ----------- |
| POST  | /api/auth/register | регистрация |
| POST  | /api/auth/login    | вход        |

тело запроса:

```json
{
  "email": "user@example.com",
  "password": "пароль"
}
```
