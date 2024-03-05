import { redirect } from '@remix-run/node';

export default async function clearEmptyParams(url: URL) {
  let shouldRedirect = false;
  const params = url.searchParams;
  for (const [key, value] of params.entries()) {
    if (value === '') {
      url.searchParams.delete(key);
      shouldRedirect = true;
    }
  }

  if (shouldRedirect) {
    throw redirect(url.toString());
  }
}
