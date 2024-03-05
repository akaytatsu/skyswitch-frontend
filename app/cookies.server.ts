import { createCookie } from '@remix-run/node';

export const userPrefs = createCookie('skyswitch-user-prefs', {
  maxAge: 60 * 60 * 24 * 365, // 1 year
});
