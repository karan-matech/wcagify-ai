import { spawn } from 'node:child_process';

const rawArgs = process.argv.slice(2);
const filteredArgs = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--host') {
    // skip '--host' and its value (if the next argument doesn't start with '-')
    if (rawArgs[i + 1] && !rawArgs[i + 1].startsWith('-')) {
      i++;
    }
    continue;
  }
  if (arg.startsWith('--host=')) {
    continue;
  }
  filteredArgs.push(arg);
}

// Next.js dev server configurations
// Dynamically bind to process.env.PORT assigned by Cloud Run / AI Studio, falling back to 3000 locally
const targetPort = process.env.PORT || '3000';

if (!filteredArgs.includes('-p') && !filteredArgs.includes('--port')) {
  filteredArgs.push('-p', targetPort);
}
if (!filteredArgs.includes('-H') && !filteredArgs.includes('--hostname')) {
  filteredArgs.push('-H', '0.0.0.0');
}

console.log('[Dev Wrapper] Starting Next.js dev server with args:', filteredArgs);

const child = spawn('npx', ['next', 'dev', ...filteredArgs], {
  stdio: 'inherit',
  shell: true,
});

child.on('close', (code) => {
  process.exit(code ?? 0);
});