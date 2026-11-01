import { randomUUID } from 'node:crypto';
import Mystery from '../models/Mystery.js';

const sample = {
  title: 'The Last Light at Bellwether',
  introduction: 'At 9:20 PM, the original brass lighthouse lens vanished from the locked Bellwether museum gallery during a power outage. Four people were inside the building. The display case was intact, and the storm had flooded the only ground-floor exit.',
  location: 'Bellwether Maritime Museum', incidentTime: '9:20 PM, Friday',
  suspects: [
    { suspectId: 's1', name: 'Mara Voss', role: 'Night curator', background: 'A meticulous historian who has worked at the museum for eight years.', relationship: 'Held the gallery keys and was cataloguing the lens.', motive: 'The museum board planned to sell the collection and end her restoration program.', alibi: 'Says she was in the archive calling the security company.', details: 'The call log shows her call began at 9:24 PM, four minutes after the outage.' },
    { suspectId: 's2', name: 'Eli Rowan', role: 'Facilities technician', background: 'Maintains the building’s old electrical and climate systems.', relationship: 'Had access to the service corridor and breaker room.', motive: 'Owed a large debt and knew the lens had recently been appraised.', alibi: 'Says he was checking the basement generator throughout the outage.', details: 'His work gloves were found dry, despite the flooded route to the generator.' },
    { suspectId: 's3', name: 'Nina Park', role: 'Visiting journalist', background: 'Was preparing a feature on the museum’s threatened collection.', relationship: 'Was photographing exhibits in the east gallery.', motive: 'A sensational theft story would make her career.', alibi: 'Says she stayed beside the east-gallery emergency lamp.', details: 'Her camera contains no photographs taken during the outage.' },
    { suspectId: 's4', name: 'Jonas Reed', role: 'Donor and board member', background: 'A local shipping heir who funded the lens restoration.', relationship: 'Was attending a private preview in the reading room.', motive: 'Wanted the lens returned to his family’s private collection.', alibi: 'Says he never left the reading room.', details: 'A witness saw him leave shortly before the lights failed.' }
  ],
  evidence: [
    { evidenceId: 'e1', title: 'Breaker panel log', type: 'document', timestamp: '9:17 PM', description: 'The main gallery circuit was switched off manually. The panel records the switch, but not the key used.', relatedSuspectIds: ['s2'] },
    { evidenceId: 'e2', title: 'East corridor camera', type: 'cctv', timestamp: '9:18 PM', description: 'Simulated footage: a figure carrying a long, narrow object walks from the gallery toward the archive. Their shoes leave no water marks.', relatedSuspectIds: ['s1'] },
    { evidenceId: 'e3', title: 'Curator’s message', type: 'chat', timestamp: '8:52 PM', description: 'Fictional message from Mara to a colleague: “I moved the old packing felt back to the archive. It should still be dry.”', relatedSuspectIds: ['s1'] },
    { evidenceId: 'e4', title: 'Generator inspection tag', type: 'document', timestamp: '9:31 PM', description: 'Eli signed the generator inspection sheet at 9:31 PM. The service stair camera shows the basement door remained shut until 9:28 PM.', relatedSuspectIds: ['s2'] },
    { evidenceId: 'e5', title: 'Witness statement: gallery guide', type: 'witness', timestamp: '9:15 PM', description: '“Mara asked me to take the visitors to the lobby just before the lights went out. She said the archive alarm had triggered.”', relatedSuspectIds: ['s1'] },
    { evidenceId: 'e6', title: 'Packing felt fibers', type: 'image', timestamp: 'Collected 9:42 PM', description: 'Illustrative evidence: dark blue felt fibers were caught on the gallery case latch. The same distinctive felt lines the archive’s lens-storage drawer.', relatedSuspectIds: ['s1'] },
    { evidenceId: 'e7', title: 'Reading room sign-in', type: 'document', timestamp: '9:00–9:30 PM', description: 'Jonas signed out of the reading room at 9:12 PM and returned at 9:26 PM. His coat was wet from the leaking north window.', relatedSuspectIds: ['s4'] }
  ],
  timeline: [
    { time: '8:52 PM', event: 'Mara mentions moving dry packing felt into the archive.' },
    { time: '9:12 PM', event: 'Jonas leaves the reading room.' },
    { time: '9:15 PM', event: 'Mara clears visitors from the gallery.' },
    { time: '9:17 PM', event: 'The gallery circuit is manually switched off.' },
    { time: '9:18 PM', event: 'A figure carries a narrow object toward the archive.' },
    { time: '9:20 PM', event: 'The lens is reported missing; the case is intact.' },
    { time: '9:24 PM', event: 'Mara’s call to the security company begins.' },
    { time: '9:31 PM', event: 'Eli signs the generator inspection tag.' }
  ],
  culpritId: 's1',
  solutionExplanation: 'Mara staged the outage and used the evacuation to clear the gallery. The dry packing felt was already waiting in the archive, and the corridor figure carried the lens there without crossing the flooded exit. Her claimed security call began only after the lens was gone. The camera and felt fibers independently connect the gallery to her archive access. Eli’s access and Jonas’s suspicious movements are red herrings; their documented timelines do not explain the dry route and prepared storage.',
  solutionEvidenceIds: ['e1', 'e2', 'e3', 'e5', 'e6']
};

const clean = (value) => String(value ?? '').trim();
const unique = (items) => new Set(items).size === items.length;

export function validateCase(data) {
  if (!data || !clean(data.title) || !clean(data.introduction)) throw new Error('The generated case is incomplete.');
  if (!Array.isArray(data.suspects) || data.suspects.length < 3 || data.suspects.length > 4) throw new Error('The case must have three or four suspects.');
  if (!Array.isArray(data.evidence) || data.evidence.length < 5) throw new Error('The case needs at least five evidence items.');
  if (!Array.isArray(data.timeline) || data.timeline.length < 3) throw new Error('The case timeline is incomplete.');
  const suspectIds = data.suspects.map(x => x.suspectId);
  const evidenceIds = data.evidence.map(x => x.evidenceId);
  if (!unique(suspectIds) || !unique(evidenceIds)) throw new Error('The case contains duplicate IDs.');
  if (!suspectIds.includes(data.culpritId)) throw new Error('The solution does not identify a valid suspect.');
  if (!clean(data.solutionExplanation) || !Array.isArray(data.solutionEvidenceIds) || !data.solutionEvidenceIds.length || data.solutionEvidenceIds.some(id => !evidenceIds.includes(id))) throw new Error('The case solution is incomplete.');
  for (const suspect of data.suspects) if (!clean(suspect.name) || !clean(suspect.motive) || !clean(suspect.alibi)) throw new Error('A suspect profile is incomplete.');
  for (const evidence of data.evidence) if (!clean(evidence.title) || !clean(evidence.description)) throw new Error('An evidence item is incomplete.');
  return data;
}

function sampleFor(scenario) {
  return { ...structuredClone(sample), scenario };
}

async function generateWithGemini(scenario) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return sampleFor(scenario);
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const prompt = `Create a fair, entirely fictional detective mystery inspired by this scenario. Treat it as story inspiration, not factual claims. Return JSON only with fields: title, introduction, location, incidentTime, suspects (3-4 objects with suspectId,name,role,background,relationship,motive,alibi,details), evidence (at least 5 objects with evidenceId,title,type,timestamp,description,relatedSuspectIds), timeline (objects with time,event), culpritId, solutionExplanation, solutionEvidenceIds. IDs must be unique. Exactly one culprit; ensure clues support the solution and red herrings remain fair. Use only suspect IDs in culpritId and valid evidence IDs in solutionEvidenceIds. Label simulated media clearly in descriptions. Scenario: ${scenario}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST', signal: controller.signal,
      headers: {
  'Content-Type': 'application/json',
  'x-goog-api-key': apiKey
},
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.75 } })
    });
    const payload = await response.json();
    if (!response.ok) {
     const error = new Error(payload?.error?.message || JSON.stringify(payload));
      error.status = response.status === 429 ? 503 : 502;
      throw error;
    }
    const text = payload.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('');
    if (!text) throw new Error('The mystery service returned an empty case.');
    return JSON.parse(text);
} catch (error) {
  console.error('Gemini failed:', error.message);
  return sampleFor(scenario);
} finally {
  clearTimeout(timer);
}
}

export async function createMystery(scenario) {
  const generated = validateCase(await generateWithGemini(scenario));
  const record = { ...generated, scenario };
  if (process.env.MONGODB_URI && mongooseReady()) {
    const doc = await Mystery.create(record);
    return { id: String(doc._id), data: record };
  }
  const id = `case_${randomUUID()}`;
  memory.set(id, record);
  return { id, data: record };
}

const memory = new Map();
function mongooseReady() { return Boolean(globalThis.__mysteryMongoReady); }
export function setMongoReady(ready) { globalThis.__mysteryMongoReady = ready; }

export async function findMystery(id) {
  if (memory.has(id)) return memory.get(id);
  if (mongooseReady()) {
    const doc = await Mystery.findById(id).select('+culpritId +solutionExplanation +solutionEvidenceIds').lean();
    return doc || null;
  }
  return null;
}

export function publicMystery(id, data) {
  return { caseId: id, title: data.title, introduction: data.introduction, location: data.location, incidentTime: data.incidentTime,
    suspects: data.suspects, evidence: data.evidence, timeline: data.timeline };
}
