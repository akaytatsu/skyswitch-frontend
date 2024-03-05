import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import routes from "~/common/routes";
import { AuthService } from "~/services/auth.service";
import { commitSession, getSession } from "~/sessions.server";

export const meta: MetaFunction = () => {
  return [{ title: "Autenticando... | Bootes Studio" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  const email = data.get("email") || "";
  const password = data.get("password") || "";

  if (!email || !password) {
    return redirect(routes.login + "?error=bad_user");
  }

  const authService = await new AuthService().login(
    request,
    email.toString(),
    password.toString()
  );

  if (authService.error) {
    return redirect(routes.login + "?error=" + authService.error);
  }

  const token = authService.token;

  const headers = new Headers();
  const session = await getSession(request.headers.get("Cookie"));
  session.set("token", token);
  headers.append("Set-Cookie", await commitSession(session));

  return redirect(routes.app, {
    headers: headers,
  });
}
