import { ActionFunctionArgs } from "@remix-run/node";
import { CloudaccountService } from "~/services/cloudaccount.service";

export async function action({ request }: ActionFunctionArgs) {

    const data = await request.formData();
    // const data = await request.json();
    const id = data.get("id");
    const apiCloudAccountService = new CloudaccountService();

    await apiCloudAccountService.updateInstancesOfCloudAccount(Number(id), request);

    return {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Instances updated" }),
    };
}