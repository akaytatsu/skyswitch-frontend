import { UnpermissionedResponse } from "~/models/table.model";
import { getSession } from "~/sessions.server";

type Props = {
  request?: Request;
  body?: any;
  baseUrl?: string;
};

export const api = {
  get: async (url: string, options?: Props) => {
    return await request("GET", url, options);
  },
  post: async (url: string, options?: Props) => {
    return await request("POST", url, options);
  },
  put: async (url: string, options?: Props) => {
    return await request("PUT", url, options);
  },
  delete: async (url: string, options?: Props) => {
    return await request("DELETE", url, options);
  },
  patch: async (url: string, options?: Props) => {
    return await request("PATCH", url, options);
  },
};

async function request(method: string, url: string, options?: Props) {
  const _url = `${options?.baseUrl || process.env.BASE_URL_API}${url}`;
  const request = options?.request || new Request(_url);
  const session = await getSession(request.headers.get("Cookie"));
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (session.has("token")) {
    headers["Authorization"] = `${session.get("token")}`;
  }

  // console.log("request", _url, method, headers, options?.body);

  const response = await fetch(_url, {
    method: method,
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  // console.log('response', _url, response.status, response.statusText);

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    if (response.status === 401) {
      return new UnpermissionedResponse({
        message: "Usuário não autorizado",
        code: 401,
        data: await response.json(),
      });
    }

    if (contentType && contentType.includes("application/json")) {
      throw await response.json();
    } else {
      throw await response.text();
    }
  }
  if (!contentType || !contentType.includes("application/json"))
    return await response.text();
  return await response.json();
}
