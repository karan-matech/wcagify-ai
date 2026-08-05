const rawDevOrigins = [
  '*.run.app',
  '*.asia-east1.run.app',
  '*.asia-east2.run.app',
  '*.us-central1.run.app',
  '*.us-east1.run.app',
  '*.europe-west1.run.app',
  'ais-dev-r2phtvml2ks3fomppkciez-83824199958.asia-east1.run.app',
  'ais-pre-r2phtvml2ks3fomppkciez-83824199958.asia-east1.run.app',
  'localhost',
  '127.0.0.1',
];

const envKeys = [
  'APP_URL',
  'DEVELOPMENT_APP_URL',
  'SHARED_APP_URL',
  'NEXT_PUBLIC_APP_URL',
  'VERCEL_URL',
  'HOST',
  'HOSTNAME',
];

for (const key of envKeys) {
  const val = process.env[key];
  if (val) {
    try {
      const normalized = val.startsWith('http') ? val : `https://${val}`;
      const url = new URL(normalized);
      if (url.hostname) rawDevOrigins.push(url.hostname);
    } catch (e) {
      // Ignore invalid URL
    }
  }
}

const allowedDevOrigins = Array.from(new Set(rawDevOrigins));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  allowedDevOrigins,
};

export default nextConfig;