import {
  Button,
  DataTableHeader,
  Icons,
  type RT,
} from "@vert-capital/design-system-ui";
import { AutoScallingGroupsModel } from "~/models/autoscallinggroup.model";

type Props = {
  handleEdit: (data: AutoScallingGroupsModel) => void;
};
export function getColumns({
  handleEdit,
}: Props): RT.ColumnDef<AutoScallingGroupsModel>[] {
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
      accessorKey: "auto_scaling_group_name",
      header: ({ column }) => (
        <DataTableHeader
          title="Nome do AutoScallingGroup"
          column={column}
          isSort
        />
      ),
      cell: ({ row }) => {
        const auto_scaling_group_name: string = row.getValue(
          "auto_scaling_group_name"
        );
        return (
          <div title={auto_scaling_group_name}>{auto_scaling_group_name}</div>
        );
      },
    },
    {
      accessorKey: "min_size",
      header: ({ column }) => (
        <DataTableHeader title="Min Size" column={column} isSort />
      ),
      cell: ({ row }) => {
        const obj: string = row.getValue("min_size");
        return <div title={obj}>{obj}</div>;
      },
    },
    {
      accessorKey: "max_size",
      header: ({ column }) => (
        <DataTableHeader title="Max Size" column={column} isSort />
      ),
      cell: ({ row }) => {
        const max_size: string = row.getValue("max_size");
        return <div title={max_size}>{max_size}</div>;
      },
    },
    {
      accessorKey: "desired_capacity",
      header: ({ column }) => (
        <DataTableHeader title="Desejavel" column={column} isSort />
      ),
      cell: ({ row }) => {
        const desired_capacity: string = row.getValue("desired_capacity");
        return (
          <div className="w-[100px] " title={desired_capacity}>
            {desired_capacity}
          </div>
        );
      },
    },
    {
      accessorKey: "total_instances",
      header: ({ column }) => (
        <DataTableHeader title="Total Instancias" column={column} isSort />
      ),
      cell: ({ row }) => {
        const total_instances: string = row.getValue("total_instances");
        return (
          <div className="w-[100px] " title={total_instances}>
            {total_instances}
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
  ] as RT.ColumnDef<AutoScallingGroupsModel>[];
}
