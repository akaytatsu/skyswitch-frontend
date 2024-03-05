import { redirect, type ActionFunctionArgs } from '@remix-run/node';
import routes from '~/common/routes';
import { commitSession, getSession } from '~/sessions.server';

export async function action({ request }: ActionFunctionArgs) {
  const headers = new Headers();
  const session = await getSession(request.headers.get('Cookie'));
  session.unset('token');
  headers.append('Set-Cookie', await commitSession(session));
  return redirect(routes.login, {
    headers: headers,
  });
}
