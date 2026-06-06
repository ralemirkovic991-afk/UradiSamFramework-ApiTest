import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Gde se nalaze test fajlovi
  testDir: './tests',

  // Globalni timeout za ceo test (ms)
  // Ako test traje duže od 120 sekundi -> prekida se
  timeout: 120 * 1000,

  // Timeout za expect() asertacije, koliko dugo čeka da se uslov ispuni pre nego što javi fail
  expect: {
    timeout: 10000, // 10 sekundi
  },

// Dozvoljava paralelno izvršavanje testova i unutar istog fajla
// (Playwright već izvršava različite fajlove paralelno po default-u)
// Broj paralelnih izvršavanja kontroliše se preko `workers`
// Npr: npx playwright test --workers=2
  fullyParallel: true,

  // Koliko puta da pokuša ponovo test ako failuje (u CI 2x)
  retries: process.env.CI ? 2 : 0,

  // Broj paralelnih workera za CI CD (ako si na CI CD 2, ako su testovi nestabilni onda 1)
  workers: process.env.CI ? 2 : undefined,

  // Reporter za rezultate (list u terminalu + HTML fajl)
  reporter: [
    ['list'],                      // keeps normal console output
    ['html', { open: 'never' }]    // generates HTML report but doesn't auto-open
  ],

  // Globalne postavke za sve testove
  use: {

    // Screenshot pravi SAMO kad test padne
    screenshot: 'only-on-failure',

    // Video snimak se čuva SAMO kad test padne
    video: 'retain-on-failure',

    // Trace (koristan za debugging) se snima SAMO kad test padne
    trace: 'retain-on-failure',

    // Browser ide u headless modu (true = bez GUI, false = vidiš browser)
    headless: true,

    // Timeout/Maks vreme za svaku akciju (click, fill...) – 0 = nema limita
    // Ako akcija ne uspe u ovom vremenu → fail, ako je npr. click čeka se na sva stanja (klikabilan, stabilan...) ovaj period
    actionTimeout: 20000,
  },

  // Projekti – možeš pokretati testove na različitim Web Browserima
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});