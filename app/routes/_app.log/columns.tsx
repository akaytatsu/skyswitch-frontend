import { DataTableHeader, type RT } from "@vert-capital/design-system-ui";
import { LogModel } from "~/models/log.model";
import { convertData } from "~/models/utils";

export function getColumns(): RT.ColumnDef<LogModel>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableHeader title="ID" column={column} isSort />
      ),
      cell: ({ row }) => {
        const id: number = row.getValue("id");
        return (
          <div title={id.toString()} className="w-[50px] truncate">
            {id}
          </div>
        );
      },
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableHeader title="Codigo" column={column} isSort />
      ),
      cell: ({ row }) => {
        const code: string = row.getValue("code");
        return (
          <div className="w-[80px] " title={code}>
            {code}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableHeader title="Tipo" column={column} isSort />
      ),
      cell: ({ row }) => {
        const type: string = row.getValue("type");
        return (
          <div className="w-[90px] " title={type}>
            {type}
          </div>
        );
      },
    },
    {
      accessorKey: "instance",
      header: ({ column }) => (
        <DataTableHeader title="Instancia" column={column} isSort />
      ),
      cell: ({ row }) => {
        const instance: string = row.getValue("instance");
        return (
          <div className="w-[130px] " title={instance}>
            {instance}
          </div>
        );
      },
    },
    {
      accessorKey: "content",
      header: ({ column }) => (
        <DataTableHeader title="Conteudo" column={column} isSort />
      ),
      cell: ({ row }) => {
        const content: string = row.getValue("content");
        return (
          <div className="w-[130px] " title={content}>
            {content}
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
        const date = convertData(row.getValue("created_at"));
        return <div className="w-[100px]">{date}</div>;
      },
    },
    {
      accessorKey: "error",
      header: ({ column }) => (
        <DataTableHeader title="Erro" column={column} isSort />
      ),
      cell: ({ row }) => {
        const error: string = row.getValue("error");
        return (
          <div className="w-[130px] " title={error}>
            {error}
          </div>
        );
      },
    },
  ] as RT.ColumnDef<LogModel>[];
}
