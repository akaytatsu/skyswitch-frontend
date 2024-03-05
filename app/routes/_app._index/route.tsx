import { json, type LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

export default function AppIndex() {
  return (
    <>
      <h1>App Index</h1>
    </>
  );
}
