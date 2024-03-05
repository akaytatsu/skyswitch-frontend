import { api } from '~/common/api';
import { CloudaccountModel } from '~/models/cloudaccount.model';
import { TableModel } from '~/models/table.model';

export class CloudaccountService {
  async list(request: Request): Promise<TableModel<CloudaccountModel>> {
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

    const response = await api.get(`cloudaccount/?${query}`, {
      request,
    });

    return new TableModel<CloudaccountModel>(CloudaccountModel, response);
  }

  async createOrEdit({ body }: { body: any }, request: Request): Promise<void> {
    const payload = new CloudaccountModel(body);

    if (payload.id && payload.id > 0) {
      await api.put(`cloudaccount/`, {body: payload.toJson(), request});
    } else {
      await api.post('cloudaccount', {body: payload.toJson(), request});
    }
  }

  async updateCloudaccount(body : any, request: Request): Promise<void> {

    const payload = new CloudaccountModel(body);
    await api.put(`cloudaccount/${body.id}`, {body: payload, request});
  }

  async updateInstancesOfCloudAccount(id : number, request: Request): Promise<void> {
    await api.put(`cloudaccount/update-all-instances/${id}`, {request});
  }
}
