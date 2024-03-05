import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import routes from "~/common/routes";
import authenticated from "~/policies/authenticated";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const { user } = await authenticated(request, true, routes.app);

    if (user) return redirect(routes.app);
  } catch (err) {
    // console.log(err);
  }

  return null;
}

export default function Auth() {
  return <Outlet />;
}
