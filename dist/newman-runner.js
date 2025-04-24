"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPostmanCollection = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
console.log("✅ Script loaded and executing...");
dotenv_1.default.config();
// Function to update .env with the latest authToken from environment.json
const updateEnvWithToken = () => {
    const envPath = path_1.default.resolve('postman', 'environment.json');
    const dotenvPath = path_1.default.resolve('.env');
    try {
        const envJson = JSON.parse(fs_1.default.readFileSync(envPath, 'utf-8'));
        const tokenEntry = envJson.values.find((v) => v.key === 'authToken');
        if (tokenEntry && tokenEntry.value) {
            const newEnv = `AUTH_TOKEN=${tokenEntry.value}\n`;
            fs_1.default.writeFileSync(dotenvPath, newEnv);
            console.log(`✅ Updated .env with latest authToken`);
        }
        else {
            console.warn(`⚠️ authToken not found in environment file.`);
        }
    }
    catch (err) {
        console.error(`❌ Failed to update .env:`, err);
    }
};
const runPostmanCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const collectionPath = path_1.default.resolve('postman', 'collection.json');
    const environmentPath = path_1.default.resolve('postman', 'environment.json');
    const fallbackToken = process.env.AUTH_TOKEN || '';
    console.log(`Running Postman collection at: ${collectionPath}`);
    console.log(`Initial AUTH_TOKEN from .env: ${fallbackToken}`);
    console.log("🚀 Running Postman collection with Newman...");
    yield new Promise((resolve) => {
        (0, child_process_1.exec)(`npx newman run "${collectionPath}" -e "${environmentPath}" --env-var authToken="${fallbackToken}" --export-environment "${environmentPath}" --reporters cli,htmlextra --reporter-htmlextra-export "reports/api/newman-report.html"`, (error, stdout, stderr) => {
            console.log(`Newman run output:\n${stdout}`);
            if (error) {
                console.warn(`⚠️ Newman completed with errors, but continuing...`);
            }
            updateEnvWithToken();
            resolve(stdout);
            console.log("📁 Expecting report at: reports/api/newman-report.html");
            console.log("📂 Folder exists?", fs_1.default.existsSync(path_1.default.resolve('reports/api')));
            console.log("📄 Report file exists?", fs_1.default.existsSync(path_1.default.resolve('reports/api/newman-report.html')));
        });
    });
});
exports.runPostmanCollection = runPostmanCollection;
// Only run if this file is executed directly
if (require.main === module) {
    (0, exports.runPostmanCollection)();
}
