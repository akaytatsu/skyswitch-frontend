import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Acesso | Gestão" }];
};

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  let error = url.searchParams.get("error") || "";

  if (error === "bad_user") {
    error = "Usuário ou senha inválidos";
  }

  return json({ error: error });
};

const InputField = ({ type, name, placeholder }) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {placeholder}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      required=""
    />
  </div>
);

export default function Login() {
  const { error } = useLoaderData<typeof loader>();

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          CloudSwitch
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Form className="space-y-4 md:space-y-6">
              <form action="/api/login" method="post">
                <div className="mb-5">
                  <InputField type="email" name="email" placeholder="Email" />
                </div>
                <div className="mb-5">
                  <InputField
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex items-center justify-between mb-5">
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Precisa recuperar senha?
                  </a>
                </div>
                <p className="w-full text-center font-bold">
                  {error && (
                    <span className="text-red-600 dark:text-red-500">
                      {error}
                    </span>
                  )}
                </p>
                <button
                  type="submit"
                  className="w-full text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Entrar
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
