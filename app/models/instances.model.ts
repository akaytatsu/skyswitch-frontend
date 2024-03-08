import { z } from "zod";
import { CalendarModel } from "./calendar.model";
import { CloudaccountModel } from "./cloudaccount.model";
import { removeAllUndefinedNodes } from "./utils";

export class InstancesModel {
  id: number;
  cloud_account_id: number;
  cloud_account : CloudaccountModel;
  calendars :  CalendarModel[];
  instance_id: string;
  instance_type: string;
  instance_name: string;
  instance_state: string;
  instance_region: string;
  active: boolean;
  created_at: string;
  updated_at: string;

  constructor(data: any) {
    this.id = data.id;
    this.cloud_account_id = data.cloud_account_id;
    this.cloud_account = data.cloud_account;
    this.calendars = data.calendars;
    this.instance_id = data.instance_id;
    this.instance_type = data.instance_type;
    this.instance_name = data.instance_name;
    this.instance_state = data.instance_state;
    this.instance_region = data.instance_region;
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
      instance_id: this.instance_id,
      instance_type: this.instance_type,
      instance_name: this.instance_name,
      instance_state: this.instance_state,
      instance_region: this.instance_region,
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
    instance_id: z.string().optional(),
    instance_type: z.string().optional(),
    instance_name: z.string().optional(),
    instance_state: z.string().optional(),
    instance_region: z.string().optional(),
    active: z.boolean().optional(),
  });

  static validate(values: any) {
    const data = new InstancesModel(values);
    InstancesModel.schema.parse(data);
    return data;
  }
}

export class InstancesFilterModel {
  q?: string;
  only_status_monitor?: boolean;
  only_active?: boolean;
  created_at?: { from: Date; to: Date } | undefined;

  constructor(data?: any) {
    this.q = data?.q || "";
    this.only_status_monitor = data?.only_status_monitor || true;
    this.only_active = data?.only_active || true;
    this.created_at = data?.created_at || {};
  }

  toJson() {
    return {
      q: this.q,
      only_status_monitor: this.only_status_monitor,
      only_active: this.only_active,
      created_at: this.created_at,
    };
  }

  public static schema = z.object({
    q: z.string().optional(),
    only_status_monitor: z.boolean().optional(),
    only_active: z.boolean().optional(),
    created_at: z
      .object({
        from: z.date().optional(),
        to: z.date().optional(),
      })
      .optional(),
  });
}
