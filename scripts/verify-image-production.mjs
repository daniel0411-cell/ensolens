import {chromium} from 'playwright';
import {verifyPageImages} from './image-browser-checks.mjs';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {await verifyPageImages(browser,'https://ensolens.com',{screenshots:true});} finally {await browser.close();}
