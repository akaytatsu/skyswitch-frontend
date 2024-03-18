import { json, type LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

export default function AppIndex() {
  return (
    <>
      <div className="w-full  center text-center">
        <iframe
          className="w-full"
          src="https://metabase.vert-capital.com/public/dashboard/f97993db-7c49-421f-b6c7-3fcc3f5c9af8"
          frameBorder="0"
          width="800"
          height="600"
          allowtransparency
        ></iframe>
      </div>
    </>
  );
}
