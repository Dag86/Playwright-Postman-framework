"use strict";
// This script runs a Postman collection using Newman, the command-line companion for Postman.
// It uses the `exec` function from the `child_process` module to execute the Newman command.
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
const runPostmanCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const collectionPath = path_1.default.resolve(__dirname, 'postman', 'collection.json');
    console.log(`Running Postman collection at: ${collectionPath}`);
    yield new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`npx newman run "${collectionPath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Newman run failed: ${stderr}`);
                reject(error);
            }
            else {
                console.log(`Newman run output:\n${stdout}`);
                resolve(stdout);
            }
        });
    });
});
exports.runPostmanCollection = runPostmanCollection;
