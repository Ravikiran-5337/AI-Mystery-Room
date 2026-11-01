# AI Mystery Room

A responsive detective game that turns a scenario into a fictional case. The React client talks to an Express API; Gemini creates cases when configured, and MongoDB stores cases when configured. With neither credential configured, the server uses a built-in sample mystery so the complete flow remains playable.

## Requirements

- Node.js 20 or newer and npm
- Optional: a MongoDB connection string and a Google Gemini API key

## Run locally

1. Copy `server/.env.example` to `server/.env` and add credentials if available.
2. From the project root run `npm install`, then `npm run dev`.
3. Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

The API listens on port 5000. Without `GEMINI_API_KEY`, case generation uses the included fictional sample case. Without `MONGODB_URI`, cases are kept in memory until the server restarts.

## Environment

See `server/.env.example`. The Gemini key is only read by the server. Set `CLIENT_URL` to the client origin before deployment. For persistent cases set `MONGODB_URI` to a MongoDB database.

## API

- `GET /api/health`
- `POST /api/mysteries/generate` with `{ "scenario": "..." }`
- `GET /api/mysteries/:caseId`
- `POST /api/mysteries/:caseId/submit` with `{ "suspectId": "..." }`

The public case serializer deliberately omits the answer key. Submission compares the selected ID with the server-stored culprit and reveals the explanation only then.
