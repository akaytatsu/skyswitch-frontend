import {
  Card,
  CardContent,
  CardHeader,
  DataTable,
} from "@vert-capital/design-system-ui";

import {
  ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import clearEmptyParams from "~/components/clear-empty-params";
import Unpermission from "~/components/unpermission";
import { CalendarModel } from "~/models/calendar.model";
import { DbInstancesModel } from "~/models/dbinstances.model";
import {
  PaginationStateModel,
  SortingStateModel,
  TableModel,
} from "~/models/table.model";
import authenticated from "~/policies/authenticated";
import { CalendarService } from "~/services/calendar.service";
import { DbInstancesService } from "~/services/dbinstances.service";
import { AddOrEdit } from "./addOrEdit";
import { getColumns } from "./columns";
import { TableType } from "./columnType";
import { Filter } from "./filters";
import { getFullColumns } from "./fullcolumns";

export async function loader({ request }: LoaderFunctionArgs) {
  // Limpa url de parâmetros vazios
  await clearEmptyParams(new URL(request.url));

  const service = new DbInstancesService();
  const data = await service.list(request);

  const calendarService = new CalendarService();
  const calendarData: CalendarModel[] = (await calendarService.list(request))
    .registers;

  const { user } = await authenticated(request);

  return json({ data, user, calendarData });
}

export default function AppIndex() {
  const { data, user, calendarData } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  const registerData = data as TableModel<DbInstancesModel>;

  const navigate = useNavigate();

  const orderBy = searchParams.get("order_by") || "";
  const sortOrder = searchParams.get("sort_order") || "";
  const page = searchParams.get("page") || "0";
  const pageSize = searchParams.get("page_size") || "10";

  const [stateData, setState] = useState<DbInstancesModel | undefined>();
  const [fullColumns, setFullColumns] = useState(false);

  const onPaginationChange = (pagination: PaginationStateModel) => {
    searchParams.set("page", String(pagination.page));
    searchParams.set("page_size", String(pagination.pageSize));
    navigate(`?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const onSortingChange = (sorting: SortingStateModel) => {
    searchParams.set("order_by", String(sorting.orderBy));
    searchParams.set("sort_order", String(sorting.sortOrder));
    navigate(`?${searchParams.toString()}`, {
      replace: true,
    });
  };

  if (!user?.is_admin) {
    return <Unpermission />;
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold">Instances</h1>
        <div className="w-full flex justify-between items-center">
          <div></div>
          <div className="grid grid-cols-2 gap-4">
            <TableType
              handleClick={() => {
                setFullColumns(!fullColumns);
              }}
            />
            <Filter />
          </div>
        </div>
        <Card className="w-full">
          <CardHeader className="w-full flex flex-row justify-between items-center space-x-4 space-y-0">
            <div className="flex-1"></div>
            <div className="flex justify-end items-center space-x-6"></div>
          </CardHeader>
          <CardContent>
            <DataTable
              className="table-auto"
              initialHeight="19.2rem"
              columns={
                fullColumns == false
                  ? getColumns({
                      handleEdit: (data) => {
                        setState(new DbInstancesModel(data));
                      },
                    })
                  : getFullColumns({
                      handleEdit: (data) => {
                        setState(new DbInstancesModel(data));
                      },
                    })
              }
              data={registerData?.registers}
              options={{
                loading: false,
                error: "",
                pagination: {
                  pageSize: parseInt(pageSize),
                  page: parseInt(page),
                  pageCount: registerData?.totalPages,
                  rowCount: registerData?.totalRegisters,
                },
                sorting: {
                  orderBy: orderBy,
                  sortOrder: sortOrder,
                },
              }}
              onPaginationChange={onPaginationChange}
              onSortingChange={onSortingChange}
            />
          </CardContent>
        </Card>
      </div>
      <AddOrEdit
        data={stateData!}
        calendarData={calendarData}
        close={() => setState(undefined)}
      />
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json();

  try {
    const service = new DbInstancesService();
    await service.updateInstances(body, request);

    return json({
      error: "",
      success: true,
      lastSubmission: body,
    });
  } catch (error) {
    return json({ error, success: false, lastSubmission: body });
  }
}
