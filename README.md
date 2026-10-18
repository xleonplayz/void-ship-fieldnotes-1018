# Fieldnotes

A synthetic gallery guide built with Next.js 16.4.2 and React 19.3.1. Eight statically generated exhibition pages, shared layouts, metadata, a hydrated filter and browser-local saved list, a dynamic server-rendered itinerary, and JSON route handlers.

Run `npm ci`, `npm run build`, then `npm start -- --hostname 127.0.0.1 --port 3310`.

The itinerary adds five minutes between each selected exhibition. Release 1 permits three stops. It rejects empty selections (400), duplicates (422), too many stops (422), and unknown exhibition IDs (404). `GET /api/plan?ids=light,clay` returns 60 minutes. `GET /api/health` identifies the release. The HTML itinerary renders a useful error page with HTTP 200 for invalid selections; it does not claim the JSON API's error status.

No database, payments, authentication, external images/fonts, or real visitor information. The catalogue is fictional. Selection lives only in browser localStorage. Network exposure is intended only for this single public app. Build and serving behaviour on Dev is assessed separately from ordinary local Node production behaviour.
