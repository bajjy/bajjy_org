// Liveness/readiness probe for Coolify + Docker healthcheck.
export function health(_req, res) {
  res.json({
    status: 'ok',
    service: 'bajjy.org',
    uptime: process.uptime(),
    ts: new Date().toISOString(),
  });
}
