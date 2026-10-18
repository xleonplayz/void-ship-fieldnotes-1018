import Link from 'next/link';
import './globals.css';
export const metadata = { title: { default: 'Fieldnotes — a day at the gallery', template: '%s · Fieldnotes' }, description: 'Build a little time for looking. A synthetic exhibition guide.' };
export default function RootLayout({ children }) {
  return <html lang="en"><body><header className="masthead"><Link className="brand" href="/">fieldnotes<span>THE GALLERY GUIDE</span></Link><nav aria-label="Main navigation"><Link href="/">Exhibitions</Link><Link href="/about">About your visit</Link></nav><span className="edition">AUTUMN / 2026</span></header>{children}<footer>Fieldnotes · An imaginary gallery, made for exploring.<span>No tickets, payments, or real visitor data.</span></footer></body></html>;
}
