import {
  Card,
  CardContent,
  CardHeader,
  DataTable,
} from "@vert-capital/design-system-ui";

import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import clearEmptyParams from "~/components/clear-empty-params";
import Unpermission from "~/components/unpermission";
import { JobModel } from "~/models/job.model";
import authenticated from "~/policies/authenticated";
import { JobService } from "~/services/job.service";
import { getColumns } from "./columns";

export async function loader({ request }: LoaderFunctionArgs) {
  // Limpa url de parâmetros vazios
  await clearEmptyParams(new URL(request.url));

  const service = new JobService();
  const data = await service.list(request);

  const { user } = await authenticated(request);

  return json({ data, user });
}

export default function AppIndex() {
  const { data, user } = useLoaderData<typeof loader>();

  const registerData = data as JobModel[];

  if (!user?.is_admin) {
    return <Unpermission />;
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold">Job</h1>
        <div className="w-full flex justify-between items-center">
          <div></div>
          <div></div>
        </div>
        <Card className="w-full">
          <CardHeader className="w-full flex flex-row justify-between items-center space-x-4 space-y-0">
            <div className="flex-1"></div>
          </CardHeader>
          <CardContent>
            <DataTable
              className=""
              initialHeight="19.2rem"
              columns={getColumns()}
              data={registerData}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
