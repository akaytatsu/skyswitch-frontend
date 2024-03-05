import { z } from "zod";
import { removeAllUndefinedNodes } from "./utils";

export class CloudaccountModel {
  id: number;
  cloud_provider: string;
  nickname: string;
  access_key_id: string;
  secret_access_key: string;
  active: boolean;
  created_at: string;
  updated_at: string;

  constructor(data: any) {
    this.id = data.id;
    this.cloud_provider = data.cloud_provider;
    this.nickname = data.nickname;
    this.access_key_id = data.access_key_id;
    this.secret_access_key = data.secret_access_key;
    this.active = data.active;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  toJson() {
    let aux = {
      id: this.id,
      cloud_provider: this.cloud_provider,
      nickname: this.nickname,
      access_key_id: this.access_key_id,
      secret_access_key: this.secret_access_key,
      active: this.active,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };

    aux = removeAllUndefinedNodes(aux);

    return aux;
  }

  public static schema = z.object({
    id: z.number().optional(),
    cloud_provider: z.string().min(1).max(30),
    nickname: z.string().min(1).max(70),
    access_key_id: z.string().optional(),
    secret_access_key: z.string().optional(),
    active: z.boolean().optional(),
  });

  static validate(values: any) {
    const data = new CloudaccountModel(values);
    CloudaccountModel.schema.parse(data);
    return data;
  }
}

export class CloudaccountFilterModel {
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
