# ⬡ CyberGuard Pro

**Professional Ethical Hacking & Cybersecurity Platform**  
*Founded by Karthick R*

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + React Router v6 |
| Backend | Node.js + Express 4 |
| Database | PostgreSQL (AWS RDS) |
| Auth | JWT (access + refresh token rotation) |
| Containerization | Docker + Docker Compose |
| Web Server | Nginx (serves React, proxies API) |

---

## Project Structure

```
cyberguard/
├── backend/
│   ├── config/
│   │   ├── db.js          # PostgreSQL pool (AWS RDS)
│   │   └── migrate.js     # DB migration script
│   ├── middleware/
│   │   └── auth.js        # JWT authentication middleware
│   ├── routes/
│   │   └── auth.js        # Register, login, refresh, logout, /me
│   ├── server.js          # Express app + security middleware
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/    # Navbar
│   │   ├── hooks/         # useAuth (AuthContext + Axios interceptors)
│   │   ├── pages/         # Home, Login, Register, Dashboard
│   │   ├── App.js         # Router + protected routes
│   │   └── index.css      # Design system (CSS variables)
│   ├── nginx.conf         # Nginx SPA + API proxy config
│   └── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## Quick Start

### 1. Prerequisites
- Docker & Docker Compose installed
- AWS RDS PostgreSQL instance running
- Port 80 and 5000 available

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your AWS RDS credentials and JWT secrets
```

Generate strong JWT secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Run twice — one for JWT_SECRET, one for JWT_REFRESH_SECRET
```

### 3. Run Database Migration

Before first run, create the database tables:
```bash
cd backend
npm install
DB_HOST=your-rds-host DB_NAME=cyberguard DB_USER=admin DB_PASSWORD=pass DB_SSL=true node config/migrate.js
```

### 4. Launch with Docker Compose

```bash
docker-compose up --build -d
```

- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:5000
- **Health check**: http://localhost:5000/api/health

### 5. View logs

```bash
docker-compose logs -f backend    # API logs
docker-compose logs -f frontend   # Nginx logs
```

---

## AWS RDS Setup

1. Create a PostgreSQL 15 RDS instance in your VPC
2. Set the security group inbound rule to allow port 5432 from your Docker host IP (or ECS/EC2 security group)
3. Create a database named `cyberguard`
4. Set `DB_SSL=true` (RDS requires SSL by default)
5. Use the **Endpoint** shown in the RDS console as your `DB_HOST`

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Sign in |
| POST | `/api/auth/refresh` | Public | Rotate tokens |
| POST | `/api/auth/logout` | Bearer | Invalidate refresh token |
| GET | `/api/auth/me` | Bearer | Get current user |
| GET | `/api/health` | Public | Service health check |

### Rate Limits
- Auth endpoints: **10 requests / 15 minutes**
- Global: **100 requests / 15 minutes**

---

## Security Features

- ✅ Helmet.js security headers (HSTS, CSP, X-Frame-Options)
- ✅ CORS allowlist
- ✅ JWT access tokens (15min) + refresh token rotation
- ✅ Refresh tokens stored as SHA-256 hashes
- ✅ Bcrypt password hashing (12 rounds)
- ✅ Full audit log (login, logout, failed attempts)
- ✅ Rate limiting on auth endpoints
- ✅ Input validation with express-validator
- ✅ Non-root Docker user
- ✅ AWS RDS SSL enforcement
- ✅ Request body size limits (10kb)

---

## Production Deployment (AWS)

```
Route 53 → CloudFront/ALB → ECS/EC2
  ├── Frontend container (port 80) → Nginx serves React + proxies /api
  └── Backend container (port 5000) → Express API → RDS
```

Recommended:
- Use **AWS Secrets Manager** for DB credentials + JWT secrets
- Enable **RDS automated backups**
- Use **ACM** for SSL/TLS certificate on your ALB
- Store Docker images in **ECR**

---

## Legal Notice

CyberGuard Pro operates under strict legal and ethical guidelines.  
All security engagements require written authorization.  
Unauthorized access is prohibited under 18 U.S.C. § 1030 (CFAA).

---

*© 2025 CyberGuard Pro. Founded by Karthick R. All rights reserved.*
