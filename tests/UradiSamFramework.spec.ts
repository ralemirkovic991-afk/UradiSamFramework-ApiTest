import { test, expect } from '@playwright/test';

//TEST SCENARIO 1 - UČITAVANJE POČETNE STRANICE
test('TC-001 Provera učitavanja početne stranice', async ({ page }) => {
  await page.goto('https://www.uradi-sam.rs/');
}); 

test('TC-002 Provera prikaza glavnog menija', async ({ page }) => {
 await page.goto('https://www.uradi-sam.rs/'); 
 await expect(page.locator('#small-searchterms')).toBeVisible();
 await expect(page.locator('#usSearchBtn')).toBeVisible();
 await expect(page.locator('img[alt="logo"]') ).toBeVisible();
 await expect(page.locator('#dialog-notifications-error'));
 await expect(page.locator('#topcartbutton')).toBeVisible();
});


//TEST SCENARIO 2 - PRETRAGA PROIZVODA
test('TC-003 - Pretraga postojećeg proizvoda', async ({ page }) => {
  await page.goto('https://uradi-sam.rs/');
  
  const searchInput = page.locator('#small-searchterms');
  await searchInput.click();
  await searchInput.fill('cipelarnik');
  await page.locator('#usSearchBtn').click();
  await expect(page).toHaveURL(/q=cipelarnik/);
  await expect(page.locator('.us-sc-title')).toContainText('Cipelarnik');
});

test('TC-005 - Pretraga nepostojećeg proizvoda', async ({ page }) => {
  await page.goto('https://uradi-sam.rs/');

  const searchInput = page.locator('#small-searchterms');

  await searchInput.click();
  await searchInput.fill('asdf');
  await page.locator('#usSearchBtn').click();
  await expect(page).toHaveURL(/q=asdf/);
  await expect(page.locator('.no-result'))
    .toContainText('Nisu pronađeni proizvodi koji zadovoljavaju Vaše kriterije.');
});

// TEST SCENARIO 3 - REGISTRACIJA I PRIJAVA KORISNIKA
test('TC-005 - Registracija novog korisnika', async ({ page }) => {

  
  await page.goto('https://uradi-sam.rs/');
  
  await page.locator('button.us-acc-btn').click();
  await expect(page).toHaveURL(/login/);
  await page.getByText('ovde').click();
  await expect(page).toHaveURL(/register/);
  await page.locator('#FirstName').fill('Rastko');
  await page.locator('#LastName').fill('Mirkovic');
  await page.locator('#Email').fill('rastkomirkovic530@gmail.com');
  await page.locator('#Password').fill('Rm34567');
  await page.locator('#ConfirmPassword').fill('Rm34567');
  await page.locator('#register-button').click();
  //lokator ispod je uradjen kod registracije koju sam uradio na svoje ime. 
  // Taj tekst se prikazuje nakon sto se uspesno registrujemo
   await expect(page.locator('.result'))
  .toHaveText('Vaša registracija je dovršena');
});

// TEST SCENARIO 3 - REGISTRACIJA I PRIJAVA KORISNIKA
test('TC-006 - Login korisnika', async ({ page }) => {

  await page.goto('https://uradi-sam.rs/');

  
    await page.locator('button.us-acc-btn').click();
    await expect(page).toHaveURL(/login/);
    await page.locator('#Email').fill('rastkomirkovic530@gmail.com');
    await page.locator('#Password').fill('Rm34567');
    await page.locator('button:has-text("Prihvat")').click();
    await page.locator('button.us-btn-reg-submit').click();
    await expect(page).toHaveURL(/customer\/info/);
  });

test('TC-007 - Login sa nevalidnim kredencijalima(i username i password)', async ({ page }) => {

  await page.goto('https://uradi-sam.rs/');
  await page.locator('button.us-acc-btn').click();
  await expect(page).toHaveURL(/login/);
  await page.locator('#Email').fill('pogresanmail@gmail.com');
  await page.locator('#Password').fill('pogresnaSifra');
  await page.locator('button:has-text("Prihvat")').click();
  await page.locator('button.us-btn-reg-submit').click();
  await expect(page.getByText('Nalog kupca nije pronađen')).toBeVisible();
});


//TEST SCENARIO 4 - DODAVANJE PROIZVODA U KORPU
test('TC-009 - Dodavanje proizvoda u korpu i kupovina', async ({ page }) => {

  await page.goto('https://uradi-sam.rs/');

  const searchInput = page.locator('#small-searchterms');
  await searchInput.click();
  await searchInput.fill('cipelarnik');
  await page.locator('#usSearchBtn').click();
  await expect(page).toHaveURL(/q=cipelarnik/);
  await page.locator('button.us-sc-buy-btn').click();
  await page.locator('#topcartbutton').click();
  await expect(page).toHaveURL(/cart/);
  await page.locator('#usCheckoutBtn').click();
});


//TEST SCENARIO 5 - PROCES KUPOVINE I PLAĆANJE

test('TC-010 - Kupovina proizvoda', async ({ page }) => {

  await page.goto('https://uradi-sam.rs/');

  const searchInput = page.locator('#small-searchterms');
  await searchInput.click();
  await searchInput.fill('cipelarnik');
  await page.locator('#usSearchBtn').click();
  await expect(page).toHaveURL(/q=cipelarnik/);
  await page.locator('button.us-sc-buy-btn').click();
  await page.locator('#topcartbutton').click();
  await expect(page).toHaveURL(/cart/);
  await page.locator('#usCheckoutBtn').click();
  await page.locator('#accept_terms').click();
  await page.locator('#billingaddress-next-button').click();

});