import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher, useRevalidator } from "@remix-run/react";
import {
  Button,
  CheckBoxBasic,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Icons,
  Input,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  useToast,
} from "@vert-capital/design-system-ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleError } from "~/common/handle-error";
import { UsersModel } from "~/models/users.model";
import { action } from "./route";

type Props = {
  data: UsersModel;
  close: () => void;
};

export function AddOrEdit({ data, close }: Props) {
  const isOpen = !!data;
  const isEdit = data?.id ? true : false;
  const fetcher = useFetcher<typeof action>();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const form = useForm<UsersModel>({
    resolver: zodResolver(UsersModel.schema),
  });

  useEffect(() => {
    if (data) {
      form.reset(data);

      if (isEdit) {
        // form.setValue("id", data.id);
      }
    }
  }, [data, form, isEdit]);

  useEffect(() => {
    if (fetcher.data?.success) {
      revalidate();
      close();
      toast({
        title: "Permissões salvas com sucesso",
        _type: "success",
      });
    } else if (fetcher.data?.error) {
      toast({
        title: "Erro ao salvar",
        description: handleError(fetcher.data?.error).message,
        _type: "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data]);

  const onSubmit = async (values: z.infer<typeof UsersModel.schema>) => {
    fetcher.submit(values, {
      method: "POST",
      action: ".",
      encType: "application/json",
    });
  };

  const onOpenChange = (open: boolean) => {
    if (!open) close();
  };

  const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEdit ? "Editar" : "Adicionar"} storage</SheetTitle>
          <SheetDescription className="text-start">
            Pasta de armazenamento
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit, onError)}
          >
            <div className="grid gap-4 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} id="name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBasic
                        {...field}
                        id="active"
                        label="Ativo?"
                        checked={field.value}
                        onCheckedChange={(e: boolean) =>
                          !e
                            ? form.setValue("active", false)
                            : form.setValue("active", true)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter>
              <Button
                type="button"
                variant={"secondary"}
                disabled={fetcher.state === "submitting"}
                onClick={close}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={fetcher.state === "submitting"}>
                {fetcher.state === "submitting" && (
                  <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Salvar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
