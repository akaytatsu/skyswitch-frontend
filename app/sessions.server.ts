import { createCookieSessionStorage } from '@remix-run/node';

type SessionData = {
  token: string;
};

type SessionFlashData = {
  error: string;
  message: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: 'skyswitch-session',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: [process.env.SESSION_SECRET!],
      secure: true,
      maxAge: 60 * 60 * 24 * 365, // 1 ano em segundos
    },
  });

export { commitSession, destroySession, getSession };
