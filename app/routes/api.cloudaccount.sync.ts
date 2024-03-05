import { ActionFunctionArgs } from "@remix-run/node";
import { CloudaccountService } from "~/services/cloudaccount.service";

export async function action({ request }: ActionFunctionArgs) {

    const data = await request.formData();
    const id = data.get("id");
    const apiCloudAccountService = new CloudaccountService();

    console.log("id", id);
    console.log("id", Number(id));

    const resp = await apiCloudAccountService.updateInstancesOfCloudAccount(Number(id), request);

    console.log(resp);

    return {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Instances updated" }),
    };
}