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
import { CloudaccountModel } from "~/models/cloudaccount.model";
import { action } from "./route";

type Props = {
  data: CloudaccountModel;
  close: () => void;
};

export function AddOrEdit({ data, close }: Props) {
  const isOpen = !!data;
  const isEdit = data?.id ? true : false;
  const fetcher = useFetcher<typeof action>();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const form = useForm<CloudaccountModel>({
    resolver: zodResolver(CloudaccountModel.schema),
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
    if (!fetcher.data?.error) {
      revalidate();
      close();
      toast({
        title: "Permissões salvas com sucesso",
        _type: "success",
      });
    } else {
      toast({
        title: "Erro ao salvar",
        description: handleError(fetcher.data?.error).message,
        _type: "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data]);

  const onSubmit = async (values: z.infer<typeof CloudaccountModel.schema>) => {
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
                name="cloud_provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provedor Cloud</FormLabel>
                    <FormControl>
                      <Input {...field} id="cloud_provider" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input {...field} id="nickname" />
                    </FormControl>
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="access_key_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access Key ID</FormLabel>
                    <FormControl>
                      <Input {...field} id="access_key_id" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secret_access_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access Secret Key</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="secret_access_key"
                        type="password"
                      />
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
