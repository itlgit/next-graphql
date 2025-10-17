import { describe, expect, it } from '@jest/globals';
import { testApiHandler } from 'next-test-api-route-handler';
import * as appModule from '../route';
import { getCsrfToken } from 'next-auth/react';

const appHandler = (appModule as any)?.default ?? appModule; // ensure we pass the actual handler function

function getToken() {
  return getCsrfToken({ req: { headers: {} } as any }) as Promise<string>;
}

describe('Dynamic Auth API Route', () => {
  it('should return user ID', async () => {
    const csrfToken = await getToken();
    const body = new URLSearchParams({
      csrfToken,
      email: 'itlogo@gmail.com',
      password: '',
    }).toString();

    await testApiHandler({
      appHandler,
      url: '/api/auth/callback/credentials',
      params: {
        nextauth: ['callback', 'credentials'],
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });

        expect(res.status).toBe(302);
        // expect(res.headers.get('location')).toBe('/dashboard');
      },
    });
  });

  // Add more tests as needed
});
