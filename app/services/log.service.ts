import { api } from '~/common/api';
import { LogModel } from '~/models/log.model';
import { TableModel } from '~/models/table.model';

export class LogService {
  async list(request: Request): Promise<TableModel<LogModel>> {
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

    const response = await api.get(`log/?${query}`, {
      request,
    });

    return new TableModel<LogModel>(LogModel, response);
  }

}
