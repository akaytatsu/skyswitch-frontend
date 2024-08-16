import { api } from "~/common/api";
import { DbInstancesModel } from "~/models/dbinstances.model";
import { TableModel } from "~/models/table.model";

export class DbInstancesService {
  async list(request: Request): Promise<TableModel<DbInstancesModel>> {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    // Padrões podem ser definidos diretamente no URLSearchParams
    const defaultParams = {
      page: "0",
      page_size: "10",
      order_by: "",
      sort_order: "",
      q: "",
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

    const response = await api.get(`dbinstances/?${query}`, {
      request,
    });

    return new TableModel<DbInstancesModel>(DbInstancesModel, response);
  }

  async createOrEdit({ body }: { body: any }, request: Request): Promise<void> {
    const payload = new DbInstancesModel(body);

    if (payload.id && payload.id > 0) {
      await api.put(`dbinstances/`, { body: payload.toJson(), request });
    } else {
      await api.post("dbinstances", { body: payload.toJson(), request });
    }
  }

  async updateInstances(body: any, request: Request): Promise<void> {
    const payload = new DbInstancesModel(body);
    await api.put(`dbinstances/${body.id}`, { body: payload, request });
  }
}
