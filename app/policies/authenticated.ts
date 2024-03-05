import { redirect } from '@remix-run/node';
import routes from '~/common/routes';
import type { UserModel } from '~/models/user.model';
import { AuthService } from '~/services/auth.service';

type Props<PolicyResult> = (
  request: Request,
  noLogout?: boolean,
  redirectTo?: string
) => Promise<PolicyResult>;

type ResultProps = {
  user?: UserModel;
};

const authenticated: Props<ResultProps> = async (
  request,
  noLogout = false,
  redirectTo
) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const service = new AuthService();
      const userData = await service.me(request);
      resolve({ user: userData });
    } catch (err: any) {
      if (noLogout) {
        if (redirectTo) reject(redirect(redirectTo));
        else resolve({ user: undefined });
      } else reject(redirect(routes.login));
    }
  });
};

export default authenticated;
