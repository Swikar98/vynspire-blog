type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface HttpConfig extends RequestInit {
  baseURL?: string;
  timeout?: number;
}

interface HttpRequestConfig extends Omit<RequestInit, "method" | "body"> {
  params?: Record<string, string | number | boolean>;
  data?: unknown;
  timeout?: number;
}

class HttpClient {
  private readonly baseURL: string;
  private readonly defaultConfig: RequestInit;
  private readonly defaultTimeout: number;

  constructor(config: HttpConfig = {}) {
    const { baseURL = "", timeout = 30000, ...restConfig } = config;
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
    this.defaultConfig = {
      headers: { "Content-Type": "application/json" },
      ...restConfig,
    };
  }

  private buildURL(url: string, params?: Record<string, unknown>): string {
    const fullURL = url.startsWith("http") ? url : `${this.baseURL}${url}`;
    if (!params) return fullURL;

    const searchParams = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v != null)
        .map(([k, v]) => [k, String(v)])
    );

    const qs = searchParams.toString();
    return qs ? `${fullURL}${fullURL.includes("?") ? "&" : "?"}${qs}` : fullURL;
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return {} as T;
    }

    const ct = response.headers.get("content-type");
    let result: unknown;
    if (ct?.includes("application/json")) {
      try {
        result = await response.json();
      } catch {
        result = await response.text();
      }
    } else {
      result = await response.text();
    }

    return result as T;
  }

  async request<T>(
    method: HttpMethod,
    url: string,
    config: HttpRequestConfig = {}
  ): Promise<T> {
    const { params, data, timeout = this.defaultTimeout, ...fetchConfig } = config;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(this.buildURL(url, params), {
        ...this.defaultConfig,
        ...fetchConfig,
        method,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
        headers: {
          ...this.defaultConfig.headers,
          ...fetchConfig.headers,
        },
      });

      return await this.parseResponse<T>(response);
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

const client = new HttpClient();

const METHODS: Record<string, HttpMethod> = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};

const DATA_METHODS = new Set<HttpMethod>(["POST", "PUT", "PATCH"]);

type HttpMethods = {
  [K in keyof typeof METHODS]: (typeof METHODS)[K] extends infer M
    ? M extends HttpMethod
      ? M extends "POST" | "PUT" | "PATCH"
        ? <T>(url: string, data?: unknown, config?: HttpRequestConfig) => Promise<T>
        : <T>(url: string, config?: HttpRequestConfig) => Promise<T>
      : never
    : never;
} & {
  request: <T>(method: HttpMethod, url: string, config?: HttpRequestConfig) => Promise<T>;
};

export const http = Object.entries(METHODS).reduce(
  (acc, [name, method]) => ({
    ...acc,
    [name]: DATA_METHODS.has(method)
      ? async <T>(url: string, data?: unknown, config?: HttpRequestConfig) =>
          await client.request<T>(method, url, { ...config, data })
      : async <T>(url: string, config?: HttpRequestConfig) =>
          await client.request<T>(method, url, config),
  }),
  {
    request: async <T>(method: HttpMethod, url: string, config?: HttpRequestConfig) =>
      await client.request<T>(method, url, config),
  }
) as HttpMethods;

export { HttpClient };
export type { HttpConfig, HttpRequestConfig, HttpMethod };