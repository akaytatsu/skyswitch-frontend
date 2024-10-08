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
  SelectAdvanced,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  sonner,
} from "@vert-capital/design-system-ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleError } from "~/common/handle-error";
import { AutoScallingGroupsModel } from "~/models/autoscallinggroup.model";
import { CalendarModel } from "~/models/calendar.model";
import { action } from "./route";

type Props = {
  data: AutoScallingGroupsModel;
  calendarData: CalendarModel[];
  close: () => void;
};

export function AddOrEdit({ data, calendarData, close }: Props) {
  const isOpen = !!data;
  const isEdit = data?.id ? true : false;
  const fetcher = useFetcher<typeof action>();
  const { revalidate } = useRevalidator();

  const form = useForm<AutoScallingGroupsModel>({
    resolver: zodResolver(AutoScallingGroupsModel.schema),
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
      sonner.toast.success("Tudo certo!", {
        description: "Registro criado com sucesso",
        closeButton: true,
      });
    } else if (fetcher.data?.error) {
      sonner.toast.error("Ops.. Deu erro!", {
        description: handleError(fetcher.data?.error).message,
        closeButton: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data]);

  const onSubmit = async (
    values: z.infer<typeof AutoScallingGroupsModel.schema>
  ) => {
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
                name="calendars"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calendários</FormLabel>
                    <FormControl>
                      <SelectAdvanced
                        placeholder="Selecione uma opção"
                        selected={field.value.map((item) => item.id)}
                        options={calendarData.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                        multiple
                        onChangeValue={(value) =>
                          form.setValue(
                            "calendars",
                            value.map((item) => new CalendarModel({ id: item }))
                          )
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
