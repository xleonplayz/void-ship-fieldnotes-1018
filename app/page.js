import Catalog from './catalog';
import { exhibits } from '../lib/catalog';
import { RELEASE, STOP_LIMIT } from '../lib/policy';
export default function Home() {
  return <main><section className="intro"><div><p className="eyebrow">EIGHT EXHIBITIONS. YOUR OWN PACE.</p><h1>A little time<br/>for looking.</h1></div><div className="intro-note"><p>Follow a curiosity, find a quiet corner, and make a day of it.</p><p>Choose up to {STOP_LIMIT} exhibitions to plan your visit.</p></div></section><Catalog exhibits={exhibits} stopLimit={STOP_LIMIT}/><p className="release">Guide release {RELEASE}</p></main>;
}
