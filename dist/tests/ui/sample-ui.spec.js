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
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const newman_runner_1 = require("../../newman-runner");
test_1.test.beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, newman_runner_1.runPostmanCollection)();
}));
(0, test_1.test)('Sample UI test after Postman', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    yield page.goto('https://example.com');
    yield (0, test_1.expect)(page).toHaveTitle(/Example/);
}));
