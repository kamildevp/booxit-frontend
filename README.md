# Booxit Frontend

Frontend app for appointment scheduling and management platform built with NuxtJS.

## 🛠 How to Run Locally (Development Mode)

### ✅ Requirements

- [Docker](https://docs.docker.com/engine/install/) installed on your system
- Running [Booxit Backend](https://github.com/kamildevp/booxit-backend) in dev mode with following env variables in `env.local`:
  ```
  VERIFICATION_HANDLER_MAIN=http://localhost:3000/verify  # configures frontend app as trusted domain (needed for email confirmations)
  ```

### 🔧 Setup Instructions

From the project root directory (where the `docker-compose.yml` file is located):

1. Create a `.env` file by coping `.env.example`.
2. Run `docker compose up -d`.
3. Application will be available at `http://localhost:3000`.

### Google Auth Setup (Optional)
Requires configured google oauth client with `http://localhost:3000/login` as redirect uri.
Fill following env variables using your google oauth client credentials:

Backend `.env.local`:
```
GOOGLE_AUTH_CLIENT_ID=#your google client id
GOOGLE_AUTH_CLIENT_SECRET=#your google client secret
MAIN_GOOGLE_AUTH_HANDLER_REDIRECT_URL=http://localhost:3000/login
```

Frontend `.env`:
```
NUXT_GOOGLE_AUTH_CLIENT_ID=#your google client id
```