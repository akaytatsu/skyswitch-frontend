import { api } from '~/common/api';
import { LoginResponseModel, UserModel } from '~/models/user.model';
import { getSession } from '~/sessions.server';

export class AuthService {
  // Me
  async me(request: Request): Promise<UserModel> {
    const session = await getSession(request.headers.get('Cookie'));
    if (!session.has('token')) {
      throw new Error('Usuário não autenticado');
    }

    const response = await api.get('user/me', {
      request,
    });

    const userData = UserModel.validate(response);
    return userData;
  }

  async login(request: Request, email: string, password: string) : Promise<LoginResponseModel> {

    try{
      const response = await api.post('login', {
        body: { email: email, password: password },
      });

      return LoginResponseModel.validate({
        error: undefined,
        token: response.token,
      });
    }catch(e){
      return LoginResponseModel.validate({error: 'bad_user', token: ''});
    }
  }
}
