import {
  Button,
  Icons,
  Sheet,
  SheetTrigger,
} from "@vert-capital/design-system-ui";

type Props = {
  handleClick: () => void;
};

export function TableType({ handleClick }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className="bg-white group"
          onClick={handleClick}
        >
          <Icons.ActivityIcon className="w-4 h-4 mr-2 fill-brand group-hover:fill-white" />
          Tipo de Tabela
        </Button>
      </SheetTrigger>
    </Sheet>
  );
}
