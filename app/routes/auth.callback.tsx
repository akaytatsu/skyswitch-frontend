import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import invariant from "tiny-invariant";
import routes from "~/common/routes";
import { commitSession, getSession } from "~/sessions.server";

export const meta: MetaFunction = () => {
  return [{ title: "Autenticando... | Bootes Studio" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const secretKey = process.env.SESSION_SECRET;
    invariant(secretKey, "SESSION_SECRET must be set");

    const headers = new Headers();
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    invariant(token, "token must be set");

    // TODO: validate token with api
    const session = await getSession(request.headers.get("Cookie"));
    session.set("token", token);
    headers.append("Set-Cookie", await commitSession(session));

    return redirect(routes.app, {
      headers: headers,
    });
  } catch (error) {
    return redirect(routes.login);
  }
};
