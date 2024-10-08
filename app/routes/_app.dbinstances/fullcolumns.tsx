import { DataTableHeader, type RT } from "@vert-capital/design-system-ui";
import { dateDisplay } from "~/common/format";
import { DbInstancesModel } from "~/models/dbinstances.model";

type Props = {
  handleEdit: (data: DbInstancesModel) => void;
};
export function getFullColumns({
  handleEdit,
}: Props): RT.ColumnDef<DbInstancesModel>[] {
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
      accessorKey: "instance_id",
      header: ({ column }) => (
        <DataTableHeader title="ID Instancia" column={column} isSort />
      ),
      cell: ({ row }) => {
        const instance_id: string = row.getValue("instance_id");
        return (
          <div className="w-[170px]" title={instance_id}>
            {instance_id}
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
      accessorKey: "instance_type",
      header: ({ column }) => (
        <DataTableHeader title="Tipo Instancia" column={column} isSort />
      ),
      cell: ({ row }) => {
        const instance_type: string = row.getValue("instance_type");
        return (
          <div className="w-[100px] " title={instance_type}>
            {instance_type}
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
      accessorKey: "instance_region",
      header: ({ column }) => (
        <DataTableHeader title="Região Instancia" column={column} isSort />
      ),
      cell: ({ row }) => {
        const instance_region: string = row.getValue("instance_region");
        return (
          <div className="w-[100px]" title={instance_region}>
            {instance_region}
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
    // {
    //   id: "actions",
    //   cell: ({ row }) => {
    //     const data = row.original;
    //     return (
    //       <div className="w-full flex justify-end items-center space-x-4 pr-2">
    //         <Button
    //           type="button"
    //           variant="ghost"
    //           size={"icon"}
    //           onClick={() => {
    //             handleEdit(data);
    //           }}
    //         >
    //           <Icons.Pencil className="h-3 w-3" />
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ] as RT.ColumnDef<DbInstancesModel>[];
}
