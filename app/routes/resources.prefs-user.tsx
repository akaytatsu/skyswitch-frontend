import type { ActionFunctionArgs } from '@remix-run/node';
import { userPrefs } from '~/cookies.server';

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === 'saveMenuState') {
    if (values.collapseMenu) {
      cookie.collapseMenu = values.collapseMenu === 'true';
    }
  }

  return new Response(null, {
    headers: {
      'Set-Cookie': await userPrefs.serialize(cookie),
      Location: '/',
    },
    status: 201,
  });

  // return redirectBack(request, {
  //   fallback: '/',
  //   headers: {
  //     'Set-Cookie': await userPrefs.serialize(cookie),
  //   },
  // });
}
