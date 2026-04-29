// Centralized config. All env access goes through here.

const num = (val, fallback) => {
  const n = Number(val);
  return Number.isFinite(n) ? n : fallback;
};

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: num(process.env.PORT, 3000),
  siteOrigin: process.env.SITE_ORIGIN || 'https://bajjy.org',
  github: {
    username: process.env.GITHUB_USERNAME || 'bajjy',
    token: process.env.GITHUB_TOKEN || '',
    cacheTtlSeconds: num(process.env.GITHUB_CACHE_TTL_SECONDS, 900),
  },
};

export default config;
