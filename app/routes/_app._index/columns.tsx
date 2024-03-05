import { Link } from "@remix-run/react";
import {
  Button,
  DataTableHeader,
  Icons,
  type RT,
} from "@vert-capital/design-system-ui";
import { dateDisplay } from "~/common/format";
import type { StorageModel } from "~/models/storage.model";

type Props = {
  handleEdit: (data: StorageModel) => void;
};
export function getColumns({
  handleEdit,
}: Props): RT.ColumnDef<StorageModel>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableHeader title="Nome" column={column} isSort />
      ),
      cell: ({ row }) => {
        const name: string = row.getValue("name");
        const storageId = row.original.id;
        return (
          <Link to={`/files/${storageId}`}>
            <div title={name} className="w-[200px] truncate">
              {name}
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableHeader title="Código" column={column} isSort />
      ),
      cell: ({ row }) => {
        const code: string = row.getValue("code");
        return (
          <div className="w-[130px] truncate" title={code}>
            {code}
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
        const storageId = row.original.id;
        return (
          <Link to={`/files/${storageId}`}>
            <div className="w-full flex justify-end items-center space-x-4 pr-2">
              <Button
                type="button"
                variant="ghost"
                size={"icon"}
                onClick={() => {
                  handleEdit(data);
                }}
              >
                <Icons.ArrowRightIcon className="h-3 w-3" />
              </Button>
            </div>
          </Link>
        );
      },
    },
  ] as RT.ColumnDef<StorageModel>[];
}
