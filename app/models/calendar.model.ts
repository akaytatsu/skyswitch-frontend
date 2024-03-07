import { z } from "zod";
import { removeAllUndefinedNodes } from "./utils";

export class CalendarModel {
  id: number;
  name: string;
  type_action: string;
  active: boolean;
  valid_holiday: boolean;
  valid_weekend: boolean;
  sunday: boolean;
  sunday_date: Date;
  monday: boolean;
  monday_date: Date;
  tuesday: boolean;
  tuesday_date: Date;
  wednesday: boolean;
  wednesday_date: Date;
  thursday: boolean;
  thursday_date: Date;
  friday: boolean;
  friday_date: Date;
  saturday: boolean;
  saturday_date: Date;
  created_at: string;
  updated_at: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.type_action = data.type_action;
    this.active = data.active;
    this.valid_holiday = data.valid_holiday;
    this.valid_weekend = data.valid_weekend;
    this.sunday = data.sunday;
    this.sunday_date = data.sunday_date;
    this.monday = data.monday;
    this.monday_date = data.monday_date;
    this.tuesday = data.tuesday;
    this.tuesday_date = data.tuesday_date;
    this.wednesday = data.wednesday;
    this.wednesday_date = data.wednesday_date;
    this.thursday = data.thursday;
    this.thursday_date = data.thursday_date;
    this.friday = data.friday;
    this.friday_date = data.friday_date;
    this.saturday = data.saturday;
    this.saturday_date = data.saturday_date;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  toJson() {
    let aux = {
      id: this.id,
      name: this.name,
      type_action: this.type_action,
      active: this.active,
      valid_holiday: this.valid_holiday,
      valid_weekend: this.valid_weekend,
      sunday: this.sunday,
      sunday_date: this.sunday_date,
      monday: this.monday,
      monday_date: this.monday_date,
      tuesday: this.tuesday,
      tuesday_date: this.tuesday_date,
      wednesday: this.wednesday,
      wednesday_date: this.wednesday_date,
      thursday: this.thursday,
      thursday_date: this.thursday_date,
      friday: this.friday,
      friday_date: this.friday_date,
      saturday: this.saturday,
      saturday_date: this.saturday_date,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };

    aux = removeAllUndefinedNodes(aux);

    return aux;
  }

  public static schema = z.object({
    id: z.number().optional(),
    name: z.string().min(3).max(90),
    type_action: z.string(),
    active: z.boolean().optional(),
    valid_holiday: z.boolean().optional(),
    valid_weekend: z.boolean().optional(),
    sunday: z.boolean().optional(),
    sunday_date: z.date().optional(),
    monday: z.boolean().optional(),
    monday_date: z.date().optional(),
    tuesday: z.boolean().optional(),
    tuesday_date: z.date().optional(),
    wednesday: z.boolean().optional(),
    wednesday_date: z.date().optional(),
    thursday: z.boolean().optional(),
    thursday_date: z.date().optional(),
    friday: z.boolean().optional(),
    friday_date: z.date().optional(),
    saturday: z.boolean().optional(),
    saturday_date: z.date().optional(),
  });

  static validate(values: any) {
    const data = new CalendarModel(values);
    CalendarModel.schema.parse(data);
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
