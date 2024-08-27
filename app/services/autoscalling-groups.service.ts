import { api } from "~/common/api";
import { AutoScallingGroupsModel } from "~/models/autoscallinggroup.model";
import { TableModel } from "~/models/table.model";

export class AutoScallingGroupsService {
  async list(request: Request): Promise<TableModel<AutoScallingGroupsModel>> {
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

    const response = await api.get(`autoscallinggroup/?${query}`, {
      request,
    });

    return new TableModel<AutoScallingGroupsModel>(
      AutoScallingGroupsModel,
      response
    );
  }

  async createOrEdit({ body }: { body: any }, request: Request): Promise<void> {
    const payload = new AutoScallingGroupsModel(body);

    if (payload.id && payload.id > 0) {
      await api.put(`autoscallinggroup/`, { body: payload.toJson(), request });
    } else {
      await api.post("autoscallinggroup", { body: payload.toJson(), request });
    }
  }

  async updateInstances(body: any, request: Request): Promise<void> {
    const payload = new AutoScallingGroupsModel(body);
    await api.put(`autoscallinggroup/${body.id}`, { body: payload, request });
  }
}
