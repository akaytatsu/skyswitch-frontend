import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  DateRangePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Input,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  dateDisplay,
} from "@vert-capital/design-system-ui";
import { toCamelCase } from "~/common/formatString";
import { JobFilterModel } from "~/models/job.model";

export function Filter() {
  // const [clearAllFilter, setClearAllFilter] = useState<boolean>(false);
  // const { setQueryGroup } = useFetchClient();
  const navigate = useNavigate();

  const form = useForm<JobFilterModel>({
    resolver: zodResolver(JobFilterModel.schema),
    defaultValues: new JobFilterModel(),
  });

  useEffect(() => {
    mapQueryParamToForm();
  }, []); // Empty dependency array ensures this runs once on mount

  const mapQueryParamToForm = () => {
    const searchParams = new URLSearchParams(window.location.search);

    // Loop through the search parameters
    searchParams.forEach((value, key) => {
      // Modify key if necessary to match your form field names
      const formKey = toCamelCase(key) as keyof JobFilterModel;
      // Convert comma-separated values to array if needed
      if (!value.includes(",")) form.setValue(formKey, value);
      else {
        const valuesArray = value.split(",");
        const includesHyphen = valuesArray.every((value) =>
          value.includes("-")
        );
        if (!includesHyphen) {
          form.setValue(formKey, valuesArray as string[]);
        } else {
          form.setValue(
            formKey,
            formatDateArrayToDateRange(valuesArray as [string, string])
          );
        }
      }
    });
  };

  const formatDateArrayToDateRange = (
    dateArray: [string, string]
  ): { from: Date; to: Date } => {
    const [fromDate, toDate] = dateArray;
    const [startYear, startMonth, startDay] = fromDate.split("-").map(Number);
    const [endYear, endMonth, endDay] = toDate.split("-").map(Number);

    // Create a new date object using the local time zone
    // Note that months are 0-indexed in JavaScript Date (0 for January, 1 for February, etc.)
    const fromISODate = new Date(startYear, startMonth - 1, startDay);
    const toISODate = new Date(endYear, endMonth - 1, endDay);

    return {
      from: fromISODate,
      to: toISODate,
    };
  };

  const formatDateRangeToDateArray = (
    form: JobFilterModel
  ): { [key: string]: string[] } => {
    const formattedForm: { [key: string]: string[] } = {};

    Object.entries(form).forEach(([key, dateRange]) => {
      if (
        typeof dateRange !== "string" &&
        !Array.isArray(dateRange) &&
        typeof dateRange !== "undefined" &&
        "from" in dateRange &&
        "to" in dateRange
      ) {
        const fromDate = `${dateDisplay(dateRange.from, {
          year: "numeric",
        })}-${dateDisplay(dateRange.from, {
          month: "2-digit",
        })}-${dateDisplay(dateRange.from, {
          day: "2-digit",
        })}`;
        const toDate = `${dateDisplay(dateRange.to, {
          year: "numeric",
        })}-${dateDisplay(dateRange.to, {
          month: "2-digit",
        })}-${dateDisplay(dateRange.to, {
          day: "2-digit",
        })}`;
        formattedForm[key] = [fromDate, toDate];
      }
    });
    return formattedForm;
  };

  const onSubmit = () => {
    const formValues = form.getValues();

    // monta parametros url
    const searchParams = new URLSearchParams();

    // Loop through the search parameters
    Object.entries(formValues).forEach(([key, value]) => {
      // Convert comma-separated values to array if needed
      if (
        value === "" ||
        value == undefined ||
        value == null ||
        value == "undefined"
      )
        return;
      else if (Array.isArray(value)) {
        searchParams.set(key, value.join(","));
      } else if (
        typeof value === "object" &&
        "from" in value &&
        "to" in value
      ) {
        const dateRange = formatDateRangeToDateArray(formValues);
        searchParams.set(key, dateRange[key].join(","));
      } else {
        searchParams.set(key, value);
      }
    });

    // seta parametros na url e faz um redirect
    navigate(`?${searchParams.toString()}`);
  };

  const onClearFilters = () => {
    form.reset(new JobFilterModel());
    navigate(``);
  };

  const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant={"outline"} className="bg-white group">
          <Icons.Filter className="w-4 h-4 mr-2 fill-brand group-hover:fill-white" />
          Mostrar filtros
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full md:w-80 p-0">
        <Form {...form}>
          <form
            className="space-y-6 overflow-auto h-full px-6"
            onSubmit={form.handleSubmit(onSubmit, onError)}
          >
            <SheetHeader className="sticky top-0 bg-white z-10 pt-6">
              <SheetTitle>Filtrar por</SheetTitle>
            </SheetHeader>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="q"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="file_name">Pesquisa</FormLabel>
                    <FormControl>
                      <Input placeholder="Pesquisa" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="created_at"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <DateRangePicker
                        control={form.control}
                        label="Data Criacão"
                        name="created_at"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter className="w-full flex flex-col h-auto space-x-0 sticky bottom-0 bg-white z-10 pb-6 pt-6 !mt-0">
              <SheetClose asChild>
                <Button type="submit" className="w-full">
                  Filtrar
                </Button>
              </SheetClose>
              <Button
                type="button"
                onClick={onClearFilters}
                className="w-full mt-2"
                variant={"ghost"}
              >
                Limpar filtro
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
