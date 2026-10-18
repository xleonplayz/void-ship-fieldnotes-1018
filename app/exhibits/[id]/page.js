import Link from 'next/link';
import { notFound } from 'next/navigation';
import { exhibits } from '@/lib/catalog';
export const dynamicParams = false;
export function generateStaticParams() { return exhibits.map(item => ({ id: item.id })); }
export async function generateMetadata({ params }) { const { id } = await params; return { title: exhibits.find(item => item.id === id)?.title || 'Exhibition not found' }; }
export default async function Exhibit({ params }) {
  const { id } = await params;
  const item = exhibits.find(entry => entry.id === id);
  if (!item) notFound();
  return <main className="detail"><Link className="back" href="/">← All exhibitions</Link><div className="detail-grid"><div className={'art large ' + item.color}><span className="art-shape"/></div><div><p className="eyebrow">{item.category} / FLOOR {item.floor}</p><h1>{item.title}</h1><p className="description">{item.description}</p><p>Allow {item.minutes} minutes.</p><Link className="primary" href={'/visit?ids=' + item.id}>Plan a visit →</Link></div></div></main>;
}
