import assign from "@hydrophobefireman/j-utils/@build-modern/src/modules/Object/assign";
import retry from "@hydrophobefireman/j-utils/@build-modern/src/modules/retry/index";
import { get as idbGet, set as idbSet } from "../idb/key_val";
import { userRoutes } from "../util/api_routes";
const retryFetch = (retry(
  fetch,
  3,
  100
) as unknown) as WindowOrWorkerGlobalScope["fetch"];

interface AuthenticationTokens {
  accessToken: string;
  refreshToken: string;
}
export interface AbortableFetchResponse<T> {
  json: Promise<{ data: T; error?: string }>;
  controller: AbortController;
}
const tokens: AuthenticationTokens = { accessToken: null, refreshToken: null };

function _headers(tokens: AuthenticationTokens) {
  return {
    "x-access-token": tokens.accessToken,
    "x-refresh-token": tokens.refreshToken,
  };
}
const ACCESS_TOKEN = "auth_tokens.access";
const REFRESH_TOKEN = "auth_tokens.refresh";

const getAuthenticationHeaders = async function () {
  if (tokens && tokens.accessToken && tokens.refreshToken)
    return _headers(tokens);

  const access = await idbGet<string>(ACCESS_TOKEN);
  const refresh = await idbGet<string>(REFRESH_TOKEN);
  if (!access && !refresh) return {};
  tokens.accessToken = access;
  tokens.refreshToken = refresh;
  return _headers(tokens);
};

function upateTokens(headers: Headers) {
  let access = headers.get("x-access-token");
  let refresh = headers.get("x-refresh-token");
  if (access != null) {
    access = access || null;
    idbSet(ACCESS_TOKEN, access);
    tokens.accessToken = access;
  }
  if (refresh != null) {
    refresh = refresh || null;
    idbSet(REFRESH_TOKEN, refresh);
    tokens.refreshToken = refresh;
  }
}

async function _awaitData<T>(url: string, options?: RequestInit) {
  let data: { data: T; error?: string };
  let response: Response;
  try {
    options.headers = assign(options.headers, await getAuthenticationHeaders());
    response = await retryFetch(url, options);
    const responseHeaders = response.headers;

    upateTokens(responseHeaders);

    data = await response.json();
  } catch (e) {
    console.log(e);
    data = { error: "a network error occured", data: null };
  }
  return data;
}
function _prepareFetch<T = {}>(url: string, options?: RequestInit) {
  const controller = new AbortController();
  const signal = controller.signal;
  options.signal = signal;
  const data = _awaitData(url, options);

  return { json: data, controller } as AbortableFetchResponse<T>;
}

const wrap = <T extends Array<any>, U>(fn: (...args: T) => U) => {
  function wrapped(...args: T): U;
  function wrapped(): U {
    const args = [].slice.call(arguments);
    const res: AbortableFetchResponse<unknown> = fn.apply(null, args);
    const resp = ({
      controller: res.controller,
      json: res.json.then((js) => {
        if (js.error == "refresh") {
          return get(userRoutes.refreshAuthToken).json.then(() =>
            fn.apply(null, args)
          );
        }
        return js;
      }),
    } as unknown) as U;
    return resp;
  }
  return wrapped;
};

function _get<T = {}>(
  url: string,
  headers?: Record<string, string>,
  options?: RequestInit
) {
  options = assign({}, options || {}, {
    method: "get",
    headers: headers || (options && (options.headers as object)) || {},
  });
  const response = _prepareFetch<T>(url, options);

  return response;
}

function _postJSON<T = {}>(
  url: string,
  body: object,
  headers?: Record<string, string>,
  options?: RequestInit
) {
  options = assign({}, options || {}, {
    body: JSON.stringify(body),
    method: "post",
    headers: assign(
      { "content-type": "application/json" },
      headers || (options && (options.headers as object)) || {}
    ),
  });
  return _prepareFetch<T>(url, options);
}

export const get = wrap(_get);

export const postJSON = wrap(_postJSON);
