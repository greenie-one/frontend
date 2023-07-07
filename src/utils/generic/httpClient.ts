import { AuthClient } from './authClinet';

type Error = {
  title: string;
  message: string;
};

type HttpRequest = {
  url: string;
  headers?:
    | {
        'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded';
      } & Record<string, string>;
  toJSON?: boolean;
} & (
  | {
      body?: Record<string, string | string[] | number | boolean | object>;
      method: 'POST';
    }
  | {
      method: 'GET';
      query?: Record<string, string>;
    }
  | {
      body?: Record<string, string | string[] | number | boolean | object>;
      method: 'PUT';
    }
  | {
      body?: Record<string, string | string[] | number | boolean | object>;
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
      if (request.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
        body = new URLSearchParams(JSON.stringify(request.body)).toString();
      } else {
        body = JSON.stringify(request.body);
      }
    }

    if ((request.method === 'PUT' || request.method === 'PATCH') && request.body) {
      body = JSON.stringify(request.body);
    }

    const resp = await fetch(url, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        ...(request.headers ?? {}),
      },
      body,
    });

    let response: T;
    if (request.toJSON !== false) {
      response = (await resp.json()) as T;
    } else {
      response = (await resp.text()) as T;
    }

    console.log(response.value);
    if (!resp.ok) {
      const error = response as APIError;
      return { ok: false, error: error };
    }

    return { ok: true, value: response };
  }

  static async callApiAuth<T = unknown>(request: HttpRequest, authClient: AuthClient): Promise<Result<T>> {
    if (!authClient.getAccessToken()) {
      throw new Error('Access token is not set');
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
