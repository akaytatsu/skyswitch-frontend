import { api } from '~/common/api';
import { CalendarModel } from '~/models/calendar.model';
import { TableModel } from '~/models/table.model';

export class CalendarService {
  async list(request: Request): Promise<TableModel<CalendarModel>> {
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

    const response = await api.get(`calendar/?${query}`, {
      request,
    });

    return new TableModel<CalendarModel>(CalendarModel, response);
  }

  async createOrEdit({ body }: { body: any }, request: Request): Promise<void> {
    const payload = new CalendarModel(body);

    const jsonData = payload.toJson();

    if (payload.id && payload.id > 0) {
      await api.put(`calendar/${jsonData.id}`, {body: jsonData, request});
    } else {
      await api.post('calendar', {body: jsonData, request});
    }
  }

  async updateCalendar(body : any, request: Request): Promise<void> {

    const payload = new CalendarModel(body);
    await api.put(`calendar/${body.id}`, {body: payload, request});
  }
}
