import {
  Button,
  DataTableHeader,
  Icons,
  type RT,
} from "@vert-capital/design-system-ui";
import { InstancesModel } from "~/models/instances.model";

type Props = {
  handleEdit: (data: InstancesModel) => void;
};
export function getColumns({
  handleEdit,
}: Props): RT.ColumnDef<InstancesModel>[] {
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
      accessorKey: "instance_name",
      header: ({ column }) => (
        <DataTableHeader title="Nome Instancia" column={column} isSort />
      ),
      cell: ({ row }) => {
        const instance_name: string = row.getValue("instance_name");
        return (
          <div className="w-[250px]" title={instance_name}>
            {instance_name}
          </div>
        );
      },
    },
    {
      accessorKey: "cloud_account_nickname",
      header: ({ column }) => (
        <DataTableHeader title="Cloud Account" column={column} isSort />
      ),
      cell: ({ row }) => {
        const obj: string = row.original.cloud_account.nickname;
        return (
          <div className="w-[250px]" title={obj}>
            {obj}
          </div>
        );
      },
    },
    {
      accessorKey: "instance_state",
      header: ({ column }) => (
        <DataTableHeader title="Status Instancia" column={column} isSort />
      ),
      cell: ({ row }) => {
        const instance_state: string = row.getValue("instance_state");
        return (
          <div className="w-[100px] " title={instance_state}>
            {instance_state}
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
      accessorKey: "calendars",
      header: ({ column }) => (
        <DataTableHeader title="Calendários" column={column} isSort />
      ),
      cell: ({ row }) => {
        return (
          <div className="w-[130px] ">
            {row.original.calendars.map((calendar) => (
              <p
                className="border-b border-dotted border-gray-600 py-2"
                key={calendar.id}
              >
                {calendar.name}
              </p>
            ))}
          </div>
        );
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
  ] as RT.ColumnDef<InstancesModel>[];
}
