import { useMemo, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, Bookmark, Check, ChevronDown, ChevronRight, Clock3, Compass, FileText, Fingerprint, Image, Menu, MessageSquareText, Plus, Search, ShieldAlert, Sparkles, Video, X } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const categories = [
  { id: 'all', label: 'All evidence', icon: Fingerprint }, { id: 'chat', label: 'Messages', icon: MessageSquareText },
  { id: 'cctv', label: 'Surveillance', icon: Video }, { id: 'image', label: 'Images', icon: Image },
  { id: 'witness', label: 'Witnesses', icon: AudioLines }, { id: 'document', label: 'Documents', icon: FileText }
];
const typeLabels = { chat: 'Message transcript', cctv: 'Simulated CCTV', image: 'Illustrative image', witness: 'Witness statement', document: 'Case document' };
const formatTime = (value) => value || 'Time not recorded';

function ErrorBanner({ children, onClose }) {
  return <div className="error-banner" role="alert"><ShieldAlert size={17} /><span>{children}</span>{onClose && <button className="icon-button" onClick={onClose} aria-label="Dismiss"><X size={16} /></button>}</div>;
}

function App() {
  const [scenario, setScenario] = useState('');
  const [caseData, setCaseData] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [result, setResult] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showTimeline, setShowTimeline] = useState(true);
  const [openedEvidence, setOpenedEvidence] = useState(null);

  const evidence = useMemo(() => caseData?.evidence?.filter(item => (activeCategory === 'all' || item.type === activeCategory)
    && `${item.title} ${item.description} ${typeLabels[item.type] || ''}`.toLowerCase().includes(query.toLowerCase())) || [], [caseData, activeCategory, query]);

  async function request(path, body) {
    let response;
    try {
      response = await fetch(`${API}${path}`, { method: body ? 'POST' : 'GET', headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
    } catch {
      throw new Error(`Can't reach the API at ${API}. Start the server with "npm run dev" and check that the API is listening on port 5000.`);
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error?.message || 'Something went wrong. Please try again.');
    return data;
  }

  async function generate(event) {
    event?.preventDefault();
    if (!scenario.trim()) { setError('Add a short incident idea to get started.'); return; }
    if (scenario.trim().length > 1500) { setError('Keep your scenario under 1,500 characters.'); return; }
    setLoading(true); setError('');
    try {
      const generated = await request('/api/mysteries/generate', { scenario: scenario.trim() });
      setCaseData(generated); setResult(null); setSelectedId(''); setActiveCategory('all'); setQuery('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  async function submit() {
    if (!selectedId) { setError('Select the person you believe is responsible.'); return; }
    setLoading(true); setError('');
    try { setResult(await request(`/api/mysteries/${caseData.caseId}/submit`, { suspectId: selectedId })); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  function startOver() { setCaseData(null); setResult(null); setScenario(''); setSelectedId(''); setError(''); setActiveCategory('all'); setQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  if (!caseData) return <main className="landing">
    <Header onHome={startOver} />
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT CASE AWAITS</div>
        <h1>Somewhere in<br />the details<span className="period">.</span></h1>
        <p className="hero-description">Build a mystery from a single idea. Follow the trail, question the details, and find out what really happened.</p>
        <div className="hero-meta"><span><span className="live-dot" /> AN INVESTIGATION IN YOUR HANDS</span><span className="meta-divider" /><span>FICTION, BUILT FOR CURIOSITY</span></div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="art-glow" /><div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="artifact-card"><div className="artifact-top"><span>ARCHIVE / 0048</span><span className="artifact-dot" /></div><div className="artifact-silhouette"><div className="artifact-arch"><div className="artifact-core" /></div></div><div className="artifact-bottom"><span>OBJECT OF INTEREST</span><span>01—04</span></div></div>
        <div className="art-note note-one"><span className="note-mark">+</span><span>09:17 PM<br /><b>POWER CUT</b></span></div><div className="art-note note-two"><Fingerprint size={15} /><span>TRACE<br /><b>UNRESOLVED</b></span></div><div className="art-coordinate">41° 24′ 12″ N<br />02° 10′ 26″ E</div>
      </div>
    </section>

    <section className="start-grid" id="start">
      <div className="start-index"><span className="section-number">01</span><div><span className="micro-label">OPEN A NEW FILE</span><p>Every case begins with<br />a question.</p></div></div>
      <form className="scenario-form" onSubmit={generate}>
        <div className="form-heading"><div><span className="micro-label">YOUR CASE IDEA</span><h2>What happened?</h2></div><span className="form-counter">{scenario.length.toString().padStart(2, '0')} <i>/ 1500</i></span></div>
        <label className="sr-only" htmlFor="scenario">Describe a fictional incident</label>
        <textarea id="scenario" maxLength={1500} value={scenario} onChange={event => { setScenario(event.target.value); if (error) setError(''); }} placeholder="A painting disappears from a locked gallery during the opening night. Three people had the key, and one of them is lying about where they were..." />
        {error && <ErrorBanner onClose={() => setError('')}>{error}</ErrorBanner>}
        <div className="form-foot"><span><Sparkles size={14} /> A few details are all it takes.</span><button className="button button-primary" type="submit" disabled={loading}>{loading ? <><span className="spinner" /> Building your case</> : <>Build my case <ArrowRight size={16} /></>}</button></div>
      </form>
    </section>

    <section className="how-section"><div className="section-head"><span className="micro-label">A METHOD TO THE MYSTERY</span><span className="section-caption">THREE STEPS. ONE TRUTH.</span></div><div className="steps"><article className="step"><span className="step-index">01 / OBSERVE</span><div className="step-icon"><Search size={18} /></div><h3>Read between<br />the lines.</h3><p>Every statement, timestamp, and detail has a place in the story.</p></article><article className="step"><span className="step-index">02 / CONNECT</span><div className="step-icon"><Compass size={18} /></div><h3>Follow what<br />doesn’t fit.</h3><p>Compare accounts against evidence. The smallest mismatch can matter.</p></article><article className="step"><span className="step-index">03 / CONCLUDE</span><div className="step-icon"><Fingerprint size={18} /></div><h3>Name your<br />suspect.</h3><p>Make your call, then see how the complete picture comes together.</p></article></div></section>
    <Footer />
  </main>;

  if (result) return <main className="result-page"><Header onHome={startOver} /><div className="result-wrap">
    <div className="result-topline"><button className="back-link" onClick={() => setResult(null)}><ArrowLeft size={15} /> BACK TO CASE</button><span className="case-number">CASE / {caseData.caseId.slice(-6).toUpperCase()}</span></div>
    <section className={`verdict-card ${result.isCorrect ? 'verdict-correct' : ''}`}><div className="verdict-stamp">{result.isCorrect ? <Check size={21} /> : <Fingerprint size={20} />}</div><span className="micro-label">INVESTIGATION CLOSED</span><h1>{result.isCorrect ? 'You found the truth.' : 'The details had another story.'}</h1><p className="verdict-intro">{result.isCorrect ? 'Your read of the evidence was right on the mark.' : `You chose ${result.selectedSuspect.name}. The evidence points somewhere else.`}</p><div className="verdict-rule" /><div className="culprit-reveal"><div className="culprit-avatar">{result.culprit.name.split(' ').map(part => part[0]).join('')}</div><div><span className="micro-label">THE PERSON RESPONSIBLE</span><h2>{result.culprit.name}</h2><p>{result.culprit.motive}</p></div><span className="reveal-seal">CASE<br />SOLVED</span></div></section>
    <section className="explanation-block"><div className="explanation-title"><span className="micro-label">HOW IT FITS TOGETHER</span><h2>The evidence tells<br />a different story.</h2></div><div className="explanation-content"><p>{result.explanation}</p><div className="supporting-list"><span className="micro-label">KEY EVIDENCE</span>{result.supportingEvidence.map((item, i) => <div className="support-row" key={item.evidenceId}><span>0{i + 1}</span><div><b>{item.title}</b><small>{item.description}</small></div><ChevronRight size={15} /></div>)}</div></div></section>
    <section className="result-timeline"><button className="timeline-toggle" onClick={() => setShowTimeline(value => !value)}><span><Clock3 size={17} /> THE NIGHT, IN ORDER</span>{showTimeline ? <ChevronDown size={17} /> : <ChevronRight size={17} />}</button>{showTimeline && <div className="result-events">{result.sequence.map((entry, index) => <div className="result-event" key={`${entry.time}-${index}`}><span>{entry.time}</span><p>{entry.event}</p></div>)}</div>}</section>
    <div className="play-again"><div><span className="micro-label">READY FOR ANOTHER?</span><p>A new story. A fresh set of clues.</p></div><button className="button button-primary" onClick={startOver}>Start a new case <ArrowRight size={16} /></button></div>
  </div><Footer /></main>;

  return <main className="investigation-page"><Header onHome={startOver} inCase />
    <div className="case-banner"><div className="case-banner-inner"><div className="case-breadcrumb"><span>INVESTIGATIONS</span><ChevronRight size={13} /><b>ACTIVE CASE</b></div><div className="case-heading"><div><div className="case-kicker"><span className="live-dot" /> OPEN FILE <span className="case-id">/ {caseData.caseId.slice(-6).toUpperCase()}</span></div><h1>{caseData.title}</h1><p>{caseData.introduction}</p></div><div className="case-mark"><Fingerprint size={27} /><span>FIELD<br />NOTES</span></div></div><div className="case-facts"><span><Compass size={14} /> {caseData.location || 'Location unconfirmed'}</span><span><Clock3 size={14} /> {caseData.incidentTime || 'Time under review'}</span><span><span className="status-dot" /> INVESTIGATION ACTIVE</span></div></div></div>

    <div className="investigation-layout"><aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
      <div className="side-section-title"><span className="micro-label">THE PEOPLE</span><span className="side-count">{String(caseData.suspects.length).padStart(2, '0')}</span></div>
      <div className="suspect-list">{caseData.suspects.map((suspect, index) => <button key={suspect.suspectId} className={`suspect-item ${selectedId === suspect.suspectId ? 'suspect-selected' : ''}`} onClick={() => { setSelectedId(suspect.suspectId); setMobileMenu(false); }}><span className="suspect-index">0{index + 1}</span><span className="suspect-avatar">{suspect.name.split(' ').map(part => part[0]).join('')}</span><span className="suspect-name-wrap"><b>{suspect.name}</b><small>{suspect.role || suspect.relationship}</small></span><ChevronRight size={15} /></button>)}</div>
      <div className="selected-profile">{selectedId ? (() => { const s = caseData.suspects.find(item => item.suspectId === selectedId); return <><span className="micro-label">PERSON OF INTEREST</span><h3>{s.name}</h3><p>{s.background}</p><div className="profile-detail"><span>MOTIVE</span><p>{s.motive}</p></div><div className="profile-detail"><span>STATED ALIBI</span><p>{s.alibi}</p></div><div className="profile-detail profile-note"><span>CASE NOTE</span><p>{s.details || s.relationship}</p></div></>; })() : <div className="empty-profile"><Fingerprint size={24} /><span>Select a name to<br />review their file.</span></div>}</div>
      <div className="sidebar-footer"><span className="sealed-icon"><Bookmark size={14} /></span><p>All persons are fictional.<br />Details are part of the case.</p></div>
    </aside>

    <section className="evidence-area"><div className="evidence-header"><div><span className="micro-label">THE EVIDENCE ROOM</span><h2>What we know<span className="period">.</span></h2></div><div className="evidence-tools"><label className="search-box"><Search size={15} /><span className="sr-only">Search evidence</span><input placeholder="Search files..." value={query} onChange={e => setQuery(e.target.value)} /></label><button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle suspect list"><Menu size={18} /></button></div></div>
      <div className="evidence-tabs" role="tablist" aria-label="Evidence categories">{categories.map(({ id, label, icon: Icon }) => <button role="tab" aria-selected={activeCategory === id} key={id} className={`evidence-tab ${activeCategory === id ? 'tab-active' : ''}`} onClick={() => setActiveCategory(id)}><Icon size={14} /><span>{label}</span>{id === 'all' && <small>{caseData.evidence.length}</small>}</button>)}</div>
      <div className="evidence-grid">{evidence.map((item, index) => <article className="evidence-card" key={item.evidenceId}><div className="evidence-card-top"><span className="evidence-type"><span className="evidence-type-dot" />{typeLabels[item.type] || 'Case evidence'}</span><span className="evidence-ref">REF. {String(index + 1).padStart(2, '0')}</span></div><div className={`evidence-visual visual-${item.type}`}><Visual type={item.type} item={item} /></div><div className="evidence-card-body"><div className="evidence-time"><Clock3 size={12} /> {formatTime(item.timestamp)}</div><h3>{item.title}</h3><p>{item.description}</p>{item.type === 'chat' && <div className="chat-tags"><span>TRANSCRIPT</span><span>FICTIONAL</span></div>}{item.type === 'cctv' && <div className="cctv-data"><span>CAM 02 / ARCHIVE HALL</span><span>SIMULATED</span></div>}</div><button className="card-open" aria-label={`View ${item.title}`} onClick={() => setOpenedEvidence(item)}><ArrowUpRight size={15} /></button></article>)}
      {evidence.length === 0 && <div className="no-evidence"><Search size={22} /><p>No evidence matches that search.</p><button onClick={() => { setQuery(''); setActiveCategory('all'); }}>Clear filters <ArrowRight size={14} /></button></div>}</div>

      <div className="timeline-panel"><button className="timeline-toggle" onClick={() => setShowTimeline(value => !value)}><span><Clock3 size={17} /> CASE TIMELINE <small>{caseData.timeline.length} EVENTS</small></span>{showTimeline ? <ChevronDown size={17} /> : <ChevronRight size={17} />}</button>{showTimeline && <div className="timeline-track">{caseData.timeline.map((event, index) => <div className="timeline-entry" key={`${event.time}-${index}`}><span className="timeline-time">{event.time}</span><span className="timeline-marker" /><p>{event.event}</p></div>)}</div>}</div>

      <div className="conclusion-panel"><div className="conclusion-copy"><span className="micro-label">YOUR CONCLUSION</span><h2>Who had the means<br />and the motive?</h2><p>Study the evidence. When you’re ready, name your suspect.</p></div><div className="conclusion-action"><label htmlFor="suspect-select">SELECT A PERSON OF INTEREST</label><div className="select-wrap"><select id="suspect-select" value={selectedId} onChange={event => setSelectedId(event.target.value)}><option value="">Choose a suspect...</option>{caseData.suspects.map(suspect => <option key={suspect.suspectId} value={suspect.suspectId}>{suspect.name}</option>)}</select><ChevronDown size={16} /></div><button className="button button-primary submit-button" onClick={submit} disabled={loading || !selectedId}>{loading ? <><span className="spinner" /> Checking the evidence</> : <>Submit your conclusion <ArrowRight size={16} /></>}</button><span className="private-note"><ShieldAlert size={12} /> Your answer stays private until submitted.</span></div></div>
      {error && <ErrorBanner onClose={() => setError('')}>{error}</ErrorBanner>}
    </section></div><Footer />{openedEvidence && <div className="modal-backdrop" onClick={() => setOpenedEvidence(null)}><section className="evidence-modal" role="dialog" aria-modal="true" aria-labelledby="evidence-modal-title" onClick={event => event.stopPropagation()}><button className="modal-close" onClick={() => setOpenedEvidence(null)} aria-label="Close evidence"><X size={17} /></button><span className="micro-label">{typeLabels[openedEvidence.type] || 'CASE EVIDENCE'} · FICTIONAL</span><h2 id="evidence-modal-title">{openedEvidence.title}</h2><div className={`modal-visual visual-${openedEvidence.type}`}><Visual type={openedEvidence.type} item={openedEvidence} /></div><div className="evidence-time"><Clock3 size={13} /> {formatTime(openedEvidence.timestamp)}</div><p>{openedEvidence.description}</p><span className="modal-disclaimer"><ShieldAlert size={13} /> This is simulated evidence created for entertainment.</span></section></div>}</main>;
}

function Header({ onHome, inCase }) { return <header className="site-header"><button className="brand" onClick={onHome} aria-label="AI Mystery Room home"><span className="brand-symbol"><span /><span /><span /><span /></span><span className="brand-name">CASEFILE<span>®</span></span></button><div className="header-center"><span className="header-dot" /> {inCase ? 'INVESTIGATION MODE' : 'THE PRIVATE INVESTIGATION CLUB'}</div><button className="header-action" onClick={onHome}>{inCase ? <><ArrowLeft size={14} /> EXIT CASE</> : <>A GAME OF REASON <ArrowUpRight size={14} /></>}</button></header>; }

function Visual({ type, item }) {
  if (type === 'chat') return <div className="chat-visual"><span className="chat-contact">M · ARCHIVE TEAM <small>9:04</small></span><span className="chat-bubble">Did you move the felt?</span><span className="chat-bubble chat-bubble-out">Back where it belongs. <small>✓✓</small></span><span className="chat-bubble">Good. No one should notice.</span><span className="chat-watermark">FICTIONAL TRANSCRIPT</span></div>;
  if (type === 'cctv') return <div className="camera-visual"><div className="scan-lines" /><div className="camera-silhouette"><span /><i /></div><span className="camera-label">CAM—02 <b>● REC</b></span><span className="camera-time">21:18:04</span><span className="camera-caption">SIMULATED FOOTAGE</span></div>;
  if (type === 'image') return <div className="image-visual"><div className="image-orb" /><span className="image-cross cross-a">+</span><span className="image-cross cross-b">+</span><span className="image-caption">ILLUSTRATIVE / DETAIL 01</span></div>;
  if (type === 'witness') return <div className="witness-visual"><span className="quote-mark">“</span><p>{item.description.slice(0, 96)}{item.description.length > 96 ? '…' : ''}</p><span>WITNESS RECORD <b>◦ VERIFIED</b></span></div>;
  return <div className="document-visual"><div className="document-sheet"><span className="doc-seal">B</span><div className="doc-title">BELLWETHER<br />MARITIME MUSEUM</div><div className="doc-line doc-wide" /><div className="doc-line" /><div className="doc-line doc-short" /><div className="doc-stamp">FILED</div></div><span className="doc-caption">SCANNED RECORD / ARCHIVE</span></div>;
}

function Footer() { return <footer className="site-footer"><span>CASEFILE® <i>— A FICTIONAL INVESTIGATION EXPERIENCE</i></span><span>NOTHING HERE IS EVIDENCE OF A REAL EVENT.</span></footer>; }

export default App;
