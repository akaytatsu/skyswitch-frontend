import { z } from "zod";
import { removeAllUndefinedNodes } from "./utils";

export class CalendarModel {
  id: number;
  name: string;
  type_action: string;
  execute_time: string;
  active: boolean;
  valid_holiday: boolean;
  valid_weekend: boolean;
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  created_at: string;
  updated_at: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.type_action = data.type_action;
    this.execute_time = data.execute_time;
    this.active = data.active;
    this.valid_holiday = data.valid_holiday;
    this.valid_weekend = data.valid_weekend;
    this.sunday = data.sunday;
    this.monday = data.monday;
    this.tuesday = data.tuesday;
    this.wednesday = data.wednesday;
    this.thursday = data.thursday;
    this.friday = data.friday;
    this.saturday = data.saturday;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  toJson() {
    let aux = {
      id: this.id,
      name: this.name,
      type_action: this.type_action,
      execute_time: this.execute_time,
      active: this.active,
      valid_holiday: this.valid_holiday,
      valid_weekend: this.valid_weekend,
      sunday: this.sunday,
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
      saturday: this.saturday,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };

    aux = removeAllUndefinedNodes(aux);

    return aux;
  }

  public static schema = z.object({
    id: z.number().optional(),
    name: z.string().min(3).max(90).optional(),
    type_action: z.string().optional(),
    execute_time: z.string().optional(),
    active: z.boolean().optional(),
    valid_holiday: z.boolean().optional(),
    valid_weekend: z.boolean().optional(),
    sunday: z.boolean().optional(),
    monday: z.boolean().optional(),
    tuesday: z.boolean().optional(),
    wednesday: z.boolean().optional(),
    thursday: z.boolean().optional(),
    friday: z.boolean().optional(),
    saturday: z.boolean().optional(),
    saturday_date: z.date().optional(),
  });

  static validate(values: any) {
    const data = new CalendarModel(values);
    CalendarModel.schema.parse(data);
    return data;
  }
}

export class CalendarSimpleModel {
  id: number;

  constructor(data: any) {
    this.id = data.id;
  }

  toJson() {
    let aux = {
      id: this.id,
    };

    aux = removeAllUndefinedNodes(aux);

    return aux;
  }

  public static schema = z.object({
    id: z.number().optional(),
  });

  static validate(values: any) {
    const data = new CalendarSimpleModel(values);
    CalendarSimpleModel.schema.parse(data);
    return data;
  }
}

export class CalendarFilterModel {
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
