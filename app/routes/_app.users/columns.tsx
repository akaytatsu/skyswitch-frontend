import {
  Button,
  DataTableHeader,
  Icons,
  type RT,
} from "@vert-capital/design-system-ui";
import { dateDisplay } from "~/common/format";
import { UserModel } from "~/models/user.model";

type Props = {
  handleEdit: (data: UserModel) => void;
};
export function getColumns({ handleEdit }: Props): RT.ColumnDef<UserModel>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableHeader title="ID" column={column} isSort />
      ),
      cell: ({ row }) => {
        const id: number = row.getValue("id");
        return (
          <div title={id.toString()} className="w-[30px]">
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
          <div className="w-[130px]" title={name}>
            {name}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableHeader title="Email" column={column} isSort />
      ),
      cell: ({ row }) => {
        const email: string = row.getValue("email");
        return (
          <div className="w-[130px] " title={email}>
            {email}
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
          <div className="w-[130px]" title={active}>
            {active}
          </div>
        );
      },
    },
    {
      accessorKey: "is_admin",
      header: ({ column }) => (
        <DataTableHeader title="Admin?" column={column} isSort />
      ),
      cell: ({ row }) => {
        const is_admin: string = row.getValue("is_admin") ? "Sim" : "Não";
        return (
          <div className="w-[130px]" title={is_admin}>
            {is_admin}
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
        return <div className="w-[100px]">{date}</div>;
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
        return <div className="w-[100px]">{date}</div>;
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
  ] as RT.ColumnDef<UserModel>[];
}
