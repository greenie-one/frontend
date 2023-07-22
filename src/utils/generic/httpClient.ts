import { AuthClient } from './authClinet';

type PostBody = string | string[] | number | boolean | Date | { [key: string]: PostBody };

type HttpRequest = {
  url: string;
  headers?: {
    'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded';
  } & Record<string, string>;
  toJSON?: boolean;
} & (
  | {
      body?: Record<string, PostBody>;
      method: 'POST';
    }
  | {
      method: 'GET';
      query?: Record<string, string>;
    }
  | {
      body?: Record<string, PostBody>;
      method: 'PUT';
    }
  | {
      body?: Record<string, any>;
      method: 'PATCH';
    }
  | {
      query?: Record<string, string>;
      method: 'DELETE';
    }
);

export type APIError = { status: number; code: string; message: string };
export type Result<T, E = APIError> = { ok: true; value: T } | { ok: false; error: E };

export class HttpClient {
  static async callApi<T = unknown>(request: HttpRequest): Promise<Result<T>> {
    const url = new URL(request.url);
    if ((request.method === 'GET' || request.method === 'DELETE') && request.query) {
      for (const [key, value] of Object.entries(request.query)) {
        url.searchParams.append(key, value);
      }
    }

    let body: string | undefined = undefined;
    if (request.method === 'POST' && request.body) {
      body = JSON.stringify(request.body);
    }

    if ((request.method === 'PUT' || request.method === 'PATCH') && request.body) {
      body = JSON.stringify(request.body);
    }

    // console.info(request.url);
    const resp = await fetch(url, {
      method: request.method,
      headers: {
        'Content-Type': request.method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json',
        ...(request.headers ?? {}),
      },
      body,
    });
    // console.info(resp);

    let response: T;

    if (resp.ok) {
      if (request.toJSON !== false) {
        const json_body = await resp.json().catch(() => "Can't parse response to json");
        response = json_body as T;
      } else {
        response = (await resp.text()) as T;
      }
    } else {
      let error: APIError;
      if (resp.headers.get('Content-Type')?.includes('application/json')) {
        error = (await resp.json()) as APIError;
      } else {
        error = { status: resp.status, message: await resp.text(), code: 'SOMETHING_WENT_WRONG' };
      }

      return { ok: false, error: error };
    }

    return { ok: true, value: response };
  }

  static async callApiAuth<T = unknown>(request: HttpRequest, authClient: AuthClient): Promise<Result<T>> {
    if (!authClient.getAccessToken()) {
      return { ok: false, error: { status: 401, message: 'Access Token Not Found', code: 'SOMETHING_WENT_WRONG' } };
    }

    const headers = {
      Authorization: `Bearer ${authClient.getAccessToken()}`,
      ...(request.headers ?? {}),
    };

    let resp: Result<T>;
    resp = await HttpClient.callApi({
      ...request,
      headers,
    });

    if (resp.ok) {
      return resp;
    } else if (resp.error.status === 401) {
      const status = await authClient.refreshAccessToken();

      if (!status.ok) {
        return status;
      }

      const headers = {
        Authorization: `Bearer ${authClient.getAccessToken()}`,
        ...(request.headers ?? {}),
      };
      resp = await HttpClient.callApi({
        ...request,
        headers,
      });
    }
    return resp;
  }
}
