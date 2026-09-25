const { execSync } = require('child_process');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
const envLines = envContent.split('\n');
const envVars = { ...process.env };

for (const line of envLines) {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...value] = line.split('=');
    envVars[key.trim()] = value.join('=').trim().replace(/(^"|"$)/g, '');
  }
}

console.log("Running verify...");
try {
  execSync('node prisma/verify.js', { env: envVars, stdio: 'inherit' });
} catch (error) {
  console.error("Failed:", error.message);
  process.exit(1);
}
