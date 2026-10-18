import Link from 'next/link';
import { planVisit } from '../../lib/plan';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Your visit' };
export default async function Visit({ searchParams }) {
  const query = await searchParams;
  const result = planVisit(query.ids || '');
  console.info('fieldnotes visit', result.status);
  return <main className="visit-page"><Link className="back" href="/">← Back to exhibitions</Link><p className="eyebrow">YOUR GALLERY AFTERNOON</p><h1>Leave room<br/>for a detour.</h1>{result.body.ok ? <section id="itinerary"><p className="duration"><strong>{result.body.totalMinutes}</strong> minutes to explore</p><ol>{result.body.stops.map(item => <li key={item.id}><Link href={'/exhibits/' + item.id}>{item.title}</Link><span>Floor {item.floor} · {item.minutes} min</span></li>)}</ol><p>{result.body.visitMinutes} minutes in exhibitions + {result.body.walkingMinutes} minutes between stops.</p><p className="release">Guide release {result.body.release}</p></section> : <section id="plan-error" role="status"><h2>Let’s choose your route.</h2><p>{result.body.error}</p><Link href="/">Choose exhibitions →</Link></section>}</main>;
}
