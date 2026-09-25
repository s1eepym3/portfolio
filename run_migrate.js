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

console.log("Running migration...");
try {
  execSync('npx prisma migrate dev --name init', { env: envVars, stdio: 'inherit' });
  console.log("Migration complete. Running seed...");
  execSync('node prisma/seed.js', { env: envVars, stdio: 'inherit' });
  console.log("Seed complete.");
} catch (error) {
  console.error("Failed:", error.message);
  process.exit(1);
}
