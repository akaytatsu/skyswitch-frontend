import { z } from "zod";
import { removeAllUndefinedNodes } from "./utils";

export class UsersModel {
  id: number;
  name: string;
  email: string;
  active: boolean;
  is_admin: boolean;
  password: string;
  created_at: string;
  updated_at: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.active = data.active;
    this.is_admin = data.is_admin;
    this.password = data.password;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  toJson() {
    let aux = {
      id: this.id,
      name: this.name,
      email: this.email,
      active: this.active,
      is_admin: this.is_admin,
      password: this.password,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };

    aux = removeAllUndefinedNodes(aux);

    return aux;
  }

  public static schema = z.object({
    id: z.number().optional(),
    name: z.string().min(3).max(90),
    email: z.string().email(),
    password: z.string().min(6).max(90).optional(),
    active: z.boolean().optional(),
    is_admin: z.boolean().optional(),
  });

  static validate(values: any) {
    const data = new UsersModel(values);
    UsersModel.schema.parse(data);
    return data;
  }
}

export class UsersFilterModel {
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
