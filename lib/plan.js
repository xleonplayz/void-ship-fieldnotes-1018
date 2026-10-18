import { exhibits } from './catalog';
import { RELEASE, STOP_LIMIT } from './policy';

export function planVisit(raw) {
  if (typeof raw !== 'string' || raw.length > 400) return { status: 400, body: { ok: false, error: 'invalid_selection' } };
  const ids = raw.split(',').filter(Boolean);
  if (!ids.length) return { status: 400, body: { ok: false, error: 'choose_an_exhibit' } };
  if (new Set(ids).size !== ids.length) return { status: 422, body: { ok: false, error: 'duplicate_exhibit' } };
  if (ids.length > STOP_LIMIT) return { status: 422, body: { ok: false, error: 'stop_limit', stopLimit: STOP_LIMIT } };
  const stops = ids.map(id => exhibits.find(item => item.id === id));
  if (stops.some(item => !item)) return { status: 404, body: { ok: false, error: 'unknown_exhibit' } };
  const visitMinutes = stops.reduce((sum, item) => sum + item.minutes, 0);
  const walkingMinutes = 5 * (stops.length - 1);
  return { status: 200, body: { ok: true, release: RELEASE, stopLimit: STOP_LIMIT, stops, visitMinutes, walkingMinutes, totalMinutes: visitMinutes + walkingMinutes } };
}
