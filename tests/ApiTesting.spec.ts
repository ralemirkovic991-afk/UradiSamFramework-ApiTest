import { test, expect } from '@playwright/test';


//provera statusa up. Endpoint /status
test('API status should be UP', async ({ request }) => {
  const response = await request.get(
    'https://simple-tool-rental-api.click/status'
  );

  // Provera status koda
  expect(response.status()).toBe(200);

  const data = await response.json();

  // Provera da postoji status
  expect(data.status).toBeDefined();

  // Provera očekivane vrednosti
  expect(data.status).toBe('UP');
});

//Get all tools. Endpoint /tools
test('Get tools from electric-generators category', async ({ request }) => {
  const response = await request.get(
    'https://simple-tool-rental-api.click/tools?category=electric-generators'
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  // odgovor treba da bude niz
  expect(Array.isArray(data)).toBeTruthy();

  // treba da postoji bar jedan alat
  expect(data.length).toBeGreaterThan(0);

  console.log(data);
});

//Get single tool. Endpoint /tools/:toolId
test('Get single electric generator with user manual', async ({ request }) => {
  const response = await request.get(
    'https://simple-tool-rental-api.click/tools/4875?user-manual=true'
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  console.log(data);

  // osnovne provere iz dokumentacije
  expect(data).toHaveProperty('id', 4875);
  expect(data).toHaveProperty('category', 'electric-generators');
});

//Create new order Endpoint /orders

test('Get a single order', async ({ request }) => {
   const response = await request.post(
    'https://simple-tool-rental-api.click/orders',
    {
      headers: {
        Authorization: '08e5204f1276bbe30a2f5f1fe5c1a7b4e55427c68f79ad95eb6b8fa5a66f4beb' // <-- zalepi svoj token ovde
      },
      data: {
        toolId: 4875, // <-- mora biti NUMBER (po dokumentaciji)
        customerName: 'John Doe'
      }
    }
  );

  console.log('STATUS:', response.status());
  console.log(await response.text());

  expect(response.status()).toBe(201);
});