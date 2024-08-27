import { z } from "zod";
import { CalendarModel } from "./calendar.model";
import { CloudaccountModel } from "./cloudaccount.model";
import { removeAllUndefinedNodes } from "./utils";

export class AutoScallingGroupsModel {
  id: number;
  cloud_account_id: number;
  cloud_account: CloudaccountModel;
  calendars: CalendarModel[];
  auto_scaling_group_id: string;
  auto_scaling_group_name: string;
  min_size: number;
  max_size: number;
  desired_capacity: number;
  total_instances: number;
  active: boolean;
  created_at: string;
  updated_at: string;

  constructor(data: any) {
    this.id = data.id;
    this.cloud_account_id = data.cloud_account_id;
    this.cloud_account = data.cloud_account;
    this.calendars = data.calendars;
    this.auto_scaling_group_id = data.auto_scaling_group_id;
    this.auto_scaling_group_name = data.auto_scaling_group_name;
    this.min_size = data.min_size;
    this.max_size = data.max_size;
    this.desired_capacity = data.desired_capacity;
    this.total_instances = data.total_instances;
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
      auto_scaling_group_id: this.auto_scaling_group_id,
      auto_scaling_group_name: this.auto_scaling_group_name,
      min_size: this.min_size,
      max_size: this.max_size,
      desired_capacity: this.desired_capacity,
      total_instances: this.total_instances,
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
    auto_scaling_group_id: z.string().optional(),
    auto_scaling_group_name: z.string().optional(),
    min_size: z.number().optional(),
    max_size: z.number().optional(),
    desired_capacity: z.number().optional(),
    total_instances: z.number().optional(),
    active: z.boolean().optional(),
  });

  static validate(values: any) {
    const data = new AutoScallingGroupsModel(values);
    AutoScallingGroupsModel.schema.parse(data);
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
