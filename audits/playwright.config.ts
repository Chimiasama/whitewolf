import {defineConfig} from '@playwright/test';
import base from '../playwright.config';
export default defineConfig({...base,testDir:'.',outputDir:'../audit-results',webServer:{...(base.webServer as any),cwd:process.cwd()},testMatch:'mobile_visual_audit.spec.ts'});
