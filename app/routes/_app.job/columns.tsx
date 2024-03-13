import { DataTableHeader, type RT } from "@vert-capital/design-system-ui";
import { JobModel } from "~/models/job.model";
import { convertData } from "~/models/utils";

export function getColumns(): RT.ColumnDef<JobModel>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableHeader title="ID" column={column} isSort />
      ),
      cell: ({ row }) => {
        const id: number = row.getValue("id");
        return (
          <div title={id.toString()} className="w-[90px]">
            {id}
          </div>
        );
      },
    },
    {
      accessorKey: "calendar",
      header: ({ column }) => (
        <DataTableHeader title="Calendário" column={column} isSort />
      ),
      cell: ({ row }) => {
        const calendar: string = row.getValue("calendar").name;
        return (
          <div className="w-[180px] " title={calendar}>
            {calendar}
          </div>
        );
      },
    },
    {
      accessorKey: "is_running",
      header: ({ column }) => (
        <DataTableHeader title="Executando?" column={column} isSort />
      ),
      cell: ({ row }) => {
        const is_running: string = row.getValue("is_running") ? "Sim" : "Não";
        return (
          <div className="w-[50px] " title={is_running}>
            {is_running}
          </div>
        );
      },
    },
    {
      accessorKey: "scheduled_time",
      header: ({ column }) => (
        <DataTableHeader title="Agendamento" column={column} isSort />
      ),
      cell: ({ row }) => {
        const obj: string = convertData(row.getValue("scheduled_time"));
        return (
          <div className="w-[130px]" title={obj}>
            {obj}
          </div>
        );
      },
    },
    {
      accessorKey: "count",
      header: ({ column }) => (
        <DataTableHeader title="Tot. Exec." column={column} isSort />
      ),
      cell: ({ row }) => {
        const obj: string = row.getValue("count");
        return (
          <div className="w-[30px]" title={obj}>
            {obj}
          </div>
        );
      },
    },
    {
      accessorKey: "last_run",
      header: ({ column }) => (
        <DataTableHeader title="Ult. Exec." column={column} isSort />
      ),
      cell: ({ row }) => {
        const obj: string = convertData(row.getValue("last_run"));
        return (
          <div className="w-[130px]" title={obj}>
            {obj}
          </div>
        );
      },
    },
    {
      accessorKey: "next_run",
      header: ({ column }) => (
        <DataTableHeader title="Prox. Exec." column={column} isSort />
      ),
      cell: ({ row }) => {
        const obj: string = convertData(row.getValue("last_run"));
        return (
          <div className="w-[130px]" title={obj}>
            {obj}
          </div>
        );
      },
    },
    {
      accessorKey: "error",
      header: ({ column }) => (
        <DataTableHeader title="Error" column={column} isSort />
      ),
      cell: ({ row }) => {
        const obj: string = row.getValue("error");
        return (
          <div className="w-[130px]" title={obj}>
            {obj}
          </div>
        );
      },
    },
  ] as RT.ColumnDef<JobModel>[];
}
