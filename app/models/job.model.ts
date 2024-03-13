import { z } from "zod";
import { CalendarModel } from "./calendar.model";
import { removeAllUndefinedNodes } from "./utils";

export class JobModel {
  id: string;
  error: string;
  count: number;
  is_running: boolean;
  last_run: string;
  next_run: string;
  scheduled_time: string;
  calendar: CalendarModel;


  constructor(data: any) {
    this.id = data.id;
    this.error = data.error;
    this.count = data.count;
    this.is_running = data.is_running;
    this.last_run = data.last_run;
    this.next_run = data.next_run;
    this.scheduled_time = data.scheduled_time;
    this.calendar = new CalendarModel(data.calendar);
  }

  toJson() {
    let aux = {
      id: this.id,
      error: this.error,
      count: this.count,
      is_running: this.is_running,
      last_run: this.last_run,
      next_run: this.next_run,
      scheduled_time: this.scheduled_time,
      calendar: this.calendar.toJson(),
    };

    aux = removeAllUndefinedNodes(aux);

    return aux;
  }

  public static schema = z.object({
    // id: z.number().optional(),
    // name: z.string().min(3).max(90),
    // active: z.boolean().optional(),
  });

  static validate(values: any) {
    const data = new JobModel(values);
    JobModel.schema.parse(data);
    return data;
  }
}
