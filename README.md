# Project

This is a static personal site with an optional backend for AI chat.

## Run the backend locally

1. Create a `.env` next to `server.js`:

```
PORT=3000
OPENAI_API_KEY=sk-xxxx
# Optional if using a different OpenAI-compatible endpoint
# OPENAI_BASE_URL=https://api.openai.com/v1
```

2. Install deps and start:

```
npm install
npm run dev
```

3. Point the frontend to the API in `index.html`:

```
<script>
  window.CHAT_API_URL = 'http://localhost:3000/api/chat';
</script>
```

## Deploy backend to a third-party host

- Push the repo to GitHub.
- Create a Node app on your host (Render/Railway/Fly/Heroku):
  - Start command: `node server.js`
  - Env vars: `OPENAI_API_KEY`, optional `OPENAI_BASE_URL`, `PORT` auto-set by host
- Set in `index.html`:

```
<script>
  window.CHAT_API_URL = 'https://your-app.example.com/api/chat';
</script>
```

If `window.CHAT_API_URL` is not set, the UI will fall back to embedding `window.CHAT_URL` (defaults to `https://chat.openai.com/`).