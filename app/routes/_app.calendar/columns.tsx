import {
  Button,
  DataTableHeader,
  Icons,
  type RT,
} from "@vert-capital/design-system-ui";
import { dateDisplay } from "~/common/format";
import { CalendarModel } from "~/models/calendar.model";

type Props = {
  handleEdit: (data: CalendarModel) => void;
};
export function getColumns({
  handleEdit,
}: Props): RT.ColumnDef<CalendarModel>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableHeader title="ID" column={column} isSort />
      ),
      cell: ({ row }) => {
        const id: number = row.getValue("id");
        return (
          <div title={id.toString()} className="w-[50px] ">
            {id}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableHeader title="Name" column={column} isSort />
      ),
      cell: ({ row }) => {
        const name: string = row.getValue("name");
        return (
          <div className="w-[130px] " title={name}>
            {name}
          </div>
        );
      },
    },
    {
      accessorKey: "type_action",
      header: ({ column }) => (
        <DataTableHeader title="Tipo de Ação" column={column} isSort />
      ),
      cell: ({ row }) => {
        const type_action: string = row.getValue("type_action");
        const resultado: string = type_action == "on" ? "Ligar" : "Desligar";
        return (
          <div className="w-[130px] " title={resultado}>
            {resultado}
          </div>
        );
      },
    },
    {
      accessorKey: "sunday",
      header: ({ column }) => (
        <DataTableHeader title="Dias" column={column} isSort />
      ),
      cell: ({ row }) => {
        console.log(row);
        return (
          <div className="w-[130px] ">
            {row.original.sunday == true && <p>Domingo</p>}
            {row.original.monday == true && <p>Segunda</p>}
            {row.original.tuesday == true && <p>Terça</p>}
            {row.original.wednesday == true && <p>Quarta</p>}
            {row.original.thursday == true && <p>Quinta</p>}
            {row.original.friday == true && <p>Sexta</p>}
            {row.original.saturday == true && <p>Sábado</p>}
          </div>
        );
      },
    },
    {
      accessorKey: "valid_holiday",
      header: ({ column }) => (
        <DataTableHeader title="Feriado?" column={column} isSort />
      ),
      cell: ({ row }) => {
        const valid_holiday: string =
          row.getValue("valid_holiday") == true ? "Sim" : "Não";

        return (
          <div className="w-[130px] " title={valid_holiday}>
            {valid_holiday}
          </div>
        );
      },
    },
    {
      accessorKey: "valid_weekend",
      header: ({ column }) => (
        <DataTableHeader title="Final Semana?" column={column} isSort />
      ),
      cell: ({ row }) => {
        const valid_weekend: string =
          row.getValue("valid_weekend") == true ? "Sim" : "Não";
        return (
          <div className="w-[130px] " title={valid_weekend}>
            {valid_weekend}
          </div>
        );
      },
    },
    {
      accessorKey: "active",
      header: ({ column }) => (
        <DataTableHeader title="Ativo?" column={column} isSort />
      ),
      cell: ({ row }) => {
        const active: string = row.getValue("active") ? "Sim" : "Não";
        return (
          <div className="w-[70px] " title={active}>
            {active}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableHeader title="Criado em" column={column} isSort />
      ),
      cell: ({ row }) => {
        const date = row.getValue("created_at")
          ? dateDisplay(row.getValue("created_at"), {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "";
        return <div className="w-[100px] ">{date}</div>;
      },
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => (
        <DataTableHeader title="Atualizado em" column={column} isSort />
      ),
      cell: ({ row }) => {
        const date = row.getValue("updated_at")
          ? dateDisplay(row.getValue("updated_at"), {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "";
        return <div className="w-[100px] ">{date}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="w-full flex justify-end items-center space-x-4 pr-2">
            <Button
              type="button"
              variant="ghost"
              size={"icon"}
              onClick={() => {
                handleEdit(data);
              }}
            >
              <Icons.Pencil className="h-3 w-3" />
            </Button>
          </div>
        );
      },
    },
  ] as RT.ColumnDef<CalendarModel>[];
}
