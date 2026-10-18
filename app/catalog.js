'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Catalog({ exhibits, stopLimit }) {
  const [category, setCategory] = useState('All');
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('fieldnotes-saved') || '[]');
      if (Array.isArray(stored)) setSaved([...new Set(stored)].filter(id => exhibits.some(e => e.id === id)).slice(0, stopLimit));
    } catch { /* Invalid local preferences are reset to an empty selection. */ }
    setReady(true);
  }, [exhibits, stopLimit]);
  useEffect(() => { if (ready) localStorage.setItem('fieldnotes-saved', JSON.stringify(saved)); }, [saved, ready]);
  function toggle(id) { setSaved(previous => previous.includes(id) ? previous.filter(x => x !== id) : previous.length < stopLimit ? [...previous, id] : previous); }
  const visible = exhibits.filter(item => category === 'All' || item.category === category);
  return <section data-ready={ready ? 'true' : 'false'} id="catalog"><div className="toolbar"><div className="filters" aria-label="Exhibition type">{['All', 'Installation', 'Objects', 'Photography'].map(type => <button key={type} aria-pressed={category === type} onClick={() => setCategory(type)}>{type}</button>)}</div><span id="result-count" aria-live="polite">{visible.length} exhibitions</span></div><div className="gallery">{visible.map((item, index) => <article className="card" data-exhibit={item.id} key={item.id}><Link href={'/exhibits/' + item.id} className={'art ' + item.color} aria-label={'Explore ' + item.title}><span className="art-shape"/><span className="art-number">{String(exhibits.indexOf(item) + 1).padStart(2, '0')}</span></Link><div className="card-meta">{item.category}<span>Floor {item.floor}</span></div><h2><Link href={'/exhibits/' + item.id}>{item.title}</Link></h2><div className="card-action"><span>{item.minutes} min of discovery</span><button aria-label={(saved.includes(item.id) ? 'Remove ' : 'Save ') + item.title} aria-pressed={saved.includes(item.id)} disabled={!ready || (!saved.includes(item.id) && saved.length >= stopLimit)} onClick={() => toggle(item.id)}>{saved.includes(item.id) ? 'Saved ✓' : '+ Save'}</button></div></article>)}</div><aside className="visit-bar" aria-label="Your visit"><div><strong>Your afternoon, taking shape.</strong><p id="saved-count" aria-live="polite">{saved.length} of {stopLimit} exhibitions saved</p></div><div className="visit-actions"><button onClick={() => setSaved([])} disabled={!saved.length}>Clear</button>{saved.length ? <Link id="plan-link" href={'/visit?ids=' + saved.join(',')}>Plan my visit →</Link> : <span className="empty-plan">Save an exhibition to begin</span>}</div></aside></section>;
}
