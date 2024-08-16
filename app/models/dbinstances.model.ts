import { z } from "zod";
import { CalendarModel } from "./calendar.model";
import { CloudaccountModel } from "./cloudaccount.model";
import { removeAllUndefinedNodes } from "./utils";

export class DbInstancesModel {
  id: number;
  cloud_account_id: number;
  cloud_account: CloudaccountModel;
  calendars: CalendarModel[];
  db_instance_id: string;
  db_instance_type: string;
  db_instance_name: string;
  db_instance_state: string;
  db_instance_region: string;
  db_instance_class: string;
  endpoint: string;
  port: number;
  engine: string;
  active: boolean;
  created_at: string;
  updated_at: string;

  constructor(data: any) {
    this.id = data.id;
    this.cloud_account_id = data.cloud_account_id;
    this.cloud_account = data.cloud_account;
    this.calendars = data.calendars;
    this.db_instance_id = data.db_instance_id;
    this.db_instance_type = data.db_instance_type;
    this.db_instance_name = data.db_instance_name;
    this.db_instance_state = data.db_instance_state;
    this.db_instance_region = data.db_instance_region;
    this.db_instance_class = data.db_instance_class;
    this.endpoint = data.endpoint;
    this.port = data.port;
    this.engine = data.engine;
    this.active = data.active;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  toJson() {
    let aux = {
      id: this.id,
      cloud_account_id: this.cloud_account_id,
      cloud_account: this.cloud_account,
      calendars: this.calendars,
      db_instance_id: this.db_instance_id,
      db_instance_type: this.db_instance_type,
      db_instance_name: this.db_instance_name,
      db_instance_state: this.db_instance_state,
      db_instance_region: this.db_instance_region,
      db_instance_class: this.db_instance_class,
      endpoint: this.endpoint,
      port: this.port,
      engine: this.engine,
      active: this.active,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };

    aux = removeAllUndefinedNodes(aux);

    return aux;
  }

  public static schema = z.object({
    id: z.number().optional(),
    cloud_account_id: z.number().optional(),
    cloud_account: CloudaccountModel.schema.optional(),
    calendars: z.array(CalendarModel.schema).optional(),
    db_instance_id: z.string().optional(),
    db_instance_type: z.string().optional(),
    db_instance_name: z.string().optional(),
    db_instance_state: z.string().optional(),
    db_instance_region: z.string().optional(),
    endpoint: z.string().optional(),
    db_instance_class: z.string().optional(),
    port: z.number().optional(),
    engine: z.string().optional(),
    active: z.boolean().optional(),
  });

  static validate(values: any) {
    const data = new DbInstancesModel(values);
    DbInstancesModel.schema.parse(data);
    return data;
  }
}

export class DbInstancesFilterModel {
  q?: string;
  only_status_monitor?: boolean;
  only_active?: boolean;
  exclude_blank_name?: boolean;
  created_at?: { from: Date; to: Date } | undefined;

  constructor(data?: any) {
    this.q = data?.q || "";
    this.only_status_monitor = data?.only_status_monitor || true;
    this.only_active = data?.only_active || true;
    this.exclude_blank_name = data?.exclude_blank_name || true;
    this.created_at = data?.created_at || {};
  }

  toJson() {
    return {
      q: this.q,
      only_status_monitor: this.only_status_monitor,
      only_active: this.only_active,
      exclude_blank_name: this.exclude_blank_name,
      created_at: this.created_at,
    };
  }

  public static schema = z.object({
    q: z.string().optional(),
    only_status_monitor: z.boolean().optional(),
    only_active: z.boolean().optional(),
    exclude_blank_name: z.boolean().optional(),
    created_at: z
      .object({
        from: z.date().optional(),
        to: z.date().optional(),
      })
      .optional(),
  });
}
