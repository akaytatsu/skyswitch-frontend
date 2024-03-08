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
  SelectBasic,
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
import { CalendarModel } from "~/models/calendar.model";
import { action } from "./route";

type Props = {
  data: CalendarModel;
  close: () => void;
};

export function AddOrEdit({ data, close }: Props) {
  const isOpen = !!data;
  const isEdit = data?.id ? true : false;
  const fetcher = useFetcher<typeof action>();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const form = useForm<CalendarModel>({
    resolver: zodResolver(CalendarModel.schema),
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

  const onSubmit = async (values: z.infer<typeof CalendarModel.schema>) => {
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
                name="type_action"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Ação</FormLabel>
                    <FormControl>
                      <SelectBasic
                        field={field}
                        options={[
                          {
                            label: "Ligar",
                            value: "on",
                          },
                          {
                            label: "Desligar",
                            value: "off",
                          },
                        ]}
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
              <FormField
                control={form.control}
                name="valid_holiday"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBasic
                        {...field}
                        id="valid_holiday"
                        label="Considera Feriados?"
                        checked={field.value}
                        onCheckedChange={(e: boolean) =>
                          !e
                            ? form.setValue("valid_holiday", false)
                            : form.setValue("valid_holiday", true)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valid_weekend"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBasic
                        {...field}
                        id="valid_weekend"
                        label="Considera Finais de Semana?"
                        checked={field.value}
                        onCheckedChange={(e: boolean) =>
                          !e
                            ? form.setValue("valid_weekend", false)
                            : form.setValue("valid_weekend", true)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sunday"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBasic
                        {...field}
                        id="sunday"
                        label="Domingo"
                        checked={field.value}
                        onCheckedChange={(e: boolean) =>
                          !e
                            ? form.setValue("sunday", false)
                            : form.setValue("sunday", true)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monday"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBasic
                        {...field}
                        id="monday"
                        label="Segunda"
                        checked={field.value}
                        onCheckedChange={(e: boolean) =>
                          !e
                            ? form.setValue("monday", false)
                            : form.setValue("monday", true)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tuesday"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBasic
                        {...field}
                        id="tuesday"
                        label="Terça"
                        checked={field.value}
                        onCheckedChange={(e: boolean) =>
                          !e
                            ? form.setValue("tuesday", false)
                            : form.setValue("tuesday", true)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="wednesday"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBasic
                        {...field}
                        id="wednesday"
                        label="Quarta"
                        checked={field.value}
                        onCheckedChange={(e: boolean) =>
                          !e
                            ? form.setValue("wednesday", false)
                            : form.setValue("wednesday", true)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thursday"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBasic
                        {...field}
                        id="thursday"
                        label="Quinta"
                        checked={field.value}
                        onCheckedChange={(e: boolean) =>
                          !e
                            ? form.setValue("thursday", false)
                            : form.setValue("thursday", true)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="friday"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBasic
                        {...field}
                        id="friday"
                        label="Sexta"
                        checked={field.value}
                        onCheckedChange={(e: boolean) =>
                          !e
                            ? form.setValue("friday", false)
                            : form.setValue("friday", true)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="saturday"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBasic
                        {...field}
                        id="saturday"
                        label="Sábado"
                        checked={field.value}
                        onCheckedChange={(e: boolean) =>
                          !e
                            ? form.setValue("saturday", false)
                            : form.setValue("saturday", true)
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
