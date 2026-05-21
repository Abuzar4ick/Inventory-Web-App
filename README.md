# 📦 Inventory Web App

A full-stack inventory management web application built for small businesses. Users register their own accounts to manage products, track customer debts, and monitor stock levels — all from a clean, mobile-friendly UI.

> **Note:** The admin dashboard was started but intentionally left unfinished — the project had served its learning purpose and development moved on. The core app (auth, products, debtors, help center, profile) is fully functional and deployment-ready.
>
> PWA support is fully configured (`vite-plugin-pwa`, manifest, icons) but was never deployed due to the lack of a free hosting platform at the time.

---

## ✨ Features

- 🔐 **Auth** — Register/login with JWT stored in `httpOnly` cookies; CSRF and XSS protected
- 📦 **Products** — Full CRUD, search, sort, and stats; `min_quantity` field triggers low-stock warnings on the dashboard
- 💸 **Debtors** — Track customers who owe money; mark debts as `pending` or `paid`
- 📊 **Dashboard** — Stats cards and a low-stock products list with skeleton loading states
- 👤 **Profile** — Update display name, phone number, and change password
- 🆘 **Help Center** — FAQ section, contact info, and in-app bug/feature request submissions
- 🛡️ **Rate Limiting** — Auth routes protected against brute-force with `express-rate-limit`
- ✅ **Validation** — All API inputs validated with Zod schemas derived from Drizzle (`drizzle-zod`)
- 🚀 **Production mode** — Express serves the compiled Vite build as static files from one process

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | ^18.2 | UI library |
| [Vite](https://vitejs.dev) | ^5.1 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | ^4.1 | Utility-first CSS |
| [DaisyUI](https://daisyui.com) | ^5.5 | Component library |
| [React Router DOM](https://reactrouter.com) | ^7.10 | Client-side routing |
| [Zustand](https://zustand-demo.pmnd.rs) | ^5.0 | Global state management |
| [Axios](https://axios-http.com) | ^1.13 | HTTP client |
| [React Hot Toast](https://react-hot-toast.com) | ^2.6 | Toast notifications |
| [React Icons](https://react-icons.github.io/react-icons) | ^5.5 | Icon library |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app) | ^0.21 | PWA manifest + service worker |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org) | 18+ | Runtime |
| [Express](https://expressjs.com) | ^5.2 | Web framework |
| [TypeScript](https://typescriptlang.org) | ^5.9 | Type safety |
| [Drizzle ORM](https://orm.drizzle.team) | ^0.45 | Type-safe SQL query builder |
| [drizzle-zod](https://orm.drizzle.team/docs/zod) | ^0.8 | Schema → Zod validation bridge |
| [drizzle-kit](https://orm.drizzle.team/docs/kit-overview) | ^0.31 | DB push / migrations CLI |
| [Zod](https://zod.dev) | ^4.3 | Request validation |
| [PostgreSQL (`pg`)](https://node-postgres.com) | ^8.17 | Database driver |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ^9.0 | JWT signing & verification |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | ^6.0 | Password hashing |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | ^1.4 | Cookie handling |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | ^8.5 | Rate limiting |
| [cors](https://github.com/expressjs/cors) | ^2.8 | Cross-origin resource sharing |

### Database

| | |
|---|---|
| **Engine** | PostgreSQL |
| **Host** | [Neon](https://neon.tech) (serverless Postgres) |
| **ORM** | Drizzle ORM |

---

## 📁 Project Structure

```
Inventory-Web-App/
├── .gitignore
├── package.json                        # Root: build & start scripts
│
├── backend/
│   ├── drizzle.config.ts               # Drizzle ORM config (schema glob, dialect, DB URL)
│   ├── nodemon.json                    # Nodemon config for dev
│   ├── tsconfig.json
│   ├── package.json
│   ├── types/
│   │   └── globals.d.ts                # Augments Express Request (adds req.user)
│   └── src/
│       ├── index.ts                    # App entry: middleware, routes, static serving
│       ├── config/
│       │   └── env.ts                  # Typed env variable loader
│       ├── db/
│       │   ├── index.ts                # Drizzle client instance
│       │   ├── schema/
│       │   │   ├── enums.ts            # pgEnum: debt status, feedback type
│       │   │   ├── user.schema.ts
│       │   │   ├── product.schema.ts
│       │   │   ├── debt.schema.ts
│       │   │   ├── feedback.schema.ts
│       │   │   └── index.ts            # Re-exports all schemas
│       │   ├── relations/              # Drizzle relation definitions
│       │   ├── types/
│       │   │   └── index.ts            # Inferred TS types from schemas
│       │   └── validation/             # Zod schemas (drizzle-zod + custom refinements)
│       │       ├── user.validation.ts
│       │       ├── product.validation.ts
│       │       ├── debt.validation.ts
│       │       ├── feedback.validation.ts
│       │       └── admin.validation.ts
│       ├── errors/
│       │   ├── AppError.ts             # Base error class
│       │   └── index.ts                # NotFoundError, UnauthorizedError, etc.
│       ├── lib/
│       │   └── utils.ts                # generateToken, generateAdminToken, asyncHandler
│       ├── middlewares/
│       │   ├── authMiddleware.ts       # protectRoute (JWT cookie → req.user)
│       │   ├── errorHandler.ts         # Global Express error handler
│       │   ├── rateLimit.ts            # authLimiter config
│       │   └── validate.ts             # Zod validation middleware factory
│       └── modules/                    # Feature modules (controller / service / repository / routes)
│           ├── auth/
│           ├── products/
│           ├── debts/
│           ├── feedbacks/
│           └── admin/
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── jsconfig.json
    ├── package.json
    ├── public/
    │   ├── icon512_maskable.png        # PWA icon
    │   ├── icon512_rounded.png         # PWA icon
    │   └── robots.txt
    └── src/
        ├── App.jsx                     # Router setup + auth guard
        ├── main.jsx
        ├── index.css
        ├── assets/
        │   └── fonts/
        │       └── Inter_18pt-Regular.ttf
        ├── components/
        │   ├── common/
        │   │   └── PageLoader.jsx
        │   ├── layout/
        │   │   ├── Navbar.jsx
        │   │   └── TitleBar.jsx
        │   └── ui/
        │       └── Modals.jsx
        ├── features/                   # Feature-sliced structure
        │   ├── dashboard/              # Stats cards + low-stock list
        │   ├── products/               # Table, sort bar, CRUD modals
        │   ├── debtors/                # Debt list, add/update/delete, mark as paid
        │   ├── profile/                # Profile info, market info, change password
        │   └── help/                   # FAQ, contact, bug/feature report forms
        ├── layouts/
        │   ├── AuthLayout.jsx          # Wrapper for login/signup pages
        │   └── RootLayout.jsx          # Wrapper for protected pages (with Navbar)
        ├── lib/
        │   ├── axios.js                # Axios instance with base URL
        │   └── errorHandler.js         # Reusable API error handler
        ├── pages/
        │   ├── LoginPage.jsx
        │   └── SignupPage.jsx
        └── store/                      # Zustand stores
            ├── useAuthStore.js
            ├── useProductStore.js
            ├── useDebtStore.js
            └── useFeedbackStore.js
```

---

## 🗄 Database Schema

```
users
  id (uuid, PK) · name · username (unique) · password · phone_number (unique) · timestamps

products
  id (uuid, PK) · name · quantity · min_quantity · userId (FK → users) · timestamps

debts
  id (uuid, PK) · debtor_name · product_name · date · description
  quantity · money_amount · status (pending | paid) · userId (FK → users) · timestamps

feedbacks
  id (uuid, PK) · type (bug_report | feature_request) · message
  isReviewed · userId (FK → users) · createdAt
```

---

## 🌐 API Endpoints

All protected routes require a valid `jwt` cookie (set on login).

### Auth — `/api/auth`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/signup` | — | Register a new user |
| POST | `/login` | — | Login, sets `jwt` cookie |
| POST | `/logout` | — | Clears `jwt` cookie |
| GET | `/check` | ✅ | Verify current session |
| GET | `/profile` | ✅ | Get profile data |
| PUT | `/profile` | ✅ | Update name & phone number |
| POST | `/change-password` | ✅ | Change password |

### Products — `/api/products`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/` | ✅ | Create product |
| GET | `/my` | ✅ | Get all user's products |
| GET | `/stats` | ✅ | Product statistics |
| GET | `/search` | ✅ | Search products |
| GET | `/:id` | ✅ | Get single product |
| PUT | `/:id` | ✅ | Update product |
| DELETE | `/:id` | ✅ | Delete product |

### Debts — `/api/debts`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/` | ✅ | Create debt record |
| GET | `/` | ✅ | Get all debts |
| GET | `/stats` | ✅ | Debt statistics |
| GET | `/:id` | ✅ | Get single debt |
| PUT | `/:id` | ✅ | Update debt |
| DELETE | `/:id` | ✅ | Delete debt |
| PUT | `/:id/status` | ✅ | Mark debt as paid |

### Feedbacks — `/api/feedbacks`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/` | ✅ | Submit bug report or feature request |
| GET | `/` | — | Get all feedbacks |
| GET | `/:id` | — | Get single feedback |
| DELETE | `/:id` | — | Delete feedback |
| PATCH | `/:id/reviewed` | — | Mark feedback as reviewed |

### Admin — `/api/admin`
| Method | Path | Description |
|---|---|---|
| POST | `/register` | Admin login (rate-limited); sets `admin_jwt` cookie |

---

## ⚙️ Environment Variables

Both workspaces need a `.env` file. They are excluded from version control via `.gitignore`.

### Frontend — `frontend/.env`

```dotenv
# Base URL of the backend API
VITE_API_URL=http://localhost:3000

# Contact phone number displayed in the Help Center
VITE_PHONE_NUMBER=+1234567890

# Telegram contact link displayed in the Help Center
VITE_TELEGRAM_URL=https://t.me/your_handle
```

> All variables exposed to the Vite build **must** be prefixed with `VITE_`.

### Backend — `backend/.env`

```dotenv
# Port the Express server listens on
PORT=3000

# Environment: development | production
NODE_ENV=development

# PostgreSQL connection string (get from your Neon project dashboard)
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require&channel_binding=require

# Allowed origin for CORS (your frontend URL)
FRONTEND_URL=http://localhost:5173

# Secret for signing JWT tokens — use a long random string in production
JWT_SECRET=your_random_secret_here

# Token lifetime
JWT_EXPIRES_IN=7d

# Admin credentials for the /api/admin/register endpoint
ADMIN_NAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

> 🔒 Generate a secure `JWT_SECRET` with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ — [download](https://nodejs.org)
- **npm** v8+
- A **PostgreSQL** database — free tier at [neon.tech](https://neon.tech)

### 1. Clone

```bash
git clone https://github.com/Abuzar4ick/Inventory-Web-App.git
cd Inventory-Web-App
```

### 2. Set Up Environment Files

Create `frontend/.env` and `backend/.env` using the templates above.

```bash
touch frontend/.env backend/.env
# Fill in your values in each file
```

### 3. Install & Build

From the project root:

```bash
npm run build
```

This runs three steps automatically:
1. `npm install` in `backend/`
2. `npm install` in `frontend/`
3. `vite build` in `frontend/` → outputs to `frontend/dist/`

### 4. Push the Database Schema

```bash
cd backend
npm run db:push
```

Runs `drizzle-kit push` — introspects your Drizzle schema files and applies them to your PostgreSQL database. Make sure `DATABASE_URL` is set in `backend/.env` first.

### 5. Start

From the project root:

```bash
npm start
```

Runs `node dist/index.js` in the backend. In production mode, Express also serves `frontend/dist/` as static files.

Visit: **`http://localhost:3000`**

---

## 💻 Development Mode

Run the backend and frontend dev servers in separate terminals for hot-reload on both sides.

```bash
# Terminal 1 — Backend (nodemon + ts-node, restarts on file changes)
cd backend
npm run dev
# Listening on http://localhost:3000

# Terminal 2 — Frontend (Vite HMR)
cd frontend
npm run dev
# Listening on http://localhost:5173
```

The frontend uses the `VITE_API_URL` env variable to proxy API calls to the backend.

---

## 🌍 Deployment

Only one process is needed in production — the Express server serves both the API and the compiled frontend.

**Compatible platforms:** Railway · Render · Fly.io · Heroku · Sevalla · any Node.js VPS

```bash
# 1. Set all production env vars on your platform

# 2. Build
npm run build

# 3. Push schema to production DB
cd backend && npm run db:push && cd ..

# 4. Start
npm start
