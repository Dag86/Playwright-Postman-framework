// newman-runner.ts
// This script runs a Postman collection using Newman and syncs authToken from Postman environment to .env

import { exec } from 'child_process';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

const __dirname = path.resolve();
dotenv.config();

// Function to update .env with the latest authToken from environment.json
const updateEnvWithToken = () => {
  const envPath = path.resolve(__dirname, 'postman', 'environment.json');
  const dotenvPath = path.resolve(__dirname, '.env');

  try {
    const envJson = JSON.parse(fs.readFileSync(envPath, 'utf-8'));
    const tokenEntry = envJson.values.find((v: any) => v.key === 'authToken');

    if (tokenEntry && tokenEntry.value) {
      const newEnv = `AUTH_TOKEN=${tokenEntry.value}\n`;
      fs.writeFileSync(dotenvPath, newEnv);
      console.log(`✅ Updated .env with latest authToken`);
    } else {
      console.warn(`⚠️ authToken not found in environment file.`);
    }
  } catch (err) {
    console.error(`❌ Failed to update .env:`, err);
  }
};

export const runPostmanCollection = async (): Promise<void> => {
  const collectionPath = path.resolve(__dirname, 'postman', 'collection.json');
  const environmentPath = path.resolve(__dirname, 'postman', 'environment.json');

  const fallbackToken = process.env.AUTH_TOKEN || '';

  console.log(`Running Postman collection at: ${collectionPath}`);
  console.log(`Initial AUTH_TOKEN from .env: ${fallbackToken}`);

  await new Promise((resolve) => {
    exec(
      `npx newman run "${collectionPath}" -e "${environmentPath}" --env-var authToken="${fallbackToken}" --export-environment "${environmentPath}" --reporters cli,html --reporter-html-export "reports/api/newman-report.html"`,
      (error, stdout, stderr) => {
        console.log(`Newman run output:\n${stdout}`);
        if (error) {
          console.warn(`⚠️ Newman completed with errors, but continuing...`);
        }
        updateEnvWithToken();
        resolve(stdout);
      }
    );
  });
};
