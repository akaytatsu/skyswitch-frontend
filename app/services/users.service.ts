import { api } from '~/common/api';
import { TableModel } from '~/models/table.model';
import { UsersModel } from '~/models/users.model';

export class UsersService {
  async list(request: Request): Promise<TableModel<UsersModel>> {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    // Padrões podem ser definidos diretamente no URLSearchParams
    const defaultParams = {
      page: '0',
      page_size: '10',
      order_by: '',
      sort_order: '',
      q: '',
    };

    // Atualiza os parâmetros de pesquisa com os valores fornecidos na URL, mantendo os padrões quando não especificados
    Object.entries(defaultParams).forEach(([key, defaultValue]) => {
      const value = searchParams.get(key) || defaultValue;
      if (value) {
        searchParams.set(key, value);
      }
    });

    // Construir a query de forma limpa
    const query = searchParams.toString();

    const response = await api.get(`user/?${query}`, {
      request,
    });

    return new TableModel<UsersModel>(UsersModel, response);
  }

  async createOrEdit({ body }: { body: any }, request: Request): Promise<void> {
    const payload = new UsersModel(body);

    if (payload.id && payload.id > 0) {
      await api.put(`user/`, {body: payload.toJson(), request});
    } else {
      await api.post('user', {body: payload.toJson(), request});
    }
  }

  async updateUsers(body : any, request: Request): Promise<void> {

    const payload = new UsersModel(body);
    await api.put(`user/${body.id}`, {body: payload, request});
  }
}
