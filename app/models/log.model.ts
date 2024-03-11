import { z } from "zod";
import { removeAllUndefinedNodes } from "./utils";

export class LogModel {
  id: number;
  code: string;
  type: string;
  instance: string;
  content: string;
  created_at: string;
  error: string;

  constructor(data: any) {
    this.id = data.id;
    this.code = data.code;
    this.type = data.type;
    this.instance = data.instance;
    this.content = data.content;
    this.created_at = data.created_at;
    this.error = data.error;
  }

  toJson() {
    let aux = {
      id: this.id,
      code: this.code,
      type: this.type,
      instance: this.instance,
      content: this.content,
      created_at: this.created_at,
      error: this.error,
    };

    aux = removeAllUndefinedNodes(aux);

    return aux;
  }

  public static schema = z.object({
    id: z.number().optional(),
    code: z.string().optional(),
    type: z.string().optional(),
    instance: z.string().optional(),
    content: z.string().optional(),
    created_at: z.string().optional(),
    error: z.string().optional(),
  });

  static validate(values: any) {
    const data = new LogModel(values);
    LogModel.schema.parse(data);
    return data;
  }
}

export class LogFilterModel {
  q?: string;
  created_at?: { from: Date; to: Date } | undefined;

  constructor(data?: any) {
    this.q = data?.q || "";
    this.created_at = data?.created_at || {};
  }

  toJson() {
    return {
      q: this.q,
      created_at: this.created_at,
    };
  }

  public static schema = z.object({
    q: z.string().optional(),
    created_at: z
      .object({
        from: z.date().optional(),
        to: z.date().optional(),
      })
      .optional(),
  });
}
