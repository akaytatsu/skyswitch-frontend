import { Form } from "@remix-run/react";
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
  syncInstances: (id: number) => void;
};
export function getColumns({
  handleEdit,
  syncInstances,
}: Props): RT.ColumnDef<UserModel>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableHeader title="ID" column={column} isSort />
      ),
      cell: ({ row }) => {
        const id: number = row.getValue("id");
        return (
          <div title={id.toString()} className="w-[200px] truncate">
            {id}
          </div>
        );
      },
    },
    {
      accessorKey: "cloud_provider",
      header: ({ column }) => (
        <DataTableHeader title="Providor Cloud" column={column} isSort />
      ),
      cell: ({ row }) => {
        const cloud_provider: string = row.getValue("cloud_provider");
        return (
          <div className="w-[130px] truncate" title={cloud_provider}>
            {cloud_provider}
          </div>
        );
      },
    },
    {
      accessorKey: "nickname",
      header: ({ column }) => (
        <DataTableHeader title="Nickname" column={column} isSort />
      ),
      cell: ({ row }) => {
        const nickname: string = row.getValue("nickname");
        return (
          <div className="w-[130px] truncate" title={nickname}>
            {nickname}
          </div>
        );
      },
    },
    {
      accessorKey: "access_key_id",
      header: ({ column }) => (
        <DataTableHeader title="Access Key ID" column={column} isSort />
      ),
      cell: ({ row }) => {
        const access_key_id: string = row.getValue("access_key_id");
        return (
          <div className="w-[130px] truncate" title={access_key_id}>
            {access_key_id}
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
          <div className="w-[130px] truncate" title={active}>
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
        return <div className="w-[100px] truncate">{date}</div>;
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
        return <div className="w-[100px] truncate">{date}</div>;
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
            <Form method="post" action="/api/cloudaccount/sync">
              <input type="hidden" name="id" value={data.id} />
              <Button type="submit" variant="ghost" size={"icon"}>
                <Icons.RefreshCcwDot className="h-3 w-3" />
              </Button>
            </Form>
          </div>
        );
      },
    },
  ] as RT.ColumnDef<UserModel>[];
}
