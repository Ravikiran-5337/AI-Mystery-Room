import express from 'express';
import cors from 'cors';
import { createMystery, findMystery, publicMystery } from './services/caseService.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));

const submissions = new Map();
const sendError = (res, status, code, message) => res.status(status).json({ error: { code, message } });
const generationWindows = new Map();

function limitGeneration(req, res, next) {
  const now = Date.now();
  const key = req.ip;
  const previous = generationWindows.get(key);
  if (!previous || now - previous.startedAt > 60_000) {
    generationWindows.set(key, { startedAt: now, count: 1 });
    return next();
  }
  if (previous.count >= 8) return sendError(res, 429, 'RATE_LIMITED', 'You have opened several cases in a short time. Please wait a minute and try again.');
  previous.count += 1;
  return next();
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/mysteries/generate', limitGeneration, async (req, res) => {
  const scenario = typeof req.body?.scenario === 'string' ? req.body.scenario.trim() : '';
  if (!scenario) return sendError(res, 400, 'INVALID_SCENARIO', 'Tell us a little about the incident before generating a case.');
  if (scenario.length > 1500) return sendError(res, 400, 'SCENARIO_TOO_LONG', 'Keep your scenario under 1,500 characters.');
  try {
    const result = await createMystery(scenario);
    return res.status(201).json(publicMystery(result.id, result.data));
  } catch (error) {
    console.error('Mystery generation failed:', error.message);
    return sendError(res, error.status || 502, 'GENERATION_FAILED', error.status ? error.message : 'We could not prepare a reliable case this time. Please try again.');
  }
});

app.get('/api/mysteries/:caseId', async (req, res) => {
  try {
    const data = await findMystery(req.params.caseId);
    if (!data) return sendError(res, 404, 'CASE_NOT_FOUND', 'That investigation could not be found. Start a new case to continue.');
    return res.json(publicMystery(req.params.caseId, data));
  } catch {
    return sendError(res, 500, 'CASE_LOOKUP_FAILED', 'We could not load this investigation. Please try again.');
  }
});

app.post('/api/mysteries/:caseId/submit', async (req, res) => {
  const selectedId = typeof req.body?.suspectId === 'string' ? req.body.suspectId : '';
  if (!selectedId) return sendError(res, 400, 'SUSPECT_REQUIRED', 'Choose a suspect before submitting your conclusion.');
  try {
    const data = await findMystery(req.params.caseId);
    if (!data) return sendError(res, 404, 'CASE_NOT_FOUND', 'That investigation could not be found. Start a new case to continue.');
    const selected = data.suspects.find(suspect => suspect.suspectId === selectedId);
    if (!selected) return sendError(res, 400, 'INVALID_SUSPECT', 'Choose one of the suspects listed in this case.');
    if (submissions.has(req.params.caseId)) return res.json(submissions.get(req.params.caseId));
    const culprit = data.suspects.find(suspect => suspect.suspectId === data.culpritId);
    const result = { isCorrect: selectedId === data.culpritId, selectedSuspect: { suspectId: selected.suspectId, name: selected.name },
      culprit: { suspectId: culprit.suspectId, name: culprit.name, motive: culprit.motive },
      sequence: data.timeline, explanation: data.solutionExplanation,
      supportingEvidence: data.evidence.filter(item => data.solutionEvidenceIds.includes(item.evidenceId)) };
    submissions.set(req.params.caseId, result);
    return res.json(result);
  } catch {
    return sendError(res, 500, 'SUBMISSION_FAILED', 'We could not submit your conclusion. Please try again.');
  }
});

app.use((_req, res) => sendError(res, 404, 'NOT_FOUND', 'That page could not be found.'));
app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError) return sendError(res, 400, 'INVALID_JSON', 'The request could not be read. Please try again.');
  return sendError(res, 500, 'SERVER_ERROR', 'Something went wrong. Please try again.');
});

export default app;
