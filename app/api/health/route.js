import { RELEASE, STOP_LIMIT } from '@/lib/policy';
import { exhibits } from '@/lib/catalog';
export const dynamic = 'force-dynamic';
export async function GET() { console.info('fieldnotes health', RELEASE); return Response.json({ ok: true, service: 'fieldnotes', release: RELEASE, stopLimit: STOP_LIMIT, exhibits: exhibits.length }); }
