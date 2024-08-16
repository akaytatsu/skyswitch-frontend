import { createCookieSessionStorage } from "@remix-run/node";

const isProduction = process.env.NODE_ENV === "production";

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
      name: "skyswitch-session",
      httpOnly: false,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET!],
      secure: isProduction,
      maxAge: 60 * 60 * 24 * 365, // 1 ano em segundos
    },
  });

export { commitSession, destroySession, getSession };
