import { planVisit } from '../../../lib/plan';
export const dynamic = 'force-dynamic';
export async function GET(request) { const result = planVisit(new URL(request.url).searchParams.get('ids') || ''); console.info('fieldnotes api plan', result.status); return Response.json(result.body, { status: result.status, headers: { 'Cache-Control': 'no-store' } }); }
